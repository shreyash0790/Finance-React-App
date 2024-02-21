import { Route, Routes } from "react-router-dom";

import Header from "./components/Layout/Header";

import Footer from "./components/Layout/Footer";
import ErrorPage from "./pages/ErrorPage";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";

function App() {
  return (
    
    <div>
    <Header />
      <main>
        <Routes>
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/" element={<Login />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
