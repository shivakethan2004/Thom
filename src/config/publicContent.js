import { films as defaultFilms, stories as defaultStories } from "../constants/links";
import { supabase } from "./supabase";
import { listPublishedRows } from "./Admincontent";

function toStory(row) {
  return {
    slug: row.slug,
    title: row.title,
    subtitle: row.subtitle || "Wedding",
    date: row.date || "",
    image: row.image,
    objectPosition: row.object_position || "center",
    href: row.blog_link?.trim() || `/stories/${row.slug}`,
    slideshowId: row.slideshow_id || "",
    scriptSrc: row.script_src || "",
    previewSrc: row.preview_src || "",
  };
}

function toFilm(row) {
  return {
    title: row.title,
    category: row.category || "FILM",
    vimeoId: String(row.vimeo_id || ""),
    vimeoHash: row.vimeo_hash || "",
    href: row.href || "/films",
  };
}

export async function getPublicStories() {
  try {
    const rows = await listPublishedRows("stories");
    return rows.length
      ? rows.filter((row) => row.slug && row.title && row.image).map(toStory)
      : defaultStories;
  } catch (error) {
    console.warn("Unable to load stories from Supabase; using local stories.", error);
    return defaultStories;
  }
}

export async function getPublicFilms() {
  try {
    const rows = await listPublishedRows("films");
    return rows.length
      ? rows.filter((row) => row.title && row.vimeo_id).map(toFilm)
      : defaultFilms;
  } catch (error) {
    console.warn("Unable to load films from Supabase; using local films.", error);
    return defaultFilms;
  }
}

export async function getPublicStoryBySlug(slug) {
  const { data, error } = await supabase
    .from("stories")
    .select("slug, title, subtitle, date, slideshow_id, script_src, preview_src")
    .eq("slug", slug)
    .eq("is_active", true)
    .maybeSingle();

  if (error) throw error;
  if (!data) return null;

  return {
    name: data.title,
    subtitle: data.subtitle || "Wedding",
    date: data.date || "",
    slideshowId: data.slideshow_id,
    scriptSrc: data.script_src,
    previewSrc: data.preview_src,
  };
}