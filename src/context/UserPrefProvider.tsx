import React, { useState, useEffect, useContext } from "react";
import { auth, firestore } from "../firebase";

import { useLocalStorage } from "../utils/useLocalStorage";

type ThemeType = "light" | "dark";
type CityType = { title: string; position: { lng: number; lat: number } };
type UserPrefType = {
  userDetails: UserDetails;
  theme: ThemeType;
  setTheme: (name: ThemeType) => void;
  cities: CityType[];
  setCities: (city: CityType) => void;
  removeCity: (city: string) => void;
  changeCitiesOrder: (value: CityType[]) => void;
};

type UserSnapshot = {
  email: string;
  displayName: string;
  photoURL: string;
  cities: CityType[];
};

type UserPrefLS = {
  theme: ThemeType;
  cities: CityType[];
};

const themeColor = {
  light: {
    textColor: "#3f3f3f",
    mainBgc1: "#5ee7df",
    mainBgc2: "#66a6ff",
    navBgc: "#F6F6F6",
    cardBgc1: "#fff",
    cardBgc2: "#fff",
  },
  dark: {
    textColor: "#eee",
    mainBgc1: "#3a2871",
    mainBgc2: "#5e3dc2",
    navBgc: "#2b244d",
    cardBgc1: "#372865",
    cardBgc2: "#1a1330",
  },
};

const UserPrefContext = React.createContext<UserPrefType>(undefined!);

type UserDetails = {
  uid: string;
  email: string;
  photoURL: string | null;
  cities: CityType[];
} | null;

type Props = {
  children: React.ReactElement;
};

const UserPrefProvider = ({ children }: Props) => {
  const [themeName, setThemeName] = useState<ThemeType>("light");
  const [citiesArr, setCitiesArr] = useState<CityType[]>([]);
  const [userDetails, setUserDetails] = useState<UserDetails>(null);

  const { dataLS, setDataLS } = useLocalStorage<UserPrefLS>("UserPref", {
    theme: themeName,
    cities: userDetails ? userDetails.cities : [],
  });

  useEffect(() => {
    let unsubsribeFromAuth = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const userRef = await firestore.collection("users").doc(user.uid);
        userRef.onSnapshot((snapshot) => {
          const snapshotData = snapshot.data() as UserSnapshot;
          !!snapshotData
            ? setUserDetails({
                uid: snapshot.id,
                ...snapshotData,
              })
            : setUserDetails(null);
        });
      } else {
        setUserDetails(null);
      }
    });
    return () => unsubsribeFromAuth();
  }, []);

  useEffect(() => {
    const setThemeColor = (theme: ThemeType) => {
      document.body.style.cssText = `
      --text-color: ${themeColor[theme].textColor};
      --main-bg-c1: ${themeColor[theme].mainBgc1};
      --main-bg-c2: ${themeColor[theme].mainBgc2};
      --nav-bg-c : ${themeColor[theme].navBgc};
      --card-bg-c1 : ${themeColor[theme].cardBgc1};
      --card-bg-c2 : ${themeColor[theme].cardBgc2};
      `;
    };
    setThemeName(dataLS.theme);
    // setCitiesArr(dataLS.cities);
    setCitiesArr(userDetails ? userDetails.cities : []);
    setThemeColor(themeName);
  }, [dataLS, themeName, userDetails]);

  const setTheme = (name: ThemeType) => {
    setThemeName(name);
    setDataLS((prev) => ({ ...prev, theme: name }));
  };

  const setCities = async (city: CityType) => {
    try {
      setCitiesArr([city, ...citiesArr]);
      setDataLS((prev) => ({ ...prev, cities: [city, ...citiesArr] }));
      let userDocRef = await firestore
        .collection("users")
        .doc(userDetails?.uid);
      await userDocRef.update({ cities: [city, ...citiesArr] });
    } catch (error) {
      console.log("failed to add city", error.mesage);
    }
  };

  const removeCity = async (cityName: string) => {
    const newCities = citiesArr.filter((city) => city.title !== cityName);
    try {
      setCitiesArr(newCities);
      setDataLS((prev) => ({ ...prev, cities: newCities }));
      let userDocRef = await firestore
        .collection("users")
        .doc(userDetails?.uid);
      await userDocRef.update({ cities: newCities });
    } catch (error) {
      console.log("failed to add city", error.mesage);
    }
  };
  const changeCitiesOrder = async (newOrder: CityType[]) => {
    try {
      setCitiesArr(newOrder);
      setDataLS((prev) => ({ ...prev, cities: newOrder }));
      let userDocRef = await firestore
        .collection("users")
        .doc(userDetails?.uid);
      await userDocRef.update({ cities: newOrder });
    } catch (error) {
      console.log("failed to add city", error.mesage);
    }
  };
  return (
    <UserPrefContext.Provider
      value={{
        userDetails,
        theme: themeName,
        setTheme,
        cities: citiesArr,
        setCities,
        removeCity,
        changeCitiesOrder,
      }}
    >
      {children}
    </UserPrefContext.Provider>
  );
};

export const usePref = () => useContext(UserPrefContext);

export default UserPrefProvider;
