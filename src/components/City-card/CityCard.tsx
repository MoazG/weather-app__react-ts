import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { CityDetailsType, CurrentWeather } from "../../screens/Home/type";
import { useDataFetch } from "../../utils/useDataFetch";

import "./CityCard.scss";
import Icon from "../Icon/Icon";

type Props = {
  showErrorModal: (t: boolean) => void;
  city: { title: string; position: { lng: number; lat: number } };
};

const CityCard = ({ city, showErrorModal }: Props) => {
  const [cityDetails, setCityDetails] = useState<CityDetailsType>(null!);

  const endPoint = `https://api.openweathermap.org/data/2.5/weather?lat=${city.position.lat}&lon=${city.position.lng}&units=metric&appid=${process.env.REACT_APP_OW_API_KEY}`;
  const { data, error } = useDataFetch<CurrentWeather>(endPoint);

  useEffect(() => {
    error && showErrorModal(true);
  }, [error, showErrorModal]);

  useEffect(() => {
    const setDetails = function ({ main, weather }: CurrentWeather): void {
      setCityDetails({
        currentTemp: Math.floor(main.temp),
        minTemp: Math.floor(main.temp_min),
        maxTemp: Math.ceil(main.temp_max),
        status: weather[0].main,
        icon: weather[0].icon.slice(-1),
      });
    };
    data && setDetails(data);
  }, [data]);

  return (
    <>
      {!cityDetails ? (
        <div className="loading"></div>
      ) : (
        <>
          {/* <div className="loading"></div> */}
          <div className="city-card">
            <Link
              to={`/details/${city.title}?lat=${city.position.lat}&lon=${city.position.lng}`}
              className="weather-condition"
            >
              <div className="weather-condition__city-name">
                <h2>{city.title}</h2>
              </div>
              <figure className="weather-condition__icon">
                {cityDetails && (
                  <Icon status={cityDetails.status} icon={cityDetails.icon} />
                )}
              </figure>
              {cityDetails && (
                <>
                  <div className="weather-condition__text">
                    <span className="weather-condition__text__temp">
                      {cityDetails.currentTemp}°
                    </span>
                    <span className="weather-condition__text__cond">
                      {cityDetails.status}
                    </span>
                  </div>
                  <div className="weather-condition__min-max">
                    <div className="min-container">
                      <svg
                        className="min-arrow__icon"
                        viewBox="188.5 812 21 21"
                      >
                        <path
                          fill="#00ff9b"
                          d="M209.5 817.5h-21L199 828z"
                          data-name="Min Arrow"
                        />
                      </svg>
                      <span>{cityDetails.minTemp}°</span>
                      <span>Min</span>
                    </div>
                    <div className="max-container">
                      <svg
                        className="max-arrow__icon"
                        viewBox="449.5 815 21 21"
                      >
                        <path
                          fill="red"
                          d="M449.5 830.5h21L460 820z"
                          data-name="Max Arrow"
                        />
                      </svg>
                      <span>{cityDetails.maxTemp}°</span>
                      <span>Max</span>
                    </div>
                  </div>
                </>
              )}
            </Link>
          </div>
        </>
      )}
    </>
    // <div className="city-card">
    //   {!cityDetails ? (
    //     <div className="loading"></div>
    //   ) : (
    //     <Link
    //       to={`/details/${city.title}?lat=${city.position.lat}&lon=${city.position.lng}`}
    //       className="weather-condition"
    //     >
    //       <h2>{city.title}</h2>
    //       <figure className="weather-condition__icon">
    //         {cityDetails && (
    //           <Icon status={cityDetails.status} icon={cityDetails.icon} />
    //         )}
    //       </figure>
    //       {cityDetails && (
    //         <>
    //           <div className="weather-condition__text">
    //             <span className="weather-condition__text__temp">
    //               {cityDetails.currentTemp}
    //             </span>
    //             <span className="weather-condition__text__cond">
    //               {cityDetails.status}
    //             </span>
    //           </div>
    //           <div className="weather-condition__min-max">
    //             <div className="min-container">
    //               <svg className="min-arrow__icon" viewBox="188.5 812 21 21">
    //                 <path
    //                   fill="#00ff9b"
    //                   d="M209.5 817.5h-21L199 828z"
    //                   data-name="Min Arrow"
    //                 />
    //               </svg>
    //               <span>{cityDetails.minTemp}</span>
    //               <span>Min</span>
    //             </div>
    //             <div className="max-container">
    //               <svg className="max-arrow__icon" viewBox="449.5 815 21 21">
    //                 <path
    //                   fill="red"
    //                   d="M449.5 830.5h21L460 820z"
    //                   data-name="Max Arrow"
    //                 />
    //               </svg>
    //               <span>{cityDetails.maxTemp}</span>
    //               <span>Max</span>
    //             </div>
    //           </div>
    //         </>
    //       )}
    //     </Link>
    //   )}
    // </div>
  );
};

export default CityCard;
