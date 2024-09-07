'use client';

import Image from "next/image";
import React from 'react';
import CustomInput from "./CustomInput";
import CustomButton from "./CustomButton";
import axios from "axios";

interface Props {
    setIsLogin : (val : boolean) => void
}

export default function Login(props : Props) {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    const data ={
        email : email, 
        password : password
    }

    const loginFunc = () => {
        
        alert(email + " & " + password);
        
        console.log(data);

        // axios.post("endpoint",data).then((res)=>{
        //     alert(res);
        // });

        if(email == "test" && password == "test"){
            props.setIsLogin(true);
        }else{
            props.setIsLogin(false);
        }

    }

    return (
        <div className="dark:invert flex min-h-48 flex-col justify-center px-6 py-12 lg:px-8 bg-white">
            <div className="dark:invert sm:mx-auto sm:w-full sm:max-w-sm">
                <Image width={100} height={300} className="mx-auto h-50 w-auto" src="/img/IBK_CI_LOGO.png" alt="Your Company" />
                <h2 className="type-iword dark:invert mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900"></h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <div className="space-y-6">

                    <CustomInput nameVal="Email Address" idVal="email" typeVal="email" setFunc={setEmail}></CustomInput>

                    <CustomInput nameVal="Password" idVal="password" typeVal="password" setFunc={setPassword}></CustomInput>
                    
                    
                    <CustomButton func={loginFunc} nameVal="Login"></CustomButton>

                    
                </div>

                <p className="mt-10 text-center text-sm text-gray-500">
                    Not a member?
                    <a href="#" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"> Let's Start</a>
                </p>
            </div>
        </div>
    );
}
