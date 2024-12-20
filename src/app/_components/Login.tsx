"use client";

import Image from "next/image";
import { useSession } from "next-auth/react";
import React from "react";
import CustomInput from "./CustomInput";
import CustomButton from "./CustomButton";
import MainLogo from "./MainLogo";
import { signIn, SignInResponse } from "next-auth/react";
import { useRouter } from "next/navigation";

import axios from "axios";

interface Props {}

export default function Login(props: Props) {
  const [isSend, setIsSend] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("123456");
  //const [code, setCode] = React.useState("123456");
  const [inputCode, setInputCode] = React.useState("");
  const [time, setTime] = React.useState(300); // 남은 시간 (단위: 초)
  const intervalRef = React.useRef<NodeJS.Timeout | undefined>(undefined);
  const [isTimerStart, setIsTimerStart] = React.useState(false);

  const router = useRouter();

  React.useEffect(() => {
    if (time <= 0) {
      timerReset();
    }
  }, [time]);

  const timer = {
    timerStart: isTimerStart,
    time: time,
  };

  const data = {
    email: email,
    password: password,
  };

  const timerStart = () => {
    setIsTimerStart(true);
    intervalRef.current = setInterval(() => {
      setTime((prevTime) => prevTime - 1);

      if (time <= 0) {
        alert("RING DING DONG");
      }
    }, 1000);
  };

  const timerReset = () => {
    setIsTimerStart(false);
    clearInterval(intervalRef.current);
    setTime(300);
    setIsSend(false);
  };

  const sendCode = async () => {
    if (email.length != 0 && email.includes('@')) {
      // var data = {"email":email, "password":password}
      const data = JSON.stringify({ email, password });
      console.log(data);

      axios.post("/api/v1/members", data).then((res) => {
        axios.post("/api/v1/login", data).then((res) => {
          console.log(res);
        });
      });

      setIsSend(!isSend);
      if (timer.timerStart) {
        timerReset();
      } else {
        timerStart();
      }

      console.log(data);
    } else {
      alert("Plz Check Email.");
    }
  };

  const enterCode = async () => {
    const authCode = inputCode;
    const data = { email, authCode };

    const res: SignInResponse | undefined = await signIn("credentials", {
      email: email,
      authCode: inputCode,
      // redirect: true, // true 일경우 로그인 성공하면 에러를 보여줄 수 없다.
      redirect: false, // true 일경우 로그인 성공하면 에러를 보여줄 수 없다.
      // callbackUrl: "/", // true 일경우 동작 에러일때 에러페이지 동작
    });

    if (res?.ok) {
      router.push("/");
    } else {
      alert("PLZ CHECK CODE");
    }
  };

  return (
    <div className="dark:invert flex min-h-48 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="dark:invert">
        <MainLogo></MainLogo>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="space-y-6">
          {isSend ? (
            <>
              <p className="content-center dark:invert">
                We Sent 6 Digit Codes to your email. ({time} s)
              </p>
              <CustomInput
                nameVal="6-Digit Code"
                idVal="code"
                typeVal="text"
                labelVal="6 Digit Codes"
                setFunc={setInputCode}
              ></CustomInput>
            </>
          ) : (
            <CustomInput
              nameVal="Email Address"
              idVal="email"
              typeVal="email"
              setFunc={setEmail}
              labelVal="E-Mail Address"
            ></CustomInput>
          )}
          {isSend ? (
            <CustomButton func={enterCode} nameVal="ENTER CODE"></CustomButton>
          ) : (
            <CustomButton func={sendCode} nameVal="SEND CODE"></CustomButton>
          )}
        </div>
      </div>
    </div>
  );
}
