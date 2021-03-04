import React from "react";

import "./Hamburger.scss";
type Props = {
  show: boolean;
  showHandler: (show: boolean) => void;
};
const Hamburger: React.FC<Props> = ({ show, showHandler }) => {
  return (
    <button
      aria-label="side drawer toggle"
      className={`hamburger-button ${show ? "rotate" : ""}`}
      onClick={() => showHandler(!show)}
    >
      <div></div>
      <div></div>
      <div></div>
    </button>
  );
};

export default Hamburger;
