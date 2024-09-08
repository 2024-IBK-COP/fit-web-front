"use client";

import Login from "./_components/Login";
import React from "react";
import CustomButton from "./_components/CustomButton";

export default function Home() {
  const [isLogin, setIsLogin] = React.useState(false);

  const checkLoginStatus = () => {
    alert(isLogin);
  };
  const changeLoginStatus = () => {
    setIsLogin(!isLogin);
  };

  return (
    <>
      <div className="fixed bottom-10 left-1/3 z-50 grid grid-cols-2 gap-4 place-content-center h-fit w-1/3">
        <div className="flex place-content-center">
          <CustomButton
            func={checkLoginStatus}
            nameVal="checkLoginStatus"
          ></CustomButton>
        </div>
        <div className="flex place-content-center">
          <CustomButton
            func={changeLoginStatus}
            nameVal="changeLoginStatus"
          ></CustomButton>
        </div>
      </div>

      {isLogin ? (
        <div className="dark:invert flex flex-col space-y-10 mt-10">
          <div className="dark:invert flex flex-col space-y-10 mt-10">
            <div className="mx-32 flex flex-row gap-4 justify-center">
              <div className="bg-gray-800 flex justify-center basis-1/3 hover:basis-1/2">1</div><div className="bg-gray-800 flex justify-center basis-1/3 hover:basis-1/2">date</div><div className="bg-gray-800 flex justify-center basis-1/3 hover:basis-1/2">name</div>
            </div>
          </div>
          <div className="flex justify-center dark:invert">
            <table className="table-fixed border-separate border-spacing-2 border border-slate-500">
              <thead>
                <tr>
                  <th className="border border-slate-600">#</th>
                  <th className="border border-slate-600">Date</th>
                  <th className="border border-slate-600">Buyer</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-slate-600">1</td>
                  <td className="border border-slate-600">20220101</td>
                  <td className="border border-slate-600">HONG</td>
                </tr>
                <tr>
                  <td className="border border-slate-600">2</td>
                  <td className="border border-slate-600">20220101</td>
                  <td className="border border-slate-600">LEE</td>
                </tr>
                <tr>
                  <td className="border border-slate-600">3</td>
                  <td className="border border-slate-600">20220101</td>
                  <td className="border border-slate-600">UH</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="flex justify-center dark:invert sm:mx-auto sm:w-full sm:max-w-sm">
            <CustomButton
              func={checkLoginStatus}
              nameVal="create Invoice"
            ></CustomButton>
          </div>
        </div>
      ) : (
        <div className="min-h-screen content-center">
          <Login setIsLogin={setIsLogin}></Login>
        </div>
      )}
    </>
  );
}
