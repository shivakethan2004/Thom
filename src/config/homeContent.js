import { contact, films, media, posts, slideshowImages, stories } from "../constants/links";
import { philosophy } from "../constants/text";
import { getSiteSection, listPublishedRows } from "./Admincontent";

async function loadSafely(label, load) {
  try {
    return await load();
  } catch (error) {
    console.warn(
      `Unable to load homepage ${label} from Supabase; using local content.`,
      error
    );
    return null;
  }
}

function contentValue(content, key, fallback) {
  const value = content?.[key];
  return typeof value === "string" && value.trim() ? value.trim() : fallback;
}

export async function getHomeContent() {
  const [heroContent, philosophyContent, contactContent, slideRows, storyRows, filmRows, postRows] =
    await Promise.all([
      loadSafely("hero section", () => getSiteSection("hero")),
      loadSafely("philosophy section", () => getSiteSection("philosophy")),
      loadSafely("contact section", () => getSiteSection("contact")),
      loadSafely("slideshow images", () => listPublishedRows("slideshow_images")),
      loadSafely("stories", () => listPublishedRows("stories")),
      loadSafely("films", () => listPublishedRows("films")),
      loadSafely("Instagram posts", () => listPublishedRows("instagram_posts")),
    ]);

  const instagramHandle = contentValue(
    contactContent,
    "instagramHandle",
    contact.instagramHandle
  ).replace(/^@/, "");

  return {
    heroImage: contentValue(heroContent, "heroImage", media.heroImage),
    philosophy: {
      kicker: contentValue(philosophyContent, "kicker", philosophy.kicker),
      title: contentValue(philosophyContent, "title", philosophy.title),
      body: contentValue(philosophyContent, "body", philosophy.body),
    },
    slideshowImages: slideRows?.length
      ? slideRows
          .filter((row) => row.src)
          .map((row) => ({ src: row.src, caption: row.caption || "" }))
      : slideshowImages,
    stories: storyRows?.length
      ? storyRows
          .filter((row) => row.title && row.image)
          .map((row) => ({
            title: row.title,
            date: row.date || "",
            image: row.image,
            objectPosition: row.object_position || "50% 50%",
            href:
              row.blog_link?.trim() ||
              (row.slug ? `/stories/${row.slug}` : "/stories"),
          }))
      : stories,
    films: filmRows?.length
      ? filmRows
          .filter((row) => row.vimeo_id)
          .map((row) => ({
            title: row.title,
            category: row.category || "FILM",
            vimeoId: String(row.vimeo_id),
            vimeoHash: row.vimeo_hash || "",
            href: row.href || "/films",
          }))
      : films,
    posts: postRows?.length
      ? postRows
          .filter((row) => row.image && row.href)
          .map((row) => ({ image: row.image, href: row.href }))
      : posts,
    contact: {
      ...contact,
      email: contentValue(contactContent, "email", contact.email),
      phone: contentValue(contactContent, "phone", contact.phone),
      phoneDisplay: contentValue(
        contactContent,
        "phoneDisplay",
        contact.phoneDisplay
      ),
      instagramHandle: `@${instagramHandle}`,
      instagram:
        contentValue(contactContent, "instagram", "") ||
        `https://www.instagram.com/${instagramHandle}/`,
      location: contentValue(contactContent, "location", contact.location),
    },
  };
}