import { useEffect, useState } from "react";
import { supabase } from "../../config/supabase";
import AdminLogin from "./Adminlogin";
import SectionEditor from "./Sectioneditor";
import ListEditor from "./Listeditor";
import EntryGridEditor from "./EntryGridEditor";

const TABS = [
  { id: "hero", label: "Hero Image" },
  { id: "entry-grid", label: "Entry Screen Grid" },
  { id: "philosophy", label: "Philosophy" },
  { id: "slideshow", label: "Slideshow" },
  { id: "stories", label: "Stories" },
  { id: "films", label: "Films" },
  { id: "testimonials", label: "Testimonials" },
  { id: "stories-heading", label: "Stories Text" },
  { id: "films-heading", label: "Films Text" },
  { id: "instagram-heading", label: "Instagram Text" },
  { id: "instagram", label: "Instagram" },
  { id: "contact", label: "Contact" },
];

export default function AdminDashboard() {
  const [session, setSession] = useState(undefined); // undefined = checking
  const [tab, setTab] = useState("hero");

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data: listener } = supabase.auth.onAuthStateChange((_event, s) => setSession(s));
    return () => listener.subscription.unsubscribe();
  }, []);

  if (session === undefined) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-cream text-olive">
        <p className="font-body text-sm text-olive/60">Loading…</p>
      </div>
    );
  }

  if (!session) {
    return <AdminLogin onSuccess={() => {}} />;
  }

  return (
    <div className="min-h-screen bg-cream text-olive">
      <header className="border-b border-olive/15 bg-cream px-5 py-4 sm:px-8">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
          <div>
            <p className="font-body text-[0.65rem] uppercase tracking-widest2 text-olive/55">
              Content management
            </p>
            <h1 className="mt-1 font-accent text-xl text-olive sm:text-2xl">
              The House of Maya
            </h1>
          </div>
          <button
            onClick={() => supabase.auth.signOut()}
            className="shrink-0 font-body text-sm text-olive/65 underline decoration-olive/30 underline-offset-4 transition-colors hover:text-olive"
          >
            Sign out
          </button>
        </div>
      </header>

      <div className="mx-auto grid max-w-6xl gap-5 px-4 py-6 sm:px-6 md:grid-cols-[12rem_minmax(0,1fr)] md:gap-8 md:py-10">
        <nav aria-label="Content sections" className="flex gap-2 overflow-x-auto pb-1 md:block md:space-y-1 md:overflow-visible md:pb-0">
          {TABS.map((t) => (
            <button
              key={t.id}
              type="button"
              aria-current={tab === t.id ? "page" : undefined}
              onClick={() => setTab(t.id)}
              className={`shrink-0 rounded-md px-3 py-2 text-left font-body text-sm transition-colors md:block md:w-full ${
                tab === t.id
                  ? "bg-olive text-cream"
                  : "text-olive/70 hover:bg-olive/10"
              }`}
            >
              {t.label}
            </button>
          ))}
        </nav>

        {/* ---- Active panel ---- */}
        <main className="min-w-0 rounded-lg border border-olive/10 bg-white p-4 sm:p-6">
          {tab === "hero" && (
            <SectionEditor
              section="hero"
              title="Hero Image"
              fields={[{ key: "heroImage", label: "Image URL", type: "text", preview: "image" }]}
            />
          )}

          {tab === "entry-grid" && <EntryGridEditor />}

          {tab === "philosophy" && (
            <SectionEditor
              section="philosophy"
              title="Philosophy"
              fields={[
                { key: "kicker", label: "Kicker (small label)", type: "text" },
                { key: "title", label: "Title", type: "textarea" },
                { key: "body", label: "Body", type: "textarea" },
              ]}
            />
          )}

          {tab === "stories-heading" && (
            <SectionEditor
              section="home_stories"
              title="Homepage Stories Heading"
              fields={[
                { key: "kicker", label: "Small label", type: "text", required: true },
                { key: "title", label: "Heading", type: "text", required: true },
                { key: "description", label: "Description", type: "textarea", required: true },
              ]}
            />
          )}

          {tab === "films-heading" && (
            <SectionEditor
              section="home_films"
              title="Homepage Films Heading"
              fields={[
                { key: "kicker", label: "Small label", type: "text", required: true },
                { key: "title", label: "Heading", type: "text", required: true },
                { key: "description", label: "Description", type: "textarea", required: true },
              ]}
            />
          )}

          {tab === "instagram-heading" && (
            <SectionEditor
              section="home_instagram"
              title="Homepage Instagram Heading"
              fields={[
                { key: "kicker", label: "Small label", type: "text", required: true },
                { key: "title", label: "Heading", type: "text", required: true },
                { key: "description", label: "Description", type: "textarea", required: true },
              ]}
            />
          )}

          {tab === "contact" && (
            <SectionEditor
              section="contact"
              title="Contact Details"
              fields={[
                { key: "email", label: "Email", type: "text" },
                { key: "phone", label: "Phone (raw, for links)", type: "text" },
                { key: "phoneDisplay", label: "Phone (display text)", type: "text" },
                { key: "instagramHandle", label: "Instagram handle", type: "text" },
                { key: "location", label: "Location", type: "text" },
              ]}
            />
          )}

          {tab === "slideshow" && (
            <ListEditor
              table="slideshow_images"
              title="Homepage Slideshow"
              fields={[
                { key: "src", label: "Image URL", type: "text", preview: "image" },
                { key: "caption", label: "Caption", type: "text" },
              ]}
              emptyRow={{ src: "", caption: "" }}
            />
          )}

          {tab === "stories" && (
            <ListEditor
              table="stories"
              title="Stories"
              statusLabel="story"
              newItemsStartPublished={false}
              fields={[
                { key: "slug", label: "Slug (URL part, e.g. rohan-priya)", type: "text" },
                { key: "title", label: "Couple's Names", type: "text" },
                { key: "subtitle", label: "Subtitle (e.g. Wedding)", type: "text" },
                { key: "date", label: "Date", type: "text" },
                { key: "image", label: "Card / Thumbnail Image URL", type: "text", preview: "image" },
                { key: "object_position", label: "Image Position (e.g. center, top)", type: "text" },
                { key: "blog_link", label: "Blog Post Link (optional)", type: "text" },
                { key: "slideshow_id", label: "Gallery Slideshow ID", type: "text" },
                { key: "script_src", label: "Gallery Embed Script URL", type: "text" },
                { key: "preview_src", label: "Preview Blob URL (optional)", type: "text" },
              ]}
              emptyRow={{
                slug: "",
                title: "",
                subtitle: "Wedding",
                date: "",
                image: "",
                object_position: "center",
                blog_link: "",
                slideshow_id: "",
                script_src: "",
                preview_src: "",
              }}
            />
          )}

          {tab === "films" && (
            <ListEditor
              table="films"
              title="Films"
              fields={[
                { key: "title", label: "Title", type: "text" },
                { key: "category", label: "Category (e.g. WEDDING FILM)", type: "text" },
                { key: "vimeo_id", label: "Vimeo ID", type: "text" },
                { key: "vimeo_hash", label: "Vimeo Hash", type: "text" },
                { key: "href", label: "Link (e.g. /films/1)", type: "text" },
              ]}
              emptyRow={{ title: "", category: "", vimeo_id: "", vimeo_hash: "", href: "" }}
            />
          )}

          {tab === "testimonials" && (
            <ListEditor
              table="testimonials"
              title="Testimonials"
              fields={[
                { key: "name", label: "Heading", type: "text" },
                { key: "text", label: "Description", type: "textarea" },
                { key: "background_color", label: "Card background color", type: "color" },
                { key: "url", label: "Photo URL", type: "text", preview: "image" },
              ]}
              emptyRow={{
                name: "",
                text: "",
                background_color: "#F7EFE7",
                url: "",
              }}
            />
          )}

          {tab === "instagram" && (
            <ListEditor
              table="instagram_posts"
              title="Instagram Feed"
              fields={[
                { key: "image", label: "Image URL", type: "text", preview: "image" },
                { key: "href", label: "Instagram Post Link", type: "text" },
              ]}
              emptyRow={{ image: "", href: "" }}
            />
          )}
        </main>
      </div>
    </div>
  );
}