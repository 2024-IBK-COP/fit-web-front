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
      <div className="fixed bottom-10 left-1/3 z-50 grid grid-cols-2 gap-4 place-content-center h-fit w-1/3">
        <div className="flex place-content-center">
          <CustomButton
            func={checkLoginStatus}
            nameVal="checkLoginStatus"
          ></CustomButton>
        </div>
        <div className="flex place-content-center">
          <CustomButton
            func={changeLoginStatus}
            nameVal="changeLoginStatus"
          ></CustomButton>
        </div>
      </div>

      {isLogin ? (
        <div className="dark:invert mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          
          <CustomInput
            nameVal="Secret Key"
            idVal="email"
            typeVal="email"
            labelVal=""
            setFunc={()=>{}}
          ></CustomInput>
        </div>
      ) : (
        <div className="min-h-screen content-center">
          <Login setIsLogin={setIsLogin}></Login>
        </div>
      )}
    </>
  );
}
