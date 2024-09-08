"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { redirect } from 'next/navigation'

const Login = () => {
  // const { data: session } = useSession();

  const { data: session } = useSession();
  const test = useSession();
  

  if (session) {
    return (
      <>
        Signed in as {session.user!.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  } else {
    redirect('/login');

    return {
      Redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
};

export default Login;
