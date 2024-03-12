import { Route, Routes } from "react-router-dom";
import { useContext } from "react";

import Header from "./components/Layout/Header";

import Footer from "./components/Layout/Footer";
import ErrorPage from "./pages/ErrorPage";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import HomePage from "./pages/Home";
import UserProfile from "./pages/UserProfile";
import AuthContext from "./components/Context/AuthContext";
import ResetPassword from "./pages/ResetPassword";

function App() {

  
  const authCtx=useContext(AuthContext);

  return (
    
    <div>
    <Header />
      <main>
        <Routes>
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/" element={ !authCtx.isLoggedIn && <Login />} />
          <Route path="/profile" element={authCtx.isLoggedIn && <UserProfile />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="*" element={<ErrorPage />} />
          <Route path="/resetPassword" element={<ResetPassword />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
