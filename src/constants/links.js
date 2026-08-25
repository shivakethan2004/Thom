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
  instagram: "https://instagram.com/thehouseofmaya.in",
  Vimeo: "https://vimeo.com/user91716331",

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
  contact: "/contact",
  stories: "/stories",
  films: "/films",
};
export const contact = {
  email: "mayaspixels@gmail.com",
  phone: "+91 7207575063",
  phoneDisplay: "Sandeep : +91 7207575063",
  instagram: social.instagram,
  instagramHandle: "@thehouseofmaya.in",
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

export const posts = [
  {
    image: "https://scontent-sea5-1.cdninstagram.com/v/t51.82787-15/769777515_18427666474182668_8112181352834421217_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=107&ccb=7-5&_nc_sid=18de74&efg=eyJlZmdfdGFnIjoiQ0xJUFMuYmVzdF9pbWFnZV91cmxnZW4uQzMifQ%3D%3D&_nc_ohc=RAeFnxd-qvsQ7kNvwFF5uK1&_nc_oc=AdqYMheEeMwCBNOYhiyKNcW6VtTogBJUhbIqowA7qAG2RUIgebX6Vvyng2_lCw7uraw&_nc_zt=23&_nc_ht=scontent-sea5-1.cdninstagram.com&edm=ANo9K5cEAAAA&_nc_gid=UBsEmC0sp9RmqnU_Ly6eOw&_nc_tpa=Q5bMBQJuz_S4O6dFujeaHp5O2w5cF6mq2nxvfgOI15G1H7PLdMQy_unVi9lbmQGm9kbhakNF05w_2IaC&oh=00_AQEuxDCx_RETTUhsSG9NXerSj0EJpfT1InHJqi0G1YU18w&oe=6A92724A",
    href: "https://www.instagram.com/p/DGs3MBhTpAG/?img_index=4",
  },
  {
    image: "https://scontent-sea1-1.cdninstagram.com/v/t51.82787-15/760707892_18426334477182668_3480091300816295899_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=104&ccb=7-5&_nc_sid=18de74&efg=eyJlZmdfdGFnIjoiQ0xJUFMuYmVzdF9pbWFnZV91cmxnZW4uQzMifQ%3D%3D&_nc_ohc=cb_6P6hpfHsQ7kNvwF46SoL&_nc_oc=AdpOVoGDki_O2FHTGt42r_jMR9ZylzIZKgIrqVcjd82t2Vfp7Aa8HTfnlujupf_sA3w&_nc_zt=23&_nc_ht=scontent-sea1-1.cdninstagram.com&edm=ANo9K5cEAAAA&_nc_gid=UBsEmC0sp9RmqnU_Ly6eOw&_nc_tpa=Q5bMBQLvN5_le1TnWcfdGk0yjn1WAXLnhf5NZ9-VAxjc3zWVU4NvdORZff3EtFKTeHhFuphwhNHLVkTu&oh=00_AQE74VlKjJSM2O-zRTf0Me7K0dUykO1xEsF4kWk3xvQrag&oe=6A925D14",
    href: "https://www.instagram.com/p/DR601X3E4bl/?img_index=6",
  },
  {
    image: "https://scontent-sea5-1.cdninstagram.com/v/t51.82787-15/742362234_18424344331182668_4006128240883395091_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=110&ccb=7-5&_nc_sid=18de74&efg=eyJlZmdfdGFnIjoiQ0FST1VTRUxfSVRFTS5iZXN0X2ltYWdlX3VybGdlbi5DMyJ9&_nc_ohc=yg-WiGbpD_kQ7kNvwHdpxnI&_nc_oc=Adra0nX3ZGpayHqjQkpH79hPdVDwG0Din7IrGeQ3tUSxLU85rnSRUkos39oRVpxXHcY&_nc_zt=23&_nc_ht=scontent-sea5-1.cdninstagram.com&edm=ANo9K5cEAAAA&_nc_gid=UBsEmC0sp9RmqnU_Ly6eOw&_nc_tpa=Q5bMBQJzehHnNursqZV_fjQkHEEn0To-DDsnlfRXRgRDRSjTvnXhEp01VsU8v3FEYK6ZzleLPnLcKDzf&oh=00_AQF8SRIuvo5Q4v8uXyW3KDQOiv-Y4-5sHUJHBgRoPBqa9g&oe=6A924059",
    href: "https://www.instagram.com/thehouseofmaya.in/p/Da9xm0sEctM/",
  },
  {
    image: "https://scontent-sea5-1.cdninstagram.com/v/t51.82787-15/727046017_18419608858182668_3803656922354077913_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=108&ccb=7-5&_nc_sid=18de74&efg=eyJlZmdfdGFnIjoiQ0FST1VTRUxfSVRFTS5iZXN0X2ltYWdlX3VybGdlbi5DMyJ9&_nc_ohc=WYnVLUdTpYAQ7kNvwHnwHN3&_nc_oc=AdoOZicDYNM1geG-VLQoca2MtyzhSvrT6pX8ihsaPMioeh_SSK5y1iQfwg8oYlMiRE0&_nc_zt=23&_nc_ht=scontent-sea5-1.cdninstagram.com&edm=ANo9K5cEAAAA&_nc_gid=UBsEmC0sp9RmqnU_Ly6eOw&_nc_tpa=Q5bMBQKWt3gz5lR3gNWk_xvV-jAJifEvuGLd7AHsj4iy6-yy1qjL1v6ib9QVVszQH14tmBZxCMvmbOBL&oh=00_AQGlMf-cjyAgxUPEYPmDvNYysuluHW-ubh9iDBl1abbqAQ&oe=6A923ECC",
    href: "https://www.instagram.com/p/DZyyMFTEWnc/?img_index=1",
  },
  {
    image: "https://scontent-sea5-1.cdninstagram.com/v/t51.82787-15/636714188_18400161484182668_4881028507631957672_n.webp?stp=dst-jpg_e35_tt6&_nc_cat=108&ccb=7-5&_nc_sid=18de74&efg=eyJlZmdfdGFnIjoiQ0FST1VTRUxfSVRFTS5iZXN0X2ltYWdlX3VybGdlbi5DMyJ9&_nc_ohc=zrTlZfpVa0kQ7kNvwFD2vjw&_nc_oc=AdoZJx4SOG4vtHU51Wu-L5nLbJirRnDF99ySzh8DdIP1PhJQkSRov_mw9lQ9Y4IYlvE&_nc_zt=23&_nc_ht=scontent-sea5-1.cdninstagram.com&edm=ANo9K5cEAAAA&_nc_gid=UBsEmC0sp9RmqnU_Ly6eOw&_nc_tpa=Q5bMBQLYqT0_zSZroxqEhsvv_voD8Gr-gdRZ6d1o_kAybdW5MPshmchigdYK8Z1RZTdcsFD1byUqcRXi&oh=00_AQFMLv12PUtcgvD0MW-rL1CSuS-Sgr6apRPMDmjpDm60FA&oe=6A9248BC",
    href: "https://www.instagram.com/p/DUvC1VpkdEk/?img_index=1",
  },
];