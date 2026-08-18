import { useEffect, useRef, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import Layout from "./components/Layout/Layout";
import PageTransition from "./components/PageTransition/PageTransition";
import BloomOverlay from "./components/PageTransition/BloomOverlay";
import GrainOverlay from "./components/PageTransition/GrainOverlay";
import EntryScreen from "./components/EntryScreen/EntryScreen";

import { motion as motionConfig } from "./config/motion";

import Home from "./pages/Home";
import Catalog from "./pages/Catalog";
import About from "./pages/About";
import Contact from "./pages/Contact";

export default function App() {
  const location = useLocation();

  /*
   * ------------------------------------------------------------
   * ENTRY STATE
   * ------------------------------------------------------------
   *
   * The website is not allowed to enter its normal application
   * state until the user clicks "ENTER THE HOUSE".
   */
  const [hasEntered, setHasEntered] = useState(false);

  /*
   * ------------------------------------------------------------
   * ROUTE TRANSITION
   * ------------------------------------------------------------
   */

  const [transitioning, setTransitioning] = useState(false);
  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }

    setTransitioning(true);

    const settle = setTimeout(() => {
      setTransitioning(false);
    }, motionConfig.settleDelay);

    return () => clearTimeout(settle);
  }, [location.pathname]);

  /*
   * ------------------------------------------------------------
   * ENTER HOUSE
   * ------------------------------------------------------------
   *
   * EntryScreen handles its own slide-up exit animation and
   * calls this once it's finished (see EntryScreen.jsx).
   */
  const handleEnterHouse = () => {
    setHasEntered(true);
  };

  /*
   * ------------------------------------------------------------
   * ENTRY SCREEN
   * ------------------------------------------------------------
   */

  if (!hasEntered) {
    return <EntryScreen onEnter={handleEnterHouse} />;
  }

  /*
   * ------------------------------------------------------------
   * NORMAL WEBSITE
   * ------------------------------------------------------------
   */

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <BloomOverlay active={transitioning} />
      <GrainOverlay active={transitioning} />

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route element={<Layout />}>
            <Route
              path="/"
              element={
                <PageTransition>
                  <Home />
                </PageTransition>
              }
            />

            <Route
              path="/catalog"
              element={
                <PageTransition>
                  <Catalog />
                </PageTransition>
              }
            />

            <Route
              path="/about"
              element={
                <PageTransition>
                  <About />
                </PageTransition>
              }
            />

            <Route
              path="/contact"
              element={
                <PageTransition>
                  <Contact />
                </PageTransition>
              }
            />
          </Route>
        </Routes>
      </AnimatePresence>
    </motion.div>
  );
}