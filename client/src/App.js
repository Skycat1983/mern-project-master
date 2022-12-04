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

// import { AuthContextProvider } from "./context/AuthContext";

//! locations stuff https://stackoverflow.com/questions/20089582/how-to-get-a-url-parameter-in-express
// array https://mongoosejs.com/docs/api.html#schemaarray_SchemaArray-set
function App() {
  return (
    <>
      {/* <AuthContextProvider> */}
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="signup" element={<Signup />} />
          <Route exact path="myaccount" element={<MyAccount />} />
          <Route exact path="login" element={<Login />} />
          <Route exact path="profile/:id" element={<Profile />} />
          <Route exact path="addplant" element={<AddPlant />} />

          <Route path="/redirect" element={<Navigate to="/" />} />
          {/* <ProtectedRoute></ProtectedRoute> */}
          {/* <Route path="*" element={<GoHome />} /> */}
        </Routes>
      </Router>
      {/* </AuthContextProvider> */}
    </>
  );
}

export default App;
