"use client";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

const Home = () => {
  const { data: session } = useSession();

  console.log("HOME");
  console.log(session);
  console.log("HOME");

  if (session) {
    <div className="dark:invert">LOGIN O</div>;
  } else {
    <div className="dark:invert">
      <h1 className="dark:invert">LOGIN X</h1>
    </div>;
    redirect('/login');
  }
};

export default Home;
