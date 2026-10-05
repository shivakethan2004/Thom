import { useEffect, useState } from "react";
import { Mail, Phone, Loader2, CheckCircle2 } from "lucide-react";
import { contact } from "../constants/links";
import { getSiteSection } from "../config/Admincontent";
import { supabase } from "../config/supabase";

const HEAR_ABOUT_OPTIONS = [
  "Instagram",
  "Google Search",
  "Friend / Family referral",
  "Pinterest",
  "Wedding Planner",
  "Other",
];

const initialFormState = {
  groomName: "",
  brideName: "",
  contactNumber: "",
  email: "",
  eventDetails: "",
  hearAboutUs: "",
};

export default function Contact() {
  const [form, setForm] = useState(initialFormState);
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error
  const [contactEmail, setContactEmail] = useState(contact.email);
  const [submissionId, setSubmissionId] = useState(() => crypto.randomUUID());

  useEffect(() => {
    getSiteSection("contact")
      .then((content) => {
        if (typeof content.email === "string" && content.email.trim()) {
          setContactEmail(content.email.trim());
        }
      })
      .catch((error) => {
        console.warn("Unable to load the contact email from Supabase.", error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("submitting");

    try {
      const { error } = await supabase.functions.invoke("contact", {
        body: {
          submissionId,
          groomName: form.groomName,
          brideName: form.brideName,
          contactNumber: form.contactNumber,
          email: form.email,
          eventDetails: form.eventDetails,
          hearAboutUs: form.hearAboutUs,
        },
      });

      if (error) throw error;

      setStatus("success");
      setForm(initialFormState);
      setSubmissionId(crypto.randomUUID());
    } catch (error) {
      console.error("Unable to submit the contact form.", error);
      setStatus("error");
    }
  };

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-cream px-6 pb-16 pt-32 text-olive sm:pt-36 md:px-12 md:pb-24 md:pt-40">
      <div className="relative z-10 mx-auto grid max-w-content gap-16 md:grid-cols-2 md:gap-20">
        {/* ---- Left column — intro copy ---- */}
        <div className="flex flex-col justify-center">
          <p className="font-body text-[10px] uppercase tracking-widest2 text-olive/60 md:text-xs">
            Contact
          </p>

          <h1 className="mt-6 font-accent text-4xl font-light leading-[1.1] tracking-tight md:text-5xl lg:text-6xl">
            Your Story Deserves to Be Told Beautifully.
          </h1>

          <p className="mt-6 max-w-md font-body text-sm leading-relaxed text-olive/70 md:text-base">
            We take on a limited number of weddings each year to ensure
            every story receives our full attention. Share your details
            with us, and we’ll get back to you shortly.
          </p>

          <div className="mt-10 h-px w-16 bg-sand" />

          <div className="mt-8 flex flex-col gap-4">
            <a
              href={`mailto:${contactEmail}`}
              className="group flex items-center gap-3 font-body text-sm text-olive/80 transition-colors hover:text-olive"
            >
              <Mail size={16} className="text-olive/50 transition-colors group-hover:text-olive" />
              {contactEmail}
            </a>
            <a
              href={`tel:${contact.phone.replace(/\s+/g, "")}`}
              className="group flex items-center gap-3 font-body text-sm text-olive/80 transition-colors hover:text-olive"
            >
              <Phone size={16} className="text-olive/50 transition-colors group-hover:text-olive" />
              {contact.phoneDisplay}
            </a>
          </div>
        </div>

        {/* ---- Right column — form ---- */}
        <div className="flex flex-col justify-center">
          {status === "success" ? (
            <div className="flex flex-col items-start gap-4 rounded-xl border border-olive/15 bg-olive-50 px-6 py-10 text-left md:px-10">
              <CheckCircle2 size={28} className="text-olive" />
              <h2 className="font-display text-2xl font-light text-olive">
                Thank you — message sent.
              </h2>
              <p className="font-body text-sm leading-relaxed text-olive/70">
                We’ve received your details and will get back to you
                shortly.
              </p>
              <button
                onClick={() => setStatus("idle")}
                className="mt-2 font-body text-xs tracking-widest2 text-olive/70 underline underline-offset-4 transition-colors hover:text-olive"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <Field
                  label="Groom Name"
                  name="groomName"
                  required
                  value={form.groomName}
                  onChange={handleChange}
                />
                <Field
                  label="Bride Name"
                  name="brideName"
                  required
                  value={form.brideName}
                  onChange={handleChange}
                />
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <Field
                  label="Contact"
                  name="contactNumber"
                  type="tel"
                  required
                  value={form.contactNumber}
                  onChange={handleChange}
                />
                <Field
                  label="Email address"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                />
              </div>

              <Field
                as="textarea"
                label="Event Details"
                name="eventDetails"
                required
                rows={4}
                value={form.eventDetails}
                onChange={handleChange}
              />

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="hearAboutUs"
                  className="font-body text-xs tracking-widest2 text-olive/60"
                >
                  How did you hear about us?
                </label>
                <select
                  id="hearAboutUs"
                  name="hearAboutUs"
                  value={form.hearAboutUs}
                  onChange={handleChange}
                  className="border-b border-olive/25 bg-transparent py-2.5 font-body text-sm text-olive outline-none transition-colors focus:border-olive"
                >
                  <option value="" disabled>
                    Select an option
                  </option>
                  {HEAR_ABOUT_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              {status === "error" && (
                <p className="font-body text-xs text-red-700">
                  Something went wrong sending your message. Please try
                  again, or email us directly at {contactEmail}.
                </p>
              )}

              <button
                type="submit"
                disabled={status === "submitting"}
                className="mt-4 inline-flex items-center justify-center gap-2 rounded-full bg-olive px-8 py-3.5 font-body text-sm tracking-wide text-cream transition-colors duration-300 hover:bg-olive-600 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {status === "submitting" && <Loader2 size={16} className="animate-spin" />}
                {status === "submitting" ? "Sending…" : "Send Message"}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------------
 * Field — shared input/textarea with the underline style used across
 * the form.
 * ------------------------------------------------------------------- */
function Field({ as = "input", label, name, type = "text", required = false, rows, value, onChange }) {
  const Tag = as;
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={name} className="font-body text-xs tracking-widest2 text-olive/60">
        {label} {required && <span className="text-olive/40">*</span>}
      </label>
      <Tag
        id={name}
        name={name}
        type={as === "input" ? type : undefined}
        rows={as === "textarea" ? rows : undefined}
        required={required}
        value={value}
        onChange={onChange}
        className="resize-none border-b border-olive/25 bg-transparent py-2.5 font-body text-sm text-olive outline-none transition-colors placeholder:text-olive/30 focus:border-olive"
      />
    </div>
  );
}