"use client";

import Login from "../../_components/Login";
import React from "react";
import CustomButton from "../../_components/CustomButton";
import CustomInput from "@/app/_components/CustomInput";
import Loading from "@/app/_components/Loading";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Home() {
  //const { data: session } = useSession();
  const router = useRouter();
  const { status, data: session } = useSession();

  console.log("SESSION S");
  console.log(session);
  console.log("SESSION E");

  if (status === "loading") {
    return (
      <Loading></Loading>
    );
  }

  if (session) {
    console.log("SESSION ALIVE");
    router.push("/");
  } else {
    return (
      <div className="min-h-screen content-center">
        <Login></Login>
      </div>
    );
  }
}
