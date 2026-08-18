import React from "react";

const Logo = () => {
  return (
    <div className="flex flex-col items-center text-olive">
      <img
        src="/images/logo-mark.png"
        alt="The House of Maya"
        className="mb-5 h-auto w-16 object-contain sm:w-20 lg:w-24 2xl:w-[100px]"
      />

      <div
        className="
          flex flex-col items-center whitespace-nowrap uppercase
          font-display font-light leading-[0.95] tracking-[0.14em]
          text-[21px] sm:text-[28px] lg:text-[40px] xl:text-[46px] 2xl:text-[55px]
        "
      >
        THE HOUSE
        <span className="mt-2">OF MAYA</span>
      </div>
    </div>
  );
};

export default Logo;