import React, { useEffect, useState } from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import { usePref } from "../../context/UserPrefProvider";

import "./CityDetails.scss";

import cityIllustration from "../../assets/svg/default.svg";
import HorizontalScroll from "../../components/Ui/HorizontalScroll/HorizontalScroll";
import dawnIcon from "../../assets/svg/dawn.svg";
import sunsetIcon from "../../assets/svg/sunset.svg";
import backBtnIcon from "../../assets/svg/back-btn.svg";
import { useDataFetch } from "../../utils/useDataFetch";
import { OneCallType } from "./apiResType";
import Icon from "../../components/Icon/Icon";

import Modal from "../../components/Ui/Modal/Modal";

interface MatchParams {
  city: string;
}

const CityDetails: React.FC<RouteComponentProps<MatchParams>> = ({
  history,
  location,
  match,
}) => {
  let cityName = match.params.city;
  let cityLocation = location.search;
  let url = `https://api.openweathermap.org/data/2.5/onecall${cityLocation}&exclude=minutely&units=metric&appid=${process.env.REACT_APP_OW_API_KEY}`;
  const date = new Date().toDateString().split(" ");
  const { data, error } = useDataFetch<OneCallType>(url);
  const [showModal, setShowModal] = useState(false);
  const { theme } = usePref();

  useEffect(() => {
    error && setShowModal(true);
  }, [error]);

  const getHour = (time: number): string => {
    let t = new Date(time * 1000).getHours();
    let hour: string;
    if (t >= 12) {
      if (t === 12) {
        hour = 12 + " PM";
      } else {
        hour = t - 12 + " PM";
      }
    } else {
      if (t === 0) {
        hour = 12 + " AM";
      } else {
        hour = t + " AM";
      }
    }
    return hour;
  };
  const getDay = (time: number): string => {
    let date = new Date(time * 1000).toDateString().split(" ");
    let day = date[0] + " " + date[2];
    return day;
  };

  return (
    <>
      <div className={`city-details-container ${theme === "dark" && "dark"}`}>
        <div className="back-btn-container">
          <Link to="/">
            <img src={backBtnIcon} alt="left arrow" width="100" height="128" />
          </Link>
        </div>
        <div className="city-details-card">
          <header className="date-container">
            <span className="day">{date[0]}</span>
            <span className="date">{+date[2] + " " + date[1]}</span>
          </header>
          <section className="forecast-content-container">
            <img className="city-illustration" src={cityIllustration} alt="" />

            {!data ? (
              <div className="loading"></div>
            ) : (
              <>
                {/* <div className="loading"></div> */}
                <div className={`forecast-content `}>
                  <h2 className="city-name">{cityName}</h2>
                  <div className="weather-condition">
                    <figure className="weather-condition__icon">
                      <Icon
                        status={data.current.weather[0].main}
                        icon={data.current.weather[0].icon.slice(-1)}
                      />
                    </figure>
                    <p className="weather-condition__degree">
                      {Math.round(data.current.temp)}°
                    </p>
                  </div>
                  <h3 className="weather-condition__state">
                    {data.current.weather[0].main}
                  </h3>
                  <div className="summary">
                    <p className="summary_Wind">
                      {" "}
                      <strong>Wind</strong>{" "}
                      {Math.round(data.current.wind_speed)} km/h
                    </p>
                    <p className="summary_visibility">
                      {" "}
                      <strong>Visibility</strong>{" "}
                      {data.current.visibility / 1000} km
                    </p>
                    <p className="summary_humidity">
                      {" "}
                      <strong>Humidity</strong> {data.current.humidity}%
                    </p>
                    <p className="summary_dew-point">
                      {" "}
                      <strong>Dew Point</strong>{" "}
                      {Math.round(data.current.dew_point)}°
                    </p>
                  </div>
                </div>
              </>
            )}
          </section>
          <section className="day-details">
            <h2 className="day-details__title">Day Details</h2>
            <div className="day-details__hourly-forecast">
              <h3>Hourly</h3>
              <HorizontalScroll>
                {data &&
                  data.hourly.slice(0, 23).map((elm) => (
                    <div className="item" key={elm.dt}>
                      <div className="weather-condition">
                        <figure
                          className="weather-condition__icon"
                          id="icon-cont"
                        >
                          <Icon
                            status={elm.weather[0].main}
                            icon={elm.weather[0].icon.slice(-1)}
                          />
                        </figure>
                        <div className="weather-condition__text">
                          <span className="weather-condition__text__temp">
                            {Math.ceil(elm.temp)}°
                          </span>
                          <span className="weather-condition__text__cond">
                            {elm.weather[0].main}
                          </span>
                        </div>
                        <div className="weather-condition__details">
                          <span>wind : {Math.round(elm.wind_speed)} km/h</span>
                        </div>
                        <h3>{getHour(elm.dt)}</h3>
                      </div>
                    </div>
                  ))}
              </HorizontalScroll>
            </div>
            <div className="day-details__expected">
              {data && (
                <>
                  <div className="day">
                    <h3>Day</h3>
                    <p>
                      Expected {data.current.weather[0].description} skies. The
                      high will be {Math.round(data?.daily[0].temp.max)}°
                    </p>
                  </div>
                  <div className="Night">
                    <h3>Night</h3>
                    <p>
                      The skies will be {data.current.weather[0].description}.
                      The low will be {Math.round(data?.daily[0].temp.night)}°
                    </p>
                  </div>
                </>
              )}
            </div>
            <div className="day-details__sun">
              <h3>Sunrise</h3>
              <div className="sun-container">
                <img src={dawnIcon} alt="" />
                {data && (
                  <span className="sun-time">
                    {new Date(data.current.sunrise * 1000).getHours()}:
                    {new Date(data.current.sunrise * 1000).getMinutes()} AM
                  </span>
                )}
              </div>
              <h3>Sunset</h3>
              <div className="sun-container">
                <img src={sunsetIcon} alt="" />
                {data && (
                  <span className="sun-time">
                    {new Date(data.current.sunset * 1000).getHours() - 12}:
                    {new Date(data.current.sunset * 1000).getMinutes()} PM
                  </span>
                )}
              </div>
            </div>
            <div>
              <h3>Expected next 7 days</h3>
              <HorizontalScroll>
                {data &&
                  data.daily.slice(1, 7).map((day) => (
                    <div className="item" key={day.dt}>
                      <div className="weather-condition">
                        <h3>{getDay(day.dt)}</h3>
                        <figure className="weather-condition__icon">
                          <Icon
                            status={day.weather[0].main}
                            icon={day.weather[0].icon.slice(-1)}
                          />
                        </figure>
                        <div className="weather-condition__text">
                          <div className="weather-condition__min-max-cont">
                            <span className="max__temp">
                              {Math.ceil(day.temp.day)}°
                            </span>
                            <span className="min__temp">
                              {Math.ceil(day.temp.min)}°
                            </span>
                          </div>
                          <span className="weather-condition__text__cond">
                            {day.weather[0].main}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
              </HorizontalScroll>
            </div>
          </section>
        </div>
      </div>
      {showModal && (
        <Modal isShown={showModal} showHandler={setShowModal}>
          <Modal.Header showHandler={setShowModal}>Error</Modal.Header>
          <Modal.Body>
            <h1>No Internet Connection</h1>
            <div style={{ width: "100%", textAlign: "center" }}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24"
                viewBox="0 0 24 24"
                width="24"
                style={{ width: "90%", height: "auto" }}
              >
                <path
                  d="M24 .01c0-.01 0-.01 0 0L0 0v24h24V.01zM0 0h24v24H0V0zm0 0h24v24H0V0z"
                  fill="none"
                />
                <path d="M22.99 9C19.15 5.16 13.8 3.76 8.84 4.78l2.52 2.52c3.47-.17 6.99 1.05 9.63 3.7l2-2zm-4 4c-1.29-1.29-2.84-2.13-4.49-2.56l3.53 3.53.96-.97zM2 3.05L5.07 6.1C3.6 6.82 2.22 7.78 1 9l1.99 2c1.24-1.24 2.67-2.16 4.2-2.77l2.24 2.24C7.81 10.89 6.27 11.73 5 13v.01L6.99 15c1.36-1.36 3.14-2.04 4.92-2.06L18.98 20l1.27-1.26L3.29 1.79 2 3.05zM9 17l3 3 3-3c-1.65-1.66-4.34-1.66-6 0z" />
              </svg>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <button className="close-btn" onClick={() => setShowModal(false)}>
              close
            </button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
};

export default CityDetails;
