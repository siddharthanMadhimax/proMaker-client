import React, { useEffect, useState } from "react";
import { Login, FormData, TemplateSelectPage, Template1 } from "./components";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { BarChartOutlined, MenuOutlined } from "@ant-design/icons";
import { Popover } from "antd";

const App = () => {
  const navigate=useNavigate()
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {

    const token = localStorage.getItem("token");
    if(token){
      const decodeToken=jwtDecode(token)
      const currentTime=Date.now()/1000
      if(decodeToken.exp<currentTime){
        localStorage.removeItem("token")
      }
    }
    else{
      setIsAuth(false)
      
    }
    setIsAuth(!!token)
  }, []);

 

  return (
    
   <>
 

    <div className="">
   
    <Routes>
  <Route
    path="/"
    element={isAuth ? <Navigate to="/form" /> : <Login isAuth={setIsAuth} checkAuth={isAuth} />}
  />
  <Route path="/form" element={<FormData setIsAuth={setIsAuth} />} />
  <Route path="/selectTemplate" element={<TemplateSelectPage />} />
  <Route path="/template1" element={<Template1 />} />
</Routes>

    </div>
   </>
  );
};

export default App;
