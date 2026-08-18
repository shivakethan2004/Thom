import { catalog } from "../config/links";

/**
 * Every card here comes from src/config/links.js → `catalog`.
 * Add/edit/remove projects there — this component never needs to change.
 */
export default function Catalog() {
  return (
    <section style={{ padding: "3rem var(--page-margin)" }}>
      <h1 style={{ fontSize: "1.8rem", marginBottom: "2rem" }}>Catalog</h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
          gap: "1.5rem",
        }}
      >
        {catalog.map((project) => (
          <a
            key={project.id}
            href={project.externalLink || undefined}
            style={{ display: "block" }}
          >
            <img
              src={project.cover}
              alt={project.title}
              loading="lazy"
              style={{ width: "100%", aspectRatio: "4 / 5", objectFit: "cover" }}
            />
            <p style={{ marginTop: "0.5rem", fontSize: "0.9rem" }}>{project.title}</p>
            <p style={{ fontSize: "0.75rem", opacity: 0.6 }}>{project.category}</p>
          </a>
        ))}
      </div>
    </section>
  );
}
