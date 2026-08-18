import React, { useEffect, useState } from "react";
import PhotoGrid from "./PhotoGrid";
import Logo from "./Logo";
import EnterButton from "./EnterButton";
import "./EntryScreen.css";

const EntryScreen = ({ onEnter }) => {
  const [loaded, setLoaded] = useState(false);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setLoaded(true);
    }, 100);

    return () => window.clearTimeout(timer);
  }, []);

  const handleEnter = () => {
    setExiting(true);

    window.setTimeout(() => {
      if (typeof onEnter === "function") {
        onEnter();
      }
    }, 800); // matches .entry-screen--exiting transition duration
  };

  return (
    <main
      className={`entry-screen ${loaded ? "entry-screen--loaded" : ""} ${
        exiting ? "entry-screen--exiting" : ""
      }`}
    >
      <PhotoGrid />

      <div className="entry-screen__overlay" />

      <section className="entry-screen__content">
        <Logo />

        <div className="entry-screen__divider" />

        <p className="entry-screen__eyebrow">
          STORYTELLING THROUGH
          <br />
          TIMELESS IMAGERY
        </p>

        <EnterButton onEnter={handleEnter} />

        <p className="entry-screen__subtext">
          WEDDING PHOTOGRAPHY &amp; FILMS
        </p>
      </section>

      <div className="entry-screen__footer">
        <span>THE HOUSE OF MAYA</span>
        <span>INDIA · WORLDWIDE</span>
      </div>
    </main>
  );
};

export default EntryScreen;