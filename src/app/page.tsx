"use client";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import React from "react";
import { redirect } from "next/navigation";
import CustomButton from "./_components/CustomButton";
import InvoiceTable from "./_components/InvoiceTable";
import CustomInput from "./_components/CustomInput";
import Loading from "./_components/Loading";
import axios from "axios";

interface Invoice {
  invoiceId: string;
  invoiceDate: string;
  senderName: string;
  recipientName: string;
  currency: string;
  totalAmount: number;
}

const Home = () => {
  const { status, data: session } = useSession();

  const [searchData, setSearchData] = React.useState("");
  const [invoices, setInvoices] = React.useState([]);
  const [showInvoices, setShowInvoices] = React.useState([]);

  React.useEffect(() => {
    // session 찾을때마다 실행
    // console.log("IS MOUNTIS MOUNTIS MOUNTIS MOUNTIS MOUNTIS MOUNTIS MOUNTIS MOUNTIS MOUNTIS MOUNT");
    axios
      // .post("/api/v1/verify", credentials)
      .get("/api/v1/invoices/my", {
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
      })
      .then((res) => {        
        if (res.data.code == "00") {
          setInvoices(res.data.data.invoices);
          setShowInvoices(res.data.data.invoices);
          console.log("console.log(res.data.data.invoices); S");
          console.log(res.data.data.invoices);
          console.log("console.log(res.data.data.invoices); E");
        } else {
        }
      })
      .catch((err) => {
        console.log("ERRRRRRRRRRRRRRRRRRRRRRRRRRRR");
        console.log(err);
        return null;
      });
  }, [status]);

  React.useEffect(() => {
    setShowInvoices(
      invoices.filter((invoice: Invoice) => {
        return (
          invoice.recipientName.toUpperCase().includes(searchData.toUpperCase()) ||
          invoice.senderName.toUpperCase().includes(searchData.toUpperCase())
        );
      })
    );
  }, [searchData]);

  const signOutFunc = async () => {
    const res = await signOut({ callbackUrl: "/" });
  };

  if (status === "loading") {
    return (
      <Loading></Loading>
    );
  }

  if (session) {
    return (
      // <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex min-h-screen flex-col justify-center space-y-4 px-6 py-12 lg:px-8">
        <div className="dark:invert">
          <CustomInput
            setFunc={setSearchData}
            idVal="search"
            typeVal="text"
            nameVal="SEARCH"
            labelVal="SEARCH"
          ></CustomInput>
        </div>
        <div>
          <InvoiceTable invoices={showInvoices}></InvoiceTable>
        </div>
        <div>
          <CustomButton func={signOutFunc} nameVal="SIGN OUT"></CustomButton>
        </div>
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

