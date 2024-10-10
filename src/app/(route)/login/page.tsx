"use client";

import Login from "../../_components/Login";
import React from "react";
import CustomButton from "../../_components/CustomButton";
import CustomInput from "@/app/_components/CustomInput";

export default function Home() {
  const [isLogin, setIsLogin] = React.useState(false);

  const checkLoginStatus = () => {
    alert(isLogin);
  };
  const changeLoginStatus = () => {
    setIsLogin(!isLogin);
  };

  return (
    <>      
    {isLogin ? ("YAHO"):("NOYAHO")}
    
      {isLogin ? (
        <div className="dark:invert mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          YAHO
        </div>
      ) : (
        <div className="min-h-screen content-center">
          <Login setIsLogin={setIsLogin}></Login>
        </div>
      )}
    </>
  );
}
