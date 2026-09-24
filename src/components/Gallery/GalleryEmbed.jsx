import { useEffect, useRef } from "react";

export default function GalleryEmbed({
  slideshowId,
  scriptSrc,
  title,
  subtitle,
  date,
  ctaLabel = "View Full Gallery",
  onLoad,
  onError,
}) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.innerHTML = "";

    // 1. the data variable the widget script reads
    // NOTE: must be `var`, not `const` — `const` throws a SyntaxError
    // if this effect ever re-runs and re-declares the same identifier.
    const dataScript = document.createElement("script");
    dataScript.type = "text/javascript";
    dataScript.text = `var searchread_${slideshowId} = \`${title}\n${subtitle}\n${date}\n${ctaLabel}\`;`;
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

    const handleLoad = () => onLoad?.();
    const handleError = (err) => onError?.(err);
    widgetScript.addEventListener("load", handleLoad);
    widgetScript.addEventListener("error", handleError);

    container.appendChild(widgetScript);

    return () => {
      widgetScript.removeEventListener("load", handleLoad);
      widgetScript.removeEventListener("error", handleError);
      container.innerHTML = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slideshowId, scriptSrc, title, subtitle, date, ctaLabel]);
  // ^ intentionally NOT including onLoad/onError here — see StoryDetail,
  // where they're wrapped in useCallback so their identity is stable.
  // If they were included and unstable, this effect (and the script
  // injection) would re-run on every parent render, re-declaring the
  // dataScript's identifier and crashing.

  return <div ref={containerRef} className="w-full" />;
}