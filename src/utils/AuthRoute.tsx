import { Redirect, Route } from "react-router-dom";
import { usePref } from "../context/UserPrefProvider";

const AuthRoute = ({ component: Component, ...rest }: any) => {
  const { userDetails } = usePref();

  return (
    <Route
      {...rest}
      render={(props) =>
        !!userDetails ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

export default AuthRoute;
