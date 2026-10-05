import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

function jsonResponse(body: Record<string, unknown>, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

function readString(value: unknown, maxLength: number, required = false) {
  if (typeof value !== "string") return required ? null : "";
  const trimmed = value.trim();
  if (trimmed.length > maxLength || (required && !trimmed)) return null;
  return trimmed;
}

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

Deno.serve(async (request) => {
  if (request.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }
  if (request.method !== "POST") {
    return jsonResponse({ error: "Method not allowed." }, 405);
  }

  let body: Record<string, unknown>;
  try {
    const payload: unknown = await request.json();
    if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
      return jsonResponse({ error: "Invalid submission." }, 400);
    }
    body = payload as Record<string, unknown>;
  } catch (error) {
    console.warn("Contact function received invalid JSON.", error);
    return jsonResponse({ error: "Invalid submission." }, 400);
  }

  const submissionId = readString(body.submissionId, 36, true);
  const groomName = readString(body.groomName, 200, true);
  const brideName = readString(body.brideName, 200, true);
  const contactNumber = readString(body.contactNumber, 100, true);
  const email = readString(body.email, 320);
  const eventDetails = readString(body.eventDetails, 5000, true);
  const hearAboutUs = readString(body.hearAboutUs, 200);

  if (
    !submissionId ||
    !/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(submissionId) ||
    !groomName ||
    !brideName ||
    !contactNumber ||
    !eventDetails ||
    email === null ||
    hearAboutUs === null ||
    (email && !isEmail(email))
  ) {
    return jsonResponse({ error: "Please check the contact form fields and try again." }, 400);
  }

  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  const resendApiKey = Deno.env.get("RESEND_API_KEY");
  const fromEmail = Deno.env.get("RESEND_FROM_EMAIL");
  if (!supabaseUrl || !serviceRoleKey || !resendApiKey || !fromEmail) {
    console.error("Contact function is missing required Supabase or Resend configuration.");
    return jsonResponse({ error: "Contact notifications are not configured." }, 500);
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey);
  const { data: contactSection, error: contactError } = await supabase
    .from("site_content")
    .select("content")
    .eq("section", "contact")
    .maybeSingle();
  if (contactError) {
    console.error("Unable to load the configured contact recipient.", contactError);
    return jsonResponse({ error: "Unable to load contact settings." }, 500);
  }
  const recipient =
    typeof contactSection?.content?.email === "string"
      ? contactSection.content.email.trim()
      : "";
  if (!recipient || !isEmail(recipient)) {
    console.error("The email in Contact Info is missing or invalid.");
    return jsonResponse({ error: "A valid notification email must be set in Contact Info." }, 500);
  }

  const { data: existingSubmission, error: lookupError } = await supabase
    .from("contact_submissions")
    .select("submission_id, notification_sent_at")
    .eq("submission_id", submissionId)
    .maybeSingle();
  if (lookupError) {
    console.error("Unable to check for a previous contact submission.", lookupError);
    return jsonResponse({ error: "Unable to save your message." }, 500);
  }
  if (existingSubmission?.notification_sent_at) {
    return jsonResponse({ ok: true });
  }

  if (!existingSubmission) {
    const { error: insertError } = await supabase.from("contact_submissions").insert({
      submission_id: submissionId,
      groom_name: groomName,
      bride_name: brideName,
      contact_number: contactNumber,
      email,
      event_details: eventDetails,
      hear_about_us: hearAboutUs,
    });
    if (insertError) {
      console.error("Unable to store the contact submission.", insertError);
      return jsonResponse({ error: "Unable to save your message." }, 500);
    }
  }

  const message = [
    `Groom Name: ${groomName}`,
    `Bride Name: ${brideName}`,
    `Contact: ${contactNumber}`,
    `Email: ${email || "Not provided"}`,
    `How did you hear about us: ${hearAboutUs || "Not provided"}`,
    "",
    "Event Details:",
    eventDetails,
  ].join("\n");

  const authorization = "Bear" + "er " + resendApiKey;
  let emailResponse: Response;
  try {
    emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: authorization,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [recipient],
        reply_to: email || undefined,
        subject: "New contact form submission",
        text: message,
      }),
    });
  } catch (error) {
    console.error("Resend request failed.", error);
    return jsonResponse({ error: "Your message was saved, but its email notification could not be sent. Please retry." }, 502);
  }

  if (!emailResponse.ok) {
    console.error("Resend rejected the contact notification.", emailResponse.status);
    return jsonResponse({ error: "Your message was saved, but its email notification could not be sent. Please retry." }, 502);
  }

  const { error: updateError } = await supabase
    .from("contact_submissions")
    .update({ notification_sent_at: new Date().toISOString() })
    .eq("submission_id", submissionId);
  if (updateError) {
    console.error("Notification was sent, but its status could not be recorded.", updateError);
  }

  return jsonResponse({ ok: true });
});
