import React from "react";
import { motion } from "framer-motion";

const EnterButton = ({ onEnter }) => {
  return (
    <motion.button
      type="button"
      onClick={onEnter}
      aria-label="Enter The House of Maya"
      initial="rest"
      whileHover="hover"
      whileTap={{ y: 0 }}
      animate="rest"
      variants={{
        rest: { backgroundColor: "rgba(253,252,243,0.75)", color: "#596341", y: 0 },
        hover: { backgroundColor: "#596341", color: "#FDFCF3", y: -3 },
      }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="
        relative mt-8 flex min-h-[54px] w-full max-w-[285px] items-center
        justify-center gap-[17px] border border-olive/70 bg-cream/75 px-5
        font-body text-[8px] uppercase tracking-[0.19em] text-olive
        backdrop-blur-[5px] focus-visible:outline focus-visible:outline-2
        focus-visible:outline-offset-[5px] focus-visible:outline-olive
        sm:mt-10 sm:min-h-[60px] sm:max-w-[320px] sm:gap-[22px] sm:px-6
        sm:text-[9px] sm:tracking-[0.22em]
        lg:mt-11 lg:min-h-[68px] lg:max-w-[360px] lg:gap-[30px]
        lg:text-[11px] lg:tracking-[0.28em]
      "
    >
      <span>ENTER THE HOUSE</span>

      <motion.span
        aria-hidden="true"
        variants={{ rest: { x: 0 }, hover: { x: 7 } }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="font-sans text-[15px] font-light leading-none sm:text-[17px] lg:text-[19px]"
      >
        →
      </motion.span>
    </motion.button>
  );
};

export default EnterButton;