'use client';

import Login from "./_components/Login";
import React from 'react';
import CustomButton from "./_components/CustomButton";

export default function Home() {

  const [isLogin, setIsLogin] = React.useState(false);

  const checkLoginStatus = () =>{
    alert(isLogin);
  }
  const changeLoginStatus = () =>{
    setIsLogin(!isLogin);
  }

  return (
    <>
    
    <div className="mt-10 mb-10 sm:mx-auto sm:w-full sm:max-w-sm space-y-5">
      <CustomButton func={checkLoginStatus} nameVal="checkLoginStatus"></CustomButton>
      <CustomButton func={changeLoginStatus} nameVal="changeLoginStatus"></CustomButton>
    </div>

    <Login setIsLogin={setIsLogin}></Login>
    </>
  );
}
