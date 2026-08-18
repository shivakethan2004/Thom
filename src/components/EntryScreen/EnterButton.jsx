import React from "react";

const EnterButton = ({ onEnter }) => {
  return (
    <button
      type="button"
      className="enter-button"
      onClick={onEnter}
      aria-label="Enter The House of Maya"
    >
      <span>ENTER THE HOUSE</span>

      <span className="enter-button__arrow" aria-hidden="true">
        →
      </span>
    </button>
  );
};

export default EnterButton;