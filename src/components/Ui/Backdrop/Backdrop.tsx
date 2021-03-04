import React from "react";

import "./Backdrop.scss";

type Props = {
  show: boolean;
  showHandler: (show: boolean) => void;
};
const Backdrop = ({ show, showHandler }: Props) => {
  return show ? (
    <div className="backdrop" onClick={() => showHandler(false)}></div>
  ) : null;
};

export default Backdrop;
