import { useEffect, useState } from "react";
import { auth } from "../firebase";

const useFirebaseAuth = () => {
  const [userEmail, setUserEmail] = useState("");
  useEffect(() => {
    let unsubsribeFromOauth = auth.onAuthStateChanged((user) => {
      if (user) {
        user.email && setUserEmail(user.email);
      } else {
        setUserEmail("");
      }
    });
    return unsubsribeFromOauth();
  });
  return userEmail;
};

export default useFirebaseAuth;
