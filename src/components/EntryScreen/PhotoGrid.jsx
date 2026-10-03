import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import "./PhotoGrid.css";
import {
  DEFAULT_ENTRY_SCREEN,
  ENTRY_LAYOUTS,
  getEntryScreenSettings,
} from "../../config/entryScreen";

function tileStyle(position) {
  return {
    "--desktop-column": position.desktop[0],
    "--desktop-row": position.desktop[1],
    "--mobile-column": position.mobile[0],
    "--mobile-row": position.mobile[1],
  };
}

export function EntryGridTiles({ layout, imageLibrary, imageSlots }) {
  const layoutConfig = ENTRY_LAYOUTS[layout] || ENTRY_LAYOUTS.classic;

  return layoutConfig.slots.map((position, index) => {
    const photo = imageLibrary[imageSlots[index]];
    if (!photo) return null;

    return (
      <div
        key={`${index}-${photo}`}
        className="entry-photo-tile relative min-h-0 min-w-0 overflow-hidden bg-olive/10"
        style={tileStyle(position)}
      >
        <img
          src={photo}
          alt=""
          loading="lazy"
          className="h-full w-full object-cover grayscale-[15%] contrast-[1.02] saturate-[0.92]"
        />
      </div>
    );
  });
}

export default function PhotoGrid({ active = true }) {
  const [settings, setSettings] = useState(DEFAULT_ENTRY_SCREEN);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    let cancelled = false;
    getEntryScreenSettings()
      .then((loaded) => {
        if (!cancelled) setSettings(loaded);
      })
      .catch((error) => {
        console.warn("Unable to load entry-screen layout; using local entry photos.", error);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <motion.div
      initial={prefersReducedMotion ? false : { opacity: 0 }}
      animate={{ opacity: active ? 1 : 0 }}
      transition={{ duration: prefersReducedMotion ? 0 : 0.8 }}
      data-layout={settings.layout}
      className="entry-photo-grid pointer-events-none absolute inset-0 z-[1] h-full w-full"
    >
      <EntryGridTiles
        layout={settings.layout}
        imageLibrary={settings.imageLibrary}
        imageSlots={settings.imageSlots}
      />
    </motion.div>
  );
}
