import { useEffect, useState } from "react";
import Hero from "../components/HomePage/Hero";
import Philosophy from "../components/HomePage/Philosophy";
import ImageSlideshow from "../components/HomePage/ImageSlideshow";
import StoriesAndFilms from "../components/HomePage/StoriesAndFilms";
import Contact from "../components/HomePage/Contact";
import InstagramFeed from "../components/HomePage/InstagramFeed";
import { getHomeContent } from "../config/homeContent";

export default function Home() {
  const [content, setContent] = useState(null);

  useEffect(() => {
    let cancelled = false;
    getHomeContent().then((homeContent) => {
      if (!cancelled) setContent(homeContent);
    });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <>
      <Hero heroImage={content?.heroImage} />
      <Philosophy content={content?.philosophy} />
      <ImageSlideshow images={content?.slideshowImages} />
      <StoriesAndFilms
        storyItems={content?.stories}
        filmItems={content?.films}
        storiesHeading={content?.storiesHeading}
        filmsHeading={content?.filmsHeading}
      />
      <InstagramFeed
        postItems={content?.posts}
        instagramHandle={content?.contact?.instagramHandle}
        heading={content?.instagramHeading}
      />
      <Contact contactInfo={content?.contact} />
    </>
  );
}