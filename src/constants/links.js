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
  house: "/",
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
  // heroImage: "https://images-pw.pixieset.com/elementfield/3xAGnMA/SS_Sneakpeek-3-31441c26-1500.jpg",
  // heroImage: "https://images-pw.pixieset.com/elementfield/3xAGnMA/SS_Sneakpeek-334-76eb11e2-1500.jpg",
  heroImage: "https://images-pw.pixieset.com/elementfield/3xAGnMA/SS_Sneakpeek-43-20242a90-1500.jpg",
  // heroImage: "https://images-pw.pixieset.com/elementfield/3xAGnMA/SS_Sneakpeek-23-4ec530b1-1500.jpg",
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
export const contact = {
  email: "hello@thehouseofmaya.com",
  phone: "+91 98765 43210",
  instagram: social.instagram,
  instagramHandle: "@thehouseofmaya",
  location: "Hyderabad, India",
};

export const testimonials = [
  {
    name: "Anvitha & Thrinesh",
    text: "I first came across Mayas Pixels on Instagram through a friend’s suggestion and chose them for my engagement. The photos were amazing, which led me to book them for all my wedding ceremonies as well. Sandeep and his team beautifully captured every precious moment in a fresh and intimate storytelling style.My family and I will cherish these memories for a lifetime. Thank you, Mayas Pixels, for the beautiful work – your passion truly reflects in the final output. Wishing the team all the best!",
    url: "https://images-pw.pixieset.com/elementfield/Ww11ymb/AT-26-7fc146ed-2500.jpg",
  },
  {
    name: "Divya & Narasimha",
    text: "I couldn't be happier choosing Mayas pixels! From start to finish, they made the entire process seamless and enjoyable. They took the time to understand my vision and the style I wanted, which truly showed in the final photos. They were not only professional but also warm and easy to work with. Each one captures the emotion and beauty of the day perfectly. Every special moment, from the quiet glances to the big celebrations, was captured with such care & artistry ♥️", 
    url:"https://images-pw.pixieset.com/elementfield/OWQQdjw/DN_Engagement-201-974421fb-2500.JPG",
  },
  {
    name: "Teja & Harika",
    text:"We are extremely happy with the work from Mayas Pixels. Sandeep and his team are talented photographers who beautifully captured the important moments and emotions throughout our wedding ceremonies. We especially loved the candid shots that truly reflect the joy of the day.Their professionalism and communication were excellent, and the team was always punctual. We are grateful to have chosen Mayas Pixels to capture our special moments and would highly recommend them for wedding photography.",
    url:"https://images-pw.pixieset.com/elementfield/VM99vlm/TH-withlogo-8-5c5e938a-2500.jpg",
  }
]

export const artist = {
  name: "Sandeep",
  bio: "Sandeep is a passionate photographer and storyteller, dedicated to capturing the essence of every moment. With a keen eye for detail and a love for creativity, he brings stories to life through his lens.",
  image: "https://images-pw.pixieset.com/elementfield/bOGl9zb/Sandeep-998b8475-2500.jpg",
  signature: "/images/signature.png",
}