import React, { useState } from "react";
import { Link } from "react-router-dom";
import Message from "../../components/Ui/Message/Message";
import { usePref } from "../../context/UserPrefProvider";
import {
  auth,
  createUserProfileDocument,
  signInWithGoogle,
} from "../../firebase";

import "./Form.scss";

const Signup: React.FC = () => {
  const { theme } = usePref();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleGoogleSign = async () => {
    try {
      const { user } = await signInWithGoogle();
      user && createUserProfileDocument(user, { cities: [] });
    } catch (error) {
      setError(error.message);
      console.log("sign in failed", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      user && createUserProfileDocument(user, { cities: [] });
    } catch (error) {
      setError(error.message);
      console.log("Failed to signup", error.message);
    }
    setEmail("");
    setPassword("");
  };

  return (
    <>
      <div className="main-container">
        <div className={`form-card ${theme === "dark" ? "dark-theme" : ""}`}>
          <section className="form-content-container">
            <div className="form-container">
              <h2 className="form-title">SignUp</h2>
              <form onSubmit={handleSubmit} className="form">
                <input
                  className="form__input"
                  type="text"
                  name="email"
                  placeholder="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  className="form__input"
                  type="password"
                  name="pasword"
                  placeholder="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <input
                  className="form__input form__button"
                  type="submit"
                  value="SignUp"
                />
              </form>
              <div className="form-footer">
                <p className="link-container">
                  Already have an account ?{" "}
                  <Link className="link" to="/login">
                    Login
                  </Link>
                </p>
                <div className="separator">
                  <strong>OR</strong>
                </div>
                <div className="gSignInWrapper">
                  <span className="label">Sign in with:</span>
                  <div className="customBtn" onClick={handleGoogleSign}>
                    <span className="customBtn__icon"></span>
                    <span className="customBtn__text">Google</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <figure className="form-image"></figure>
        </div>
      </div>
      {error && <Message setError={setError}>{error}</Message>}
    </>
  );
};

export default Signup;