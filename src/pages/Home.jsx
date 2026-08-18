import Hero from "../components/HomePage/Hero";
import Philosophy from "../components/HomePage/Philosophy";
import ImageSlideshow from "../components/HomePage/ImageSlideshow";
import StoriesAndFilms from "../components/HomePage/StoriesAndFilms";
export default function Home() {
  return (
    <>
      <Hero />
      <Philosophy />
      <ImageSlideshow />
      <StoriesAndFilms />
    </>
  );
}