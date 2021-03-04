import { useState } from "react";

export const useLocalStorage = function <T>(key: string, initialValue: T) {
  const [dataLS, setData] = useState<T>(() => {
    try {
      const strData = window.localStorage.getItem(key);
      return strData ? JSON.parse(strData) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });
  const setDataLS = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(dataLS) : value;
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
      setData(valueToStore);
    } catch (error) {
      console.error(error);
    }
  };
  return { dataLS, setDataLS };
};
