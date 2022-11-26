import Home from "./Views/Home.js";
import Profile from "./Views/Profile.js";

import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// import { AuthContextProvider } from "./context/AuthContext";
// import SignUp from "./views/SignUp.js";
// import LogIn from "./views/LogIn.js";

function App() {
  return (
    <>
      {/* <AuthContextProvider> */}
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          {/* <Route exact path="signup" element={<SignUp />} /> */}
          {/* <Route exact path="login" element={<LogIn />} /> */}
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
