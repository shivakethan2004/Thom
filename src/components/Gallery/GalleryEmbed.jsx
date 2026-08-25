import { useEffect, useRef } from "react";

/**
 * Injects a House of Maya slideshow embed (data script + template + widget
 * script) imperatively, since raw <script> tags placed directly in JSX are
 * inert in React and never execute.
 */
export default function GalleryEmbed({
  slideshowId,
  scriptSrc,
  title,
  subtitle,
  date,
  ctaLabel = "View Full Gallery",
}) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.innerHTML = "";

    // 1. the data variable the widget script reads
    const dataScript = document.createElement("script");
    dataScript.type = "text/javascript";
    dataScript.text = `const searchread_${slideshowId} = \`${title}\n${subtitle}\n${date}\n${ctaLabel}\`;`;
    container.appendChild(dataScript);

    // 2. the template the widget hydrates into
    const template = document.createElement("template");
    template.setAttribute("data-pt-type", "blog");
    template.setAttribute("data-pt-slideshowid", slideshowId);
    container.appendChild(template);

    // 3. the widget script itself
    const widgetScript = document.createElement("script");
    widgetScript.src = scriptSrc;
    widgetScript.type = "text/javascript";
    widgetScript.async = true;
    widgetScript.setAttribute("data-pt-scriptslideshowid", slideshowId);
    container.appendChild(widgetScript);

    // Clean up on unmount / prop change so the script doesn't double-load
    // when the user navigates away and back.
    return () => {
      container.innerHTML = "";
    };
  }, [slideshowId, scriptSrc, title, subtitle, date, ctaLabel]);

  return <div ref={containerRef} className="w-full" />;
}