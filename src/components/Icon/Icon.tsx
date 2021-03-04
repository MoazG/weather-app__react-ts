import React from "react";

import sunIcon from "../../assets/svg/weather-icons/sun.svg";
import moonIcon from "../../assets/svg/weather-icons/moon.svg";
import cloudyIcon from "../../assets/svg/weather-icons/cloudy.svg";
import cloudyIconN from "../../assets/svg/weather-icons/cloud-night.svg";
import rainIcon from "../../assets/svg/weather-icons/rain.svg";
import windIcon from "../../assets/svg/weather-icons/wind.svg";
import mistIcon from "../../assets/svg/weather-icons/mist.svg";
import thunderStormIcon from "../../assets/svg/weather-icons/thunderstorm.svg";

type IconType = {
  [k: string]: {
    [k: string]: string;
  };
};
const Icons: IconType = {
  Rain: { d: rainIcon, n: rainIcon },
  Drizzle: { d: rainIcon, n: rainIcon },
  Clear: { d: sunIcon, n: moonIcon },
  Thunderstorm: { d: thunderStormIcon, n: thunderStormIcon },
  Clouds: { d: cloudyIcon, n: cloudyIconN },
  Wind: { d: windIcon, n: windIcon },
  Mist: { d: mistIcon, n: mistIcon },
  Haze: { d: mistIcon, n: mistIcon },
  Fog: { d: mistIcon, n: mistIcon },
};

type Props = {
  status: string;
  icon: string;
};
const Icon: React.FC<Props> = ({ status, icon }) => {
  return (
    <img src={Icons[status][icon]} alt={status} width="200" height="200" />
    // <>
    //   {loaded ? null : (
    //     <SkeltonAnimate width="250px" height="250px" borderRadius="50%" />
    //   )}
    //   <img
    //     src={Icons[status][icon]}
    //     alt={status}
    //     onLoad={() => setLoaded(true)}
    //   />
    // </>
  );
};

export default Icon;
