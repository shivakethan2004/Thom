import { useEffect, useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { EntryGridTiles } from "../../components/EntryScreen/PhotoGrid";
import {
  DEFAULT_ENTRY_SCREEN,
  ENTRY_LAYOUTS,
  getEntryScreenSettings,
  saveEntryScreenSettings,
} from "../../config/entryScreen";

function PreviewCenter({ mobile }) {
  return (
    <div className="entry-preview-center px-3 text-olive">
      <img
        src="/images/logo-mark.png"
        alt=""
        className={`mb-1 h-auto object-contain ${mobile ? "w-5" : "w-7"}`}
      />
      <span
        className={`flex flex-col items-center font-display font-light uppercase leading-none tracking-[0.14em] ${
          mobile ? "text-[8px]" : "text-[11px]"
        }`}
      >
        THE HOUSE
        <span className="mt-1">OF MAYA</span>
      </span>
      <span className={`w-px bg-olive/60 ${mobile ? "my-1 h-2" : "my-2 h-3"}`} />
      <span className={`font-body uppercase tracking-[0.18em] ${mobile ? "text-[4px]" : "text-[5px]"}`}>
        Storytelling through<br />timeless imagery
      </span>
      <span className={`border border-olive/40 font-body uppercase tracking-widest ${mobile ? "mt-2 px-2 py-1 text-[4px]" : "mt-3 px-3 py-1 text-[5px]"}`}>
        Enter the house →
      </span>
    </div>
  );
}

function GridPreview({ settings, mode }) {
  const isMobile = mode === "mobile";

  return (
    <div
      className={`entry-grid-preview relative mx-auto overflow-hidden bg-cream ${
        isMobile
          ? "aspect-[9/16] w-[min(100%,220px)]"
          : "aspect-video w-full"
      }`}
      data-preview-mode={mode}
    >
      <div
        data-layout={settings.layout}
        className="entry-photo-grid absolute inset-0 h-full w-full"
      >
        <EntryGridTiles
          layout={settings.layout}
          imageLibrary={settings.imageLibrary}
          imageSlots={settings.imageSlots}
        />
      </div>
      <PreviewCenter mobile={isMobile} />
    </div>
  );
}

export default function EntryGridEditor() {
  const [settings, setSettings] = useState(DEFAULT_ENTRY_SCREEN);
  const [mode, setMode] = useState("desktop");
  const [newImageUrl, setNewImageUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState("");

  useEffect(() => {
    let cancelled = false;
    getEntryScreenSettings()
      .then((loaded) => {
        if (!cancelled) setSettings(loaded);
      })
      .catch((error) => {
        if (!cancelled) setStatus(`Unable to load entry screen settings: ${error.message}`);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  function updateSettings(patch) {
    setSettings((current) => ({ ...current, ...patch }));
  }

  function addImage(event) {
    event.preventDefault();
    const url = newImageUrl.trim();
    try {
      const parsedUrl = new URL(url);
      if (!["http:", "https:"].includes(parsedUrl.protocol)) throw new Error();
    } catch {
      setStatus("Enter a valid image URL starting with http:// or https://.");
      return;
    }
    if (settings.imageLibrary.includes(url)) {
      setStatus("That image URL is already in your image library.");
      return;
    }

    updateSettings({ imageLibrary: [...settings.imageLibrary, url] });
    setNewImageUrl("");
    setStatus("");
  }

  function removeImage(index) {
    updateSettings({
      imageLibrary: settings.imageLibrary.filter((_, imageIndex) => imageIndex !== index),
      imageSlots: settings.imageSlots.map((slot) =>
        slot === index ? -1 : slot > index ? slot - 1 : slot
      ),
    });
  }

  async function handleSave() {
    const slotCount = ENTRY_LAYOUTS[settings.layout].slots.length;
    if (settings.imageLibrary.some((url) => !url.trim())) {
      setStatus("Image URLs in the library cannot be empty.");
      return;
    }
    if (settings.imageSlots.length !== slotCount) {
      setStatus("Choose a layout again so each image slot is available.");
      return;
    }
    if (settings.imageSlots.some((slot) => !Number.isInteger(slot) || !settings.imageLibrary[slot])) {
      setStatus("Choose an image for every slot in this layout.");
      return;
    }

    setSaving(true);
    setStatus("");
    try {
      await saveEntryScreenSettings(settings);
      setStatus("Saved. The entry screen will use this layout next time it loads.");
    } catch (error) {
      setStatus(`Unable to save entry screen settings: ${error.message}`);
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <p className="font-body text-sm text-olive/60">Loading…</p>;

  const activeSlots = ENTRY_LAYOUTS[settings.layout].slots.length;

  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="font-accent text-2xl text-olive">Entry Screen Photo Grid</h2>
          <p className="mt-1 font-body text-sm text-olive/60">
            Choose a layout, manage your photo URL library, and assign photos to its slots.
          </p>
        </div>
      </div>

      <fieldset className="mt-6">
        <legend className="font-body text-sm text-olive/70">Choose a layout</legend>
        <div className="mt-2 grid gap-2 sm:grid-cols-2">
          {Object.entries(ENTRY_LAYOUTS).map(([id, layout]) => (
            <button
              key={id}
              type="button"
              aria-pressed={settings.layout === id}
              onClick={() => {
                updateSettings({
                  layout: id,
                  imageSlots: Array.from(
                    { length: layout.slots.length },
                    (_, index) => settings.imageSlots[index] ?? -1
                  ),
                });
                setStatus("");
              }}
              className={`rounded-md border px-3 py-2 text-left font-body text-sm ${
                settings.layout === id
                  ? "border-olive bg-olive/10 text-olive"
                  : "border-olive/15 text-olive/70 hover:bg-olive/5"
              }`}
            >
              {layout.label}
            </button>
          ))}
        </div>
      </fieldset>

      <section className="mt-6">
        <h3 className="font-body text-sm text-olive/70">Image library</h3>
        <form onSubmit={addImage} className="mt-2 flex flex-col gap-2 sm:flex-row">
          <label className="sr-only" htmlFor="entry-grid-new-image-url">New image URL</label>
          <input
            id="entry-grid-new-image-url"
            type="url"
            value={newImageUrl}
            onChange={(event) => setNewImageUrl(event.target.value)}
            placeholder="Paste an image URL (https://...)"
            className="min-w-0 flex-1 rounded-md border border-olive/15 bg-white px-3 py-2 font-body text-base text-olive outline-none focus:border-olive"
          />
          <button
            type="submit"
            className="flex items-center justify-center gap-1.5 rounded-full bg-olive px-4 py-2 font-body text-sm text-cream hover:bg-olive-700"
          >
            <Plus size={15} /> Add image
          </button>
        </form>

        <div className="mt-3 space-y-2">
          {settings.imageLibrary.map((url, index) => (
            <div key={`${index}-${url}`} className="flex items-center gap-2">
              <img
                src={url}
                alt=""
                className="h-12 w-12 shrink-0 rounded object-cover"
              />
              <label className="sr-only" htmlFor={`entry-grid-library-${index}`}>
                Image URL {index + 1}
              </label>
              <input
                id={`entry-grid-library-${index}`}
                type="url"
                value={url}
                onChange={(event) => {
                  const imageLibrary = [...settings.imageLibrary];
                  imageLibrary[index] = event.target.value;
                  updateSettings({ imageLibrary });
                }}
                className="min-w-0 flex-1 rounded-md border border-olive/15 bg-white px-2.5 py-2 font-body text-sm text-olive outline-none focus:border-olive"
              />
              <button
                type="button"
                aria-label={`Remove image ${index + 1}`}
                onClick={() => removeImage(index)}
                className="rounded p-2 text-red-700/70 hover:bg-red-50"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
          {settings.imageLibrary.length === 0 && (
            <p className="font-body text-sm text-olive/50">Add at least one image URL to continue.</p>
          )}
        </div>
      </section>

      <fieldset className="mt-6">
        <legend className="font-body text-sm text-olive/70">Assign photos to this layout</legend>
        <div className="mt-2 grid gap-3 sm:grid-cols-2">
          {Array.from({ length: activeSlots }, (_, index) => (
            <div key={`${settings.layout}-slot-${index}`}>
              <label
                htmlFor={`entry-grid-slot-${index}`}
                className="block font-body text-xs text-olive/60"
              >
                Photo {index + 1}
              </label>
              <select
                id={`entry-grid-slot-${index}`}
                value={settings.imageSlots[index] ?? -1}
                onChange={(event) => {
                  const imageSlots = [...settings.imageSlots];
                  imageSlots[index] = Number(event.target.value);
                  updateSettings({ imageSlots });
                  setStatus("");
                }}
                className="mt-1 w-full rounded-md border border-olive/15 bg-white px-2.5 py-2 font-body text-sm text-olive outline-none focus:border-olive"
              >
                <option value={-1}>Choose a photo…</option>
                {settings.imageLibrary.map((url, photoIndex) => (
                  <option key={`${photoIndex}-${url}`} value={photoIndex}>
                    Photo {photoIndex + 1} — {url.slice(0, 55)}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>
      </fieldset>

      <section className="mt-7">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h3 className="font-body text-sm text-olive/70">Preview</h3>
          <div className="flex gap-2" role="group" aria-label="Preview size">
            {["desktop", "mobile"].map((previewMode) => (
              <button
                key={previewMode}
                type="button"
                aria-pressed={mode === previewMode}
                onClick={() => setMode(previewMode)}
                className={`rounded-full px-3 py-1.5 font-body text-xs capitalize ${
                  mode === previewMode ? "bg-olive text-cream" : "bg-olive/10 text-olive/70"
                }`}
              >
                {previewMode}
              </button>
            ))}
          </div>
        </div>
        <div className="mt-3 rounded-lg bg-cream/70 p-3 sm:p-5">
          <GridPreview settings={settings} mode={mode} />
        </div>
      </section>

      <button
        type="button"
        onClick={handleSave}
        disabled={saving}
        className="mt-6 rounded-full bg-olive px-6 py-3 font-body text-sm tracking-wide text-cream transition-colors hover:bg-olive-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {saving ? "Saving…" : "Save entry screen"}
      </button>
      {status && (
        <p
          role={status.startsWith("Saved") ? "status" : "alert"}
          className={`mt-3 font-body text-sm ${
            status.startsWith("Saved") ? "text-olive-700" : "text-red-700"
          }`}
        >
          {status}
        </p>
      )}
    </div>
  );
}
