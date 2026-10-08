import React from "react";

const Logo = () => {
  return (
    <div className="flex flex-col items-center text-olive">
      <img
        src="/images/logo-green.png"
        alt="The House of Maya"
        className=" h-auto w-20 object-contain sm:w-24 lg:w-28 2xl:w-[125px]"
      />

      <img
        src="/images/name.png"
        alt="The House of Maya"
        className="h-auto w-[175px] object-contain sm:w-[240px] lg:w-[340px] xl:w-[390px] 2xl:w-[460px]"
      />
    </div>
  );
};

export default Logo;