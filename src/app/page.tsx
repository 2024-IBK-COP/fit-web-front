"use client";
import { useSession } from "next-auth/react";
import { redirect } from 'next/navigation'

const Home = () => {
  const { data: session } = useSession();
  
  console.log("HOME");
  console.log(session);
  console.log("HOME");

  if (session) {
    <div>
      YAHO
    </div>
  }else{

    // redirect('/login');
  }
  
}

export default Home;
