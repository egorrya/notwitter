import react, { useState, useEffect } from "react";
import AppRouter from "./Router";
import { authService } from "../firebase";

function App() {
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);

  // waititng for firebase to login
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setUserObj(user);
      }
      setInit(true);
    });
  }, []);

  return (
    <>
      {init ? (
        <AppRouter isLoggedIn={Boolean(userObj)} userObj={userObj} />
      ) : (
        "Initializing"
      )}
      <footer>&copy; {new Date().getFullYear()} Notwitter</footer>
    </>
  );
}

export default App;
