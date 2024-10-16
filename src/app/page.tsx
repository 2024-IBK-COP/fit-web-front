"use client";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import { redirect } from "next/navigation";
import CustomButton from "./_components/CustomButton";

const Home = () => {
  const { status, data: session } = useSession();

  const signOutFunc = async () => {
    const res = await signOut({ callbackUrl: "/" });
  };

  console.log("HOME");
  console.log(session);
  console.log("HOME");

  if (status === "loading") {
    return (
      <div className="flex min-h-screen flex-col items-center justify-between p-24">
        loading
      </div>
    );
  }

  if (session) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-between p-24">
        yaho
        <CustomButton func={signOutFunc} nameVal="SIGN OUT"></CustomButton>
      </div>
    );
  } else {
    return (
      <div className="flex min-h-screen flex-col items-center justify-between p-24">
        noho
      </div>
    );
    // redirect('/login');
  }
};

export default Home;
