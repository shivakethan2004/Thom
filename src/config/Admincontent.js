import { supabase } from "./supabase";

/* -------------------------------------------------------------------
 * Singleton sections (hero, philosophy, contact) — one JSON blob per
 * row in `site_content`, keyed by `section`.
 * ---------------------------------------------------------------- */
export async function getSiteSection(section) {
  const { data, error } = await supabase
    .from("site_content")
    .select("content")
    .eq("section", section)
    .single();
  if (error) throw error;
  return data?.content || {};
}

export async function saveSiteSection(section, content) {
  const { error } = await supabase
    .from("site_content")
    .upsert({ section, content, updated_at: new Date().toISOString() }, { onConflict: "section" });
  if (error) throw error;
}

/* -------------------------------------------------------------------
 * Generic helpers for the row-based tables: slideshow_images, films,
 * instagram_posts. All three share the same shape: id, sort_order,
 * is_active, plus their own fields.
 * ---------------------------------------------------------------- */
export async function listRows(table) {
  const { data, error } = await supabase
    .from(table)
    .select("*")
    .order("sort_order", { ascending: true });
  if (error) throw error;
  return data || [];
}

export async function listPublishedRows(table) {
  const { data, error } = await supabase
    .from(table)
    .select("*")
    .eq("is_active", true)
    .order("sort_order", { ascending: true });
  if (error) throw error;
  return data || [];
}

export async function insertRow(table, row, nextSortOrder, startActive = true) {
  const { data, error } = await supabase
    .from(table)
    .insert({ ...row, sort_order: nextSortOrder, is_active: startActive })
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function updateRow(table, id, patch) {
  const { error } = await supabase.from(table).update(patch).eq("id", id);
  if (error) throw error;
}

export async function deleteRow(table, id) {
  const { error } = await supabase.from(table).delete().eq("id", id);
  if (error) throw error;
}

// Swaps sort_order between two rows so "move up/down" is a single
// cheap update pair rather than renumbering the whole table.
export async function swapSortOrder(table, rowA, rowB) {
  const { error: e1 } = await supabase
    .from(table)
    .update({ sort_order: rowB.sort_order })
    .eq("id", rowA.id);
  const { error: e2 } = await supabase
    .from(table)
    .update({ sort_order: rowA.sort_order })
    .eq("id", rowB.id);
  if (e1 || e2) throw e1 || e2;
}