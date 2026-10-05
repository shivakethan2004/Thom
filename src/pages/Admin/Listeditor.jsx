import { useEffect, useState } from "react";
import { ArrowUp, ArrowDown, Trash2, Plus, Eye, EyeOff, Link2 } from "lucide-react";
import {
  listRows,
  insertRow,
  updateRow,
  deleteRow,
  swapSortOrder,
} from "../../config/Admincontent";

/**
 * Generic editor for a "rows table" (slideshow_images, films,
 * instagram_posts — anything with id / sort_order / is_active plus
 * a fixed set of text fields).
 *
 * `fields` describes each editable field:
 *   { key: "src", label: "Image URL", type: "text", preview: "image" }
 */
export default function ListEditor({ table, title, fields, emptyRow, statusLabel, newItemsStartPublished = true }) {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState(null);
  const [error, setError] = useState("");
  const [copiedId, setCopiedId] = useState(null);

  useEffect(() => {
    async function loadRows() {
      setLoading(true);
      try {
        setRows(await listRows(table));
        setError("");
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }

    loadRows();
  }, [table]);

  async function handleAdd() {
    const nextSort = rows.length ? Math.max(...rows.map((r) => r.sort_order)) + 1 : 0;
    try {
      const created = await insertRow(table, emptyRow, nextSort, newItemsStartPublished);
      setRows((r) => [...r, created]);
    } catch (e) {
      setError(e.message);
    }
  }

  async function handleFieldChange(id, key, value) {
    setRows((rs) => rs.map((r) => (r.id === id ? { ...r, [key]: value } : r)));
  }

  async function handleBlurSave(row) {
    setSavingId(row.id);
    try {
      const patch = {};
      fields.forEach((f) => (patch[f.key] = row[f.key]));
      await updateRow(table, row.id, patch);
    } catch (e) {
      setError(e.message);
    } finally {
      setSavingId(null);
    }
  }

  async function handleToggleActive(row) {
    try {
      await updateRow(table, row.id, { is_active: !row.is_active });
      setRows((rs) =>
        rs.map((r) => (r.id === row.id ? { ...r, is_active: !r.is_active } : r))
      );
    } catch (e) {
      setError(e.message);
    }
  }

  async function handleDelete(row) {
    if (!confirm("Delete this item? This can't be undone.")) return;
    try {
      await deleteRow(table, row.id);
      setRows((rs) => rs.filter((r) => r.id !== row.id));
    } catch (e) {
      setError(e.message);
    }
  }

  async function handleCopyShareLink(row) {
    const path =
      table === "stories"
        ? row.slug && `/stories/${encodeURIComponent(row.slug)}`
        : table === "films"
          ? row.id && `/films/${encodeURIComponent(row.id)}`
          : null;

    if (!path) {
      setError(`Add a ${table === "stories" ? "slug" : "film ID"} before copying a share link.`);
      return;
    }

    try {
      await navigator.clipboard.writeText(`${window.location.origin}${path}`);
      setCopiedId(row.id);
      setError("");
      window.setTimeout(() => setCopiedId(null), 2000);
    } catch (copyError) {
      setError(`Unable to copy the share link: ${copyError.message}`);
    }
  }

  async function handleMove(row, direction) {
    const sorted = [...rows].sort((a, b) => a.sort_order - b.sort_order);
    const idx = sorted.findIndex((r) => r.id === row.id);
    const swapIdx = direction === "up" ? idx - 1 : idx + 1;
    if (swapIdx < 0 || swapIdx >= sorted.length) return;
    const other = sorted[swapIdx];
    try {
      await swapSortOrder(table, row, other);
      const updated = [...rows];
      const a = updated.find((r) => r.id === row.id);
      const b = updated.find((r) => r.id === other.id);
      [a.sort_order, b.sort_order] = [b.sort_order, a.sort_order];
      setRows(updated);
    } catch (e) {
      setError(e.message);
    }
  }

  if (loading) return <p className="font-body text-sm text-olive/60">Loading…</p>;

  const sorted = [...rows].sort((a, b) => a.sort_order - b.sort_order);

  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="font-accent text-2xl text-olive">{title}</h2>
        <button
          type="button"
          onClick={handleAdd}
          className="flex shrink-0 items-center gap-1.5 rounded-full bg-olive px-4 py-2.5 font-body text-sm text-cream transition-colors hover:bg-olive-700"
        >
          <Plus size={14} /> Add
        </button>
      </div>

      {error && <p role="alert" className="mt-3 font-body text-sm text-red-700">{error}</p>}

      <div className="mt-5 space-y-4">
        {sorted.length === 0 && (
          <p className="font-body text-sm text-olive/50">Nothing here yet.</p>
        )}
        {sorted.map((row, i) => (
          <div
            key={row.id}
            className={`rounded-lg border border-olive/15 bg-cream/40 p-3 sm:p-4 ${
              !row.is_active ? "opacity-50" : ""
            }`}
          >
            <div className="flex items-start gap-4">
              {fields.some((f) => f.preview === "image") && row[fields.find((f) => f.preview === "image").key] && (
                <img
                  src={row[fields.find((f) => f.preview === "image").key]}
                  alt=""
                  className="h-16 w-16 flex-shrink-0 rounded-md border border-olive/10 object-cover"
                />
              )}

              <div className="min-w-0 flex-1 space-y-2">
                {fields.map((f) => (
                  <div key={f.key}>
                    <label htmlFor={`${table}-${row.id}-${f.key}`} className="block font-body text-xs text-olive/60">
                      {f.label}
                    </label>
                    {f.type === "textarea" ? (
                      <textarea
                        id={`${table}-${row.id}-${f.key}`}
                        rows={4}
                        value={row[f.key] || ""}
                        onChange={(e) => handleFieldChange(row.id, f.key, e.target.value)}
                        onBlur={() => handleBlurSave(row)}
                        className="mt-1 w-full rounded-md border border-olive/15 bg-white px-2.5 py-2 font-body text-base text-olive outline-none transition-colors focus:border-olive"
                      />
                    ) : (
                      <input
                        id={`${table}-${row.id}-${f.key}`}
                        type={f.type === "color" ? "color" : "text"}
                        value={row[f.key] || (f.type === "color" ? "#000000" : "")}
                        onChange={(e) => handleFieldChange(row.id, f.key, e.target.value)}
                        onBlur={() => handleBlurSave(row)}
                        className={`mt-1 w-full rounded-md border border-olive/15 bg-white px-2.5 py-2 font-body text-base text-olive outline-none transition-colors focus:border-olive ${
                          f.type === "color" ? "h-11 cursor-pointer" : ""
                        }`}
                      />
                    )}
                  </div>
                ))}
                {savingId === row.id && (
                  <p className="font-body text-[0.65rem] text-olive/40">Saving…</p>
                )}
              </div>

              <div className="flex flex-shrink-0 flex-col items-center gap-1">
                {(table === "stories" || table === "films") && (
                  <button
                    type="button"
                    onClick={() => handleCopyShareLink(row)}
                    aria-label={`Copy share link for ${row.title || "this item"}`}
                    title={copiedId === row.id ? "Link copied" : "Copy unlisted share link"}
                    className="inline-flex items-center gap-1 rounded px-1 py-1 font-body text-[0.65rem] text-olive/60 hover:bg-olive/10"
                  >
                    <Link2 size={16} />
                    {copiedId === row.id ? "Copied" : "Share"}
                  </button>
                )}
                <button
                  onClick={() => handleMove(row, "up")}
                  disabled={i === 0}
                  aria-label="Move up"
                  className="rounded p-1 text-olive/60 hover:bg-olive/10 disabled:opacity-30"
                >
                  <ArrowUp size={16} />
                </button>
                <button
                  onClick={() => handleMove(row, "down")}
                  disabled={i === sorted.length - 1}
                  aria-label="Move down"
                  className="rounded p-1 text-olive/60 hover:bg-olive/10 disabled:opacity-30"
                >
                  <ArrowDown size={16} />
                </button>

                {statusLabel ? (
                  <button
                    onClick={() => handleToggleActive(row)}
                    className={`whitespace-nowrap rounded-full px-2.5 py-1 font-body text-xs ${
                      row.is_active
                        ? "bg-olive-100 text-olive-800 hover:bg-olive-200"
                        : "bg-olive/10 text-olive/60 hover:bg-olive/20"
                    }`}
                    title={row.is_active ? `Click to unpublish this ${statusLabel}` : `Click to publish this ${statusLabel}`}
                  >
                    {row.is_active ? "Published" : "Draft — Publish"}
                  </button>
                ) : (
                  <button
                    onClick={() => handleToggleActive(row)}
                    aria-label={row.is_active ? "Hide from site" : "Show on site"}
                    className="rounded p-1 text-olive/60 hover:bg-olive/10"
                    title={row.is_active ? "Visible on site — click to hide" : "Hidden — click to show"}
                  >
                    {row.is_active ? <Eye size={16} /> : <EyeOff size={16} />}
                  </button>
                )}

                <button
                  onClick={() => handleDelete(row)}
                  aria-label="Delete"
                  className="rounded-md p-1.5 text-red-700/70 transition-colors hover:bg-red-50 hover:text-red-700"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}