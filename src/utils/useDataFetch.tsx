import { useEffect, useReducer } from "react";

type ActionType<T> =
  | { type: "INIT" }
  | { type: "SUCCESS"; payload: T }
  | { type: "FAIL"; payload: boolean };

interface StateType<T> {
  loading: boolean;
  error: boolean;
  data?: T;
}

function fetchDataReducer<T>(
  state: StateType<T>,
  action: ActionType<T>
): StateType<T> {
  switch (action.type) {
    case "INIT":
      return { ...state, loading: true };
    case "SUCCESS":
      return { ...state, loading: false, data: action.payload };
    case "FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

export const useDataFetch = function <T>(url: string) {
  const initialState = {
    loading: false,
    error: false,
    data: undefined,
  };
  const [state, dispatch] = useReducer<
    React.Reducer<StateType<T>, ActionType<T>>
  >(fetchDataReducer, initialState);

  useEffect(() => {
    const fetchData = async (url: string) => {
      dispatch({ type: "INIT" });
      try {
        let response = await fetch(url);
        let data = await response.json();
        dispatch({ type: "SUCCESS", payload: data });
      } catch (error) {
        dispatch({ type: "FAIL", payload: true });
        console.error("er", error.message);
      }
    };
    fetchData(url);
  }, [url]);

  return state;
};
