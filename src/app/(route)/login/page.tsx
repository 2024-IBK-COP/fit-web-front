"use client";

import Login from "../../_components/Login";
import React from "react";
import CustomButton from "../../_components/CustomButton";
import CustomInput from "@/app/_components/CustomInput";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";


export default function Home() {
  const { data: session } = useSession();

  console.log("Login HOME S");
  console.log(session);
  console.log("Login HOME E");

  const [isLogin, setIsLogin] = React.useState(false);

  const checkLoginStatus = () => {
    alert(isLogin);
  };
  const changeLoginStatus = () => {
    setIsLogin(!isLogin);
  };

  if (session) {
  } else {
    return(
    <div className="min-h-screen content-center">
      <Login setIsLogin={setIsLogin}></Login>
    </div>);
  }
}
