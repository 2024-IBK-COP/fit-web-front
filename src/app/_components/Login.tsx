"use client";

import Image from "next/image";
import React from "react";
import CustomInput from "./CustomInput";
import CustomButton from "./CustomButton";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

// import axios from "axios";

interface Props {
  setIsLogin: (val: boolean) => void;
}

export default function Login(props: Props) {
  const [isSend, setIsSend] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("1111");
  const [code, setCode] = React.useState("123456");
  const [inputCode, setInputCode] = React.useState("");
  const [time, setTime] = React.useState(10); // 남은 시간 (단위: 초)
  const intervalRef = React.useRef<NodeJS.Timeout | undefined>(undefined);
  const [isTimerStart, setIsTimerStart] = React.useState(false);
  
  const router = useRouter();

  React.useEffect(()=>{
    if(time<=0){
      timerReset();
    }
  }, [time])

  const timer = {
    timerStart : isTimerStart,
    time : time
  }

  const data = {
    email: email,
    password: password,
  };  


  const timerStart = () => {
    setIsTimerStart(true);
    intervalRef.current = setInterval(() => {
      setTime((prevTime) => prevTime - 1);

      if(time <= 0){
        alert("RING DING DONG");
      }

    }, 1000);
  }

  const timerReset = () => {
    setIsTimerStart(false);
    clearInterval(intervalRef.current);
    setTime(300);
    setIsSend(false);
  }

  const sendCode = async () => {
    alert(email + " & " + password);

    setIsSend(!isSend);
    if(timer.timerStart){
      timerReset()
    }else{
      timerStart();
    }
    

    console.log(data);

    // axios.post("endpoint",data).then((res)=>{
    //     alert(res);
    // });

    // if (email == "test" && password == "test") {
    // props.setIsLogin(true);
    // } else {
    // props.setIsLogin(false);
    // }

    // const result = await signIn("credentials", {
    // email,
    // password,
    // 필요한 경우 다른 필드도 추가할 수 있습니다.
    // });

    // 로그인이 성공하면 다음 페이지로 이동할 수 있습니다.
    // if (result!.error) {
    // 로그인 실패 시 오류 메시지를 처리할 수 있습니다.
    // console.error(result!.error);
    // }
  };

  const enterCode = async () => {
    alert(code + "&" + inputCode);  

    if(code == inputCode){
      // success
      console.log("success");
      props.setIsLogin(true);
      
      // username: { label: 'Username', type: 'text', placeholder: 'wookyungLee' },
      // password: { label: 'Password', type: 'password' },

      console.log("START SIGN IN");

      const res = await signIn("credentials", {
        username: email,
        password: code,
        redirect: true, // true 일경우 로그인 성공하면 에러를 보여줄 수 없다.
        // redirect: false, // true 일경우 로그인 성공하면 에러를 보여줄 수 없다.
        // callbackUrl: "/", // true 일경우 동작 에러일때 에러페이지 동작
      });

      console.log("res");
      console.log(res);
      console.log("res");

      if(res?.error){
        alert("login Error");
      }

      // router.replace("/");
      
    }else{
      // fail
      alert("FAIL");
    }
    
  };
  
  

  return (
    <div className="dark:invert flex min-h-48 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="dark:invert sm:mx-auto sm:w-full sm:max-w-sm">
        <Image
          width={100}
          height={300}
          className="mx-auto h-50 w-auto"
          src="/img/IBK_CI_LOGO.png"
          alt="Your Company"
        />
        <h2 className="type-iword dark:invert mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900"></h2>
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
