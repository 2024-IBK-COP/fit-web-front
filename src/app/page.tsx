"use client";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import { redirect } from "next/navigation";
import CustomButton from "./_components/CustomButton";
import InvoiceTable from "./_components/InvoiceTable";
import CustomInput from "./_components/CustomInput";

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
      // <div className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className="flex min-h-screen flex-col justify-center px-6 py-12 lg:px-8">

        <CustomInput setFunc={()=>{}} idVal="search" typeVal="text" nameVal="SEARCH" labelVal="SEARCH" ></CustomInput>
        
        <InvoiceTable invoices={[{
                  invoiceDate : "2024-10-01",
                  senderName : "ABC Company",
                  recipientName : "FGH Co,.LTD",
                  currency : "USD",
                  totalAmount : 50.0
  },{
    invoiceDate : "2024-10-01",
    senderName : "ABC Company",
    recipientName : "FGH Co,.LTD",
    currency : "USD",
    totalAmount : 50.0
},{
  invoiceDate : "2024-10-01",
  senderName : "ABC Company",
  recipientName : "FGH Co,.LTD",
  currency : "USD",
  totalAmount : 50.0
}]}></InvoiceTable>
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
