import React from "react";
import { usePref } from "../../context/UserPrefProvider";

import Hamburger from "../Ui/Hamburger/Hamburger";
import Toggle from "../Ui/Toggle/Toggle";

import "./Nav.scss";

type Props = {
  show: boolean;
  showHandler: (show: boolean) => void;
};
const Nav: React.FC<Props> = ({ showHandler, show }) => {
  const { theme, setTheme } = usePref();
  return (
    <nav className="nav-bar__container">
      <Hamburger show={show} showHandler={showHandler} />
      <Toggle theme={theme} setTheme={setTheme} />
    </nav>
  );
};

export default Nav;
