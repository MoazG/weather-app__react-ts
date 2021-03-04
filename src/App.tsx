import React, { Suspense, lazy } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";

import AuthRoute from "./utils/AuthRoute";
import { usePref } from "./context/UserPrefProvider";
import "./App.scss";
import Layout from "./components/Layout/Layout";
import Login from "./screens/SignUp/Login";
import Signup from "./screens/SignUp/Signup";
import Home from "./screens/Home/Home";
// import CityDetails from "./screens/CityDetails/CityDetails";
// import EditCities from "./screens/EditCities/EditCities";
const CityDetails = lazy(() => import("./screens/CityDetails/CityDetails"));
const EditCities = lazy(() => import("./screens/EditCities/EditCities"));

function App() {
  const { userDetails } = usePref();

  return (
    <Router>
      <div className="App">
        <Layout>
          <Suspense fallback>
            <Switch>
              <Route path="/signup">
                {!userDetails ? <Signup /> : <Redirect to="/" />}
              </Route>
              <Route path="/login">
                {!userDetails ? <Login /> : <Redirect to="/" />}
              </Route>
              <AuthRoute path="/edit" component={EditCities} />
              <AuthRoute path="/details/:city" component={CityDetails} />
              <AuthRoute path="/" component={Home} />
            </Switch>
          </Suspense>
        </Layout>
      </div>
    </Router>
  );
}

export default App;
