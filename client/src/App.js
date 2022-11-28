import Home from "./Views/Home.js";
import Profile from "./Views/Profile.js";
import Signup from "./Views/Signup";
import Login from "./Views/Login";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// import { AuthContextProvider } from "./context/AuthContext";

function App() {
  return (
    <>
      {/* <AuthContextProvider> */}
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="signup" element={<Signup />} />
          <Route exact path="login" element={<Login />} />
          <Route exact path="profile/:id" element={<Profile />} />
          {/* <ProtectedRoute></ProtectedRoute> */}
          {/* <Route path="*" element={<GoHome />} /> */}
        </Routes>
      </Router>
      {/* </AuthContextProvider> */}
    </>
  );
}

export default App;
