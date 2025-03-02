import React, { useEffect, useState } from "react";
import { Login, FormData, TemplateSelectPage, Template1 } from "./components";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const App = () => {
  const navigate = useNavigate();
  const [isAuth, setIsAuth] = useState(!!localStorage.getItem("token")); // Derive auth state from localStorage
  const username = localStorage.getItem("name");

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const decodedToken = jwtDecode(token);
          const currentTime = Date.now() / 1000;

          if (decodedToken.exp < currentTime) {
            localStorage.removeItem("token");
            localStorage.removeItem("name");
            setIsAuth(false);
            navigate("/");
          } else {
            setIsAuth(true);
          }
        } catch (error) {
          console.error("Invalid Token:", error);
          localStorage.removeItem("token");
          localStorage.removeItem("name");
          setIsAuth(false);
          navigate("/");
        }
      } else {
        setIsAuth(false);
      }
    };

    checkAuth();
  }, [navigate]);

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={isAuth ? <Navigate to="/form" /> : <Login isAuth={setIsAuth} />}
        />
        <Route path="/form" element={isAuth ? <FormData setIsAuth={setIsAuth} /> : <Navigate to="/" />} />
        <Route path="/:username/selectTemplate" element={isAuth ? <TemplateSelectPage /> : <Navigate to="/" />} />
        <Route path="/:username/template1" element={isAuth ? <Template1 /> : <Navigate to="/" />} />
      </Routes>
    </>
  );
};

export default App;
