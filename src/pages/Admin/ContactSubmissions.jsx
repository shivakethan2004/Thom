import { useCallback, useEffect, useState } from "react";
import { Mail, Phone, RefreshCw } from "lucide-react";
import { supabase } from "../../config/supabase";

const SUBMISSION_FIELDS =
  "submission_id, groom_name, bride_name, contact_number, email, event_details, hear_about_us, created_at, notification_sent_at";

export default function ContactSubmissions() {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadSubmissions = useCallback(async () => {
    setLoading(true);
    setError("");

    const { data, error: queryError } = await supabase
      .from("contact_submissions")
      .select(SUBMISSION_FIELDS)
      .order("created_at", { ascending: false })
      .limit(100);

    if (queryError) {
      setError(queryError.message);
    } else {
      setSubmissions(data || []);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    loadSubmissions();
  }, [loadSubmissions]);

  return (
    <section>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="font-accent text-2xl text-olive">Contact Submissions</h2>
          <p className="mt-1 font-body text-sm text-olive/55">
            Showing the latest 100 messages.
          </p>
        </div>
        <button
          type="button"
          onClick={loadSubmissions}
          disabled={loading}
          className="inline-flex items-center gap-2 rounded-full border border-olive/20 px-4 py-2 font-body text-sm text-olive transition-colors hover:bg-olive/5 disabled:cursor-wait disabled:opacity-50"
        >
          <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
          Refresh
        </button>
      </div>

      {error && (
        <p role="alert" className="mt-5 rounded-md bg-red-50 p-3 font-body text-sm text-red-800">
          Unable to load submissions: {error}. Confirm the contact submissions SQL
          has been run in Supabase.
        </p>
      )}

      {loading ? (
        <p className="mt-5 font-body text-sm text-olive/60">Loading submissions…</p>
      ) : !error && submissions.length === 0 ? (
        <p className="mt-5 rounded-lg border border-olive/10 bg-cream/40 p-5 font-body text-sm text-olive/60">
          No contact submissions yet.
        </p>
      ) : (
        <div className="mt-5 space-y-4">
          {submissions.map((submission) => (
            <article
              key={submission.submission_id}
              className="rounded-lg border border-olive/15 bg-cream/40 p-4 sm:p-5"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="font-display text-xl text-olive">
                  {submission.bride_name} &amp; {submission.groom_name}
                </h3>
                <time
                  dateTime={submission.created_at}
                  className="font-body text-xs text-olive/55"
                >
                  {new Date(submission.created_at).toLocaleString()}
                </time>
              </div>

              <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 font-body text-sm text-olive/75">
                <a
                  href={`tel:${submission.contact_number.replace(/\s+/g, "")}`}
                  className="inline-flex items-center gap-2 hover:text-olive"
                >
                  <Phone size={14} />
                  {submission.contact_number}
                </a>
                {submission.email && (
                  <a
                    href={`mailto:${submission.email}`}
                    className="inline-flex items-center gap-2 hover:text-olive"
                  >
                    <Mail size={14} />
                    {submission.email}
                  </a>
                )}
              </div>

              <div className="mt-4">
                <h4 className="font-body text-xs uppercase tracking-widest text-olive/55">
                  Event details
                </h4>
                <p className="mt-1 whitespace-pre-wrap font-body text-sm leading-relaxed text-olive/80">
                  {submission.event_details}
                </p>
              </div>

              <p className="mt-4 font-body text-xs text-olive/55">
                Heard about us: {submission.hear_about_us || "Not provided"}
                {" · "}
                Email notification: {submission.notification_sent_at ? "Sent" : "Pending"}
              </p>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
