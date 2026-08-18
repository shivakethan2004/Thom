import { site, socialLinks } from "../config/links";

export default function Contact() {
  return (
    <section style={{ padding: "4rem var(--page-margin)" }}>
      <h1 style={{ fontSize: "2rem" }}>Contact</h1>
      <p style={{ marginTop: "1rem" }}>{site.email}</p>
      <ul style={{ marginTop: "1rem", listStyle: "none", padding: 0, display: "flex", gap: "1rem" }}>
        {Object.entries(socialLinks).map(([key, url]) => (
          <li key={key}>
            <a href={url} target="_blank" rel="noreferrer">
              {key}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
