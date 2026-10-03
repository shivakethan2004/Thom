import { ENTRY_PHOTOS } from "../constants/entryPhotos";
import { supabase } from "./supabase";

export const ENTRY_LAYOUTS = {
  classic: {
    label: "Symmetric Grid (Classic)",
    slots: [
      { desktop: ["1 / 4", "1 / 5"], mobile: ["1 / 3", "1 / 3"] },
      { desktop: ["1 / 4", "5 / 9"], mobile: ["3 / 5", "1 / 3"] },
      { desktop: ["10 / 13", "1 / 5"], mobile: ["1 / 3", "11 / 13"] },
      { desktop: ["10 / 13", "5 / 9"], mobile: ["3 / 5", "11 / 13"] },
    ],
  },
  masonry: {
    label: "Masonry / Film Strip",
    slots: [
      { desktop: ["1 / 4", "1 / 9"], mobile: ["1 / 3", "1 / 3"] },
      { desktop: ["10 / 13", "1 / 3"], mobile: ["3 / 5", "1 / 3"] },
      { desktop: ["10 / 13", "3 / 5"], mobile: ["1 / 3", "3 / 5"] },
      { desktop: ["10 / 13", "5 / 7"], mobile: ["3 / 5", "3 / 5"] },
      { desktop: ["10 / 13", "7 / 9"], mobile: ["1 / 3", "11 / 13"] },
    ],
  },
  sidePanels: {
    label: "Full Bleed Side Panels",
    slots: [
      { desktop: ["1 / 4", "1 / 9"], mobile: ["1 / 5", "1 / 3"] },
      { desktop: ["10 / 13", "1 / 9"], mobile: ["1 / 5", "11 / 13"] },
    ],
  },
  editorial: {
    label: "Collage Grid (Editorial)",
    slots: [
      { desktop: ["1 / 4", "1 / 3"], mobile: ["1 / 3", "1 / 3"] },
      { desktop: ["1 / 4", "3 / 6"], mobile: ["3 / 5", "1 / 3"] },
      { desktop: ["1 / 4", "6 / 9"], mobile: ["1 / 3", "3 / 5"] },
      { desktop: ["10 / 13", "1 / 3"], mobile: ["3 / 5", "3 / 5"] },
      { desktop: ["10 / 13", "3 / 6"], mobile: ["1 / 3", "11 / 13"] },
      { desktop: ["10 / 13", "6 / 9"], mobile: ["3 / 5", "11 / 13"] },
    ],
  },
};

export const DEFAULT_ENTRY_SCREEN = {
  layout: "classic",
  imageLibrary: ENTRY_PHOTOS.map((photo) => photo.src),
  imageSlots: [0, 1, 4, 6],
};

export async function getEntryScreenSettings() {
  const { data, error } = await supabase
    .from("entry_screen_settings")
    .select("layout, image_library, image_slots")
    .eq("id", true)
    .maybeSingle();

  if (error) throw error;
  if (!data) return DEFAULT_ENTRY_SCREEN;

  const layout = ENTRY_LAYOUTS[data.layout] ? data.layout : DEFAULT_ENTRY_SCREEN.layout;
  const imageLibrary = Array.isArray(data.image_library)
    ? data.image_library
    : DEFAULT_ENTRY_SCREEN.imageLibrary;
  const imageSlots = Array.isArray(data.image_slots)
    ? data.image_slots
    : DEFAULT_ENTRY_SCREEN.imageSlots;

  return { layout, imageLibrary, imageSlots };
}

export async function saveEntryScreenSettings(settings) {
  const { error } = await supabase.from("entry_screen_settings").upsert(
    {
      id: true,
      layout: settings.layout,
      image_library: settings.imageLibrary,
      image_slots: settings.imageSlots,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "id" }
  );
  if (error) throw error;
}
