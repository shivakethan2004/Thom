/**
 * links.js
 * -----------------------------------------------------------------------
 * Every href/route in the site lives here. If a nav item moves, a page
 * gets renamed, or a CTA needs to point somewhere new — this is the only
 * file that should need to change.
 * -----------------------------------------------------------------------
 */

export const routes = {
  home: "/",
  house: "/the-house",
  stories: "/stories",
  films: "/films",
  artist: "/the-artist",
  testimonials: "/testimonials",
  contact: "/contact",
};

// Top nav, in display order. `label` is what's shown — edit copy in
// text.js instead if you just want to rename a link's label; this array
// only controls order + which route it points to.
export const navLinks = [
  { key: "house", href: routes.house },
  { key: "stories", href: routes.stories },
  { key: "films", href: routes.films },
  { key: "artist", href: routes.artist },
  { key: "testimonials", href: routes.testimonials },
];

// export const cta = {
//   primary: routes.contact, // "Begin your Story" buttons point here
// };

export const social = {
  instagram: "https://instagram.com/thehouseofmaya",
  youtube: "https://youtube.com/@thehouseofmaya",
  pinterest: "https://pinterest.com/thehouseofmaya",
};

// Swap this for your real hosted asset once it's in /public/images.
export const media = {
  heroImage: "https://images-pw.pixieset.com/elementfield/7A1WrA/AT-9-8027cb02-1000.jpg",
};
// constants/links.js — add
export const slideshowImages = [
  {
    src: "https://images-pw.pixieset.com/elementfield/7A1WrA/Mp-Website-2-891040ac-1000.JPG",
    caption: "A celebration worth remembering"
  },
  {
    src: "https://images-pw.pixieset.com/elementfield/7A1WrA/AT-9-8027cb02-1000.jpg",
    caption: "A smile only they could share"
  },
  {
    src: "https://images-pw.pixieset.com/elementfield/7A1WrA/DC_Coupleshoot-89-83b09299-1000.jpg",
    caption: "Somewhere between laughter and love"
  },
  {
    src: "https://images-pw.pixieset.com/elementfield/7A1WrA/CS_CSPostwithoutlogo-1-c26db77c-1000.jpg",
    caption: "The little moments say it all"
  },
  {
    src: "https://images-pw.pixieset.com/elementfield/7A1WrA/page04-4ffdfaf4-1000.JPG",
    caption: "Held close, just as it should be"
  },
  {
    src: "https://images-pw.pixieset.com/elementfield/7A1WrA/page0-e6520b6b-1000.JPG",
    caption: "A quiet moment before forever"
  },
  {
    src: "https://images-pw.pixieset.com/elementfield/7A1WrA/page00-a5398a98-1000.JPG",
    caption: "Running freely into the moment"
  },
  {
    src: "https://images-pw.pixieset.com/elementfield/7A1WrA/VV_Sneakpeek-14-b6e7b383-1000.jpg",
    caption: "Love, caught in the golden hour"
  }
];

export const stories = [
  {
    title: "Deepshika + Chandrakiran",
    date: "MAY 18, 2024",
    image: "https://images-pw.pixieset.com/elementfield/DGXQGYo/DN_Post-19-251e99db-1500.jpg",
    objectPosition: "56% 35%",
    href: "/stories/1",
  },
  {
    title: "Ujjvala + Amit",
    date: "MAY 20, 2024",
    image: "https://images-pw.pixieset.com/elementfield/EjW6be6/DC_Sneakpeek-205-af4cdd95-1500.jpg",
    objectPosition: "52% 34%",
    href: "/stories/2",
  },
  {
    title: "Vamsi + Vaishnavi",
    date: "APR 24, 2024",
    image: "https://images-pw.pixieset.com/elementfield/ZR6JZx8/UA_Sneakpeek-57-3a2b0f0e-1500.jpg",
    objectPosition: "44% 32%",
    href: "/stories/3",
  },
  {
    title: "Divya + Narasimha",
    date: "APR 19, 2024",
    image: "https://images-pw.pixieset.com/elementfield/3KY9oQb/VV_Sneakpeek-14-fe52fa47-1500.jpg",
    objectPosition: "62% 52%",
    href: "/stories/4",
  },
];

export const films = [
  {
    title: "Rohan & Priya",
    category: "WEDDING FILM",
    vimeoId: "883291742",
    vimeoHash: "4a51d2187f",
    href: "/films/1",
  },
  {
    title: "Aarav & Meera",
    category: "ENGAGEMENT FILM",
    vimeoId: "849752204",
    vimeoHash: "572eee96a2",
    href: "/films/2",
  },
  {
    title: "Kabir & Ananya",
    category: "WEDDING FILM",
    vimeoId: "1163900692",
    vimeoHash: "ab744e7720",
    href: "/films/3",
  },

];

export const cta = {
  primary: "/contact",
  stories: "/stories",
  films: "/films",
};