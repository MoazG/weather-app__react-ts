import { useEffect, useRef, useState } from "react";

import sunIcon from "../../../assets/svg/ernes-Sun-Sole.svg";
import moonIcon from "../../../assets/svg/crescent-moon.svg";

import "./Toggle.scss";

type ThemeType = "dark" | "light";
type Props = {
  theme: ThemeType;
  setTheme: (name: ThemeType) => void;
};
const Toggle = ({ theme, setTheme }: Props) => {
  const [isFocus, setIsFocus] = useState<boolean>(false);
  useEffect(() => {
    if (isFocus) {
      focusRef.current?.classList.add("focus");
    }
  });
  const focusRef = useRef<HTMLLabelElement>(null);
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };
  const handleFocus = () => {
    focusRef.current?.classList.add("focus");
    setIsFocus(true);
  };
  const handleBlur = () => {
    focusRef.current?.classList.remove("focus");
    setIsFocus(false);
  };
  return (
    <div className="theme-toggle-container">
      <label
        ref={focusRef}
        className={`toggle-button ${theme === "dark" ? "dark" : ""}`}
      >
        <input
          type="checkbox"
          className="toggle-button__input"
          aria-label="Switch between light and dark mode"
          checked={theme === "dark"}
          onChange={toggleTheme}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        <div className="toggle-button__track">
          <div className="toggle-button__track-moon">
            <img src={moonIcon} alt="moon icon" width="17" height="17" />
          </div>
          <div className="toggle-button__track-sun">
            <img src={sunIcon} alt="sun icon" width="17" height="17" />
          </div>
        </div>
        <div className="toggle-button__thumb"></div>
      </label>
    </div>
  );
};

export default Toggle;
