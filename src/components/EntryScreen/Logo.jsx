import React from "react";

const Logo = () => {
  return (
    <div className="entry-logo">
      <img
        src="/images/logo-mark.png"
        alt="The House of Maya"
        className="entry-logo__mark"
      />

      <div className="entry-logo__name">
        THE HOUSE
        <span>OF MAYA</span>
      </div>
    </div>
  );
};

export default Logo;