import { useEffect, useState } from "react";
import { getSiteSection, saveSiteSection } from "../../config/Admincontent";

/**
 * Editor for a single JSON-blob section, e.g. hero / philosophy / contact.
 * `fields`: [{ key, label, type: "text" | "textarea", preview: "image" }]
 */
export default function SectionEditor({ section, title, fields }) {
  const [content, setContent] = useState(null);
  const [status, setStatus] = useState(""); // "", "saving", "saved", error message

  useEffect(() => {
    getSiteSection(section).then(setContent).catch((e) => setStatus(e.message));
  }, [section]);

  function handleChange(key, value) {
    setContent((c) => ({ ...c, [key]: value }));
  }

  async function handleSave() {
    const missingField = fields.find(
      (field) => field.required && !content[field.key]?.trim()
    );
    if (missingField) {
      setStatus(`${missingField.label} cannot be empty.`);
      return;
    }

    setStatus("saving");
    try {
      const updatedContent = { ...content };
      fields.forEach((field) => {
        if (field.required) updatedContent[field.key] = content[field.key].trim();
      });
      await saveSiteSection(section, updatedContent);
      setContent(updatedContent);
      setStatus("saved");
      setTimeout(() => setStatus(""), 1500);
    } catch (e) {
      setStatus(e.message);
    }
  }

  if (!content) return <p className="font-body text-sm text-olive/60">Loading…</p>;

  return (
    <div>
      <h2 className="font-accent text-2xl text-olive">{title}</h2>

      <div className="mt-5 max-w-lg space-y-4">
        {fields.map((f) => (
          <div key={f.key}>
            <label htmlFor={`section-${section}-${f.key}`} className="block font-body text-sm text-olive/65">
              {f.label}{f.required ? " *" : ""}
            </label>
            {f.preview === "image" && content[f.key] && (
              <img
                src={content[f.key]}
                alt=""
                className="mt-2 h-32 w-full rounded-lg object-cover"
              />
            )}
            {f.type === "textarea" ? (
              <textarea
                id={`section-${section}-${f.key}`}
                rows={3}
                required={f.required}
                value={content[f.key] || ""}
                onChange={(e) => handleChange(f.key, e.target.value)}
                className="mt-1.5 w-full rounded-md border border-olive/20 bg-cream/50 px-3 py-2.5 font-body text-base text-olive outline-none transition-colors focus:border-olive"
              />
            ) : (
              <input
                id={`section-${section}-${f.key}`}
                type="text"
                required={f.required}
                value={content[f.key] || ""}
                onChange={(e) => handleChange(f.key, e.target.value)}
                className="mt-1.5 w-full rounded-md border border-olive/20 bg-cream/50 px-3 py-2.5 font-body text-base text-olive outline-none transition-colors focus:border-olive"
              />
            )}
          </div>
        ))}
      </div>

      <button
        onClick={handleSave}
        disabled={status === "saving"}
        className="mt-6 rounded-full bg-olive px-6 py-3 font-body text-sm tracking-wide text-cream transition-colors hover:bg-olive-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {status === "saving" ? "Saving…" : "Save changes"}
      </button>
      {status === "saved" && (
        <span className="ml-3 font-body text-sm text-olive-700">Saved</span>
      )}
      {status && status !== "saving" && status !== "saved" && (
        <span role="alert" className="ml-3 font-body text-sm text-red-700">{status}</span>
      )}
    </div>
  );
}