import Home from "./Views/Home.js";
import Profile from "./Views/Profile.js";
import Signup from "./Views/Signup";
import MyAccount from "./Views/MyAccount";
import Login from "./Views/Login";
import AddPlant from "./Views/AddPlant";
import "./App.css";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import { AuthContextProvider } from "./Contexts/AuthContext.js";
import { LangContextProvider } from "./Contexts/LangContext.js";

import getToken from "./utils/getToken.js";
import ProtectedRoute from "./Components/ProtectedRoute.js";
import Listing from "./Views/Listing.js";
import { useState } from "react";
import Game from "./Views/Game.js";
// import Calc from "./Views/Calc.tsx";

function App() {
  const [language, setLanguage] = useState("english");
  function toggleLanguage() {
    setLanguage((language) => (language === "english" ? "german" : "english"));
  }
  return (
    <>
      <LangContextProvider value={{ language, toggleLanguage }}>
        <AuthContextProvider>
          <Router>
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="signup" element={<Signup />} />
              <Route exact path="login" element={<Login />} />
              <Route exact path="game" element={<Game />} />
              {/* <Route exact path="calc" element={<Calc />} /> */}

              <Route exact path="profile/:id" element={<Profile />} />
              <Route exact path="plant/:id" element={<Listing />} />
              {/* <Route exact path="addplant" element={<AddPlant />} /> */}
              <Route path="/redirect" element={<Navigate to="/" />} />
              {/* <ProtectedRoute></ProtectedRoute> */}
              {/* <Route path="*" element={<GoHome />} /> */}
              <Route
                path="myaccount"
                element={
                  <ProtectedRoute>
                    <MyAccount />
                  </ProtectedRoute>
                }
              />

              <Route
                path="addplant"
                element={
                  <ProtectedRoute>
                    <AddPlant />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </Router>
        </AuthContextProvider>
      </LangContextProvider>
    </>
  );
}

export default App;

// protected route and isLoading config
// path routing
// media queries or useWindowSize?
// side scroll issue from profile page
// profile pic changes size when hamburger clicked
