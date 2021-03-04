import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";

import "./App.scss";
import CityDetails from "./screens/CityDetails/CityDetails";
import Layout from "./components/Layout/Layout";
import Home from "./screens/Home/Home";
import Login from "./screens/SignUp/Login";
import Signup from "./screens/SignUp/Signup";
import EditCities from "./screens/EditCities/EditCities";

import AuthRoute from "./utils/AuthRoute";
import { usePref } from "./context/UserPrefProvider";

function App() {
  const { userDetails } = usePref();

  return (
    <Router>
      <div className="App">
        <Layout>
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
        </Layout>
      </div>
    </Router>
  );
}

export default App;
