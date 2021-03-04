import React, { useState } from "react";
import { usePref } from "../../context/UserPrefProvider";

import { getCurrentPosiion } from "../../utils/currentPosition";
import { fetchApi } from "../../utils/fetchApi";
import Message from "../Ui/Message/Message";
import { citiesInfo, suggestedCity } from "./interface";

import "./Search.scss";

type CityType = { title: string; position: { lng: number; lat: number } };

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestedCities, setSuggestedCities] = useState<suggestedCity[]>([]);
  const [error, setError] = useState("");

  const queryHandler: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setError("");
    setSearchQuery(e.target.value);
  };

  const searchHandler: React.MouseEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (searchQuery.trim().length === 0) {
      return;
    }
    const endPoint = `https://geocode.search.hereapi.com/v1/geocode?q=${searchQuery}&limit=4&apiKey=${process.env.REACT_APP_GEOCODE_API_KEY}&execlude=scoring`;
    fetchApi<citiesInfo[]>(endPoint).then((data) => {
      const results = data.map(({ address: { city }, position }) => {
        return { title: city, position };
      });
      setSuggestedCities(results);
    });
  };

  const currentPosHandler: React.MouseEventHandler<HTMLButtonElement> = async (
    e
  ) => {
    try {
      let position = await getCurrentPosiion();
      const endPoint = `https://revgeocode.search.hereapi.com/v1/revgeocode?at=${position.lat},${position.lng}&apiKey=${process.env.REACT_APP_GEOCODE_API_KEY}&execlude=scoring`;
      fetchApi<citiesInfo[]>(endPoint).then((data) => {
        const results = data.map(({ address: { city }, position }) => {
          return { title: city, position };
        });
        setSuggestedCities(results);
      });
    } catch (error) {
      setError(error.message);
    }
  };

  const { cities, setCities } = usePref();
  const existingCities: { [city: string]: boolean } = {};
  cities.forEach((city) => {
    existingCities[city.title] = true;
  });
  const AddCityHandler = (city: CityType) => {
    setCities(city);
  };

  return (
    <div className="search-container">
      <div className="search">
        <button
          className="current-location-btn"
          aria-label="use current location"
          onClick={currentPosHandler}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="black"
            width="18px"
            height="18px"
          >
            <path d="M0 0h24v24H0V0z" fill="none" />
            <path d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm8.94 3c-.46-4.17-3.77-7.48-7.94-7.94V1h-2v2.06C6.83 3.52 3.52 6.83 3.06 11H1v2h2.06c.46 4.17 3.77 7.48 7.94 7.94V23h2v-2.06c4.17-.46 7.48-3.77 7.94-7.94H23v-2h-2.06zM12 19c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z" />
          </svg>
        </button>
        <form className="search-form" onSubmit={searchHandler}>
          <input
            className="search-input"
            type="search"
            aria-label="search for a city"
            placeholder="search for a city"
            onChange={queryHandler}
          />
          <button className="search-btn">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24"
              viewBox="0 0 24 24"
              width="24"
            >
              <path d="M0 0h24v24H0z" fill="none" />
              <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
            </svg>
          </button>
        </form>
      </div>
      <ul
        className={`suggestion-result ${
          suggestedCities.length > 0 && "active"
        }`}
      >
        {suggestedCities.length > 0 &&
          suggestedCities.map((city, index) => (
            <li key={index}>
              <span className="city-name">{city.title}</span>
              {!existingCities[city.title] ? (
                <button
                  className="add-city-btn"
                  onClick={() => AddCityHandler(city)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24"
                    viewBox="0 0 24 24"
                    width="24"
                  >
                    <path d="M0 0h24v24H0z" fill="none" />
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z" />
                  </svg>
                </button>
              ) : (
                <svg
                  className="check-circle"
                  xmlns="http://www.w3.org/2000/svg"
                  height="24"
                  viewBox="0 0 24 24"
                  width="24"
                >
                  <path d="M0 0h24v24H0z" fill="none" />
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                </svg>
              )}
            </li>
          ))}
      </ul>
      {error && <Message setError={setError}>{error}</Message>}
    </div>
  );
};

export default Search;
