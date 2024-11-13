"use client";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import React from "react";
import CustomButton from "./_components/CustomButton";
import InvoiceTable from "./_components/InvoiceTable";
import CustomInput from "./_components/CustomInput";
import Loading from "./_components/Loading";
import axios from "axios";
import InvoiceView from "./_components/InvoiceView";

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
  const [showInvoiceList, setShowInvoiceList] = React.useState([]);
  const [showInvoice, setShowInvoice] = React.useState(false);
  const [invoiceId, setInvoiceId] = React.useState("");

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
          setShowInvoiceList(res.data.data.invoices);
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
    setShowInvoiceList(
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
      showInvoice ?
      <InvoiceView closeFunc={()=>setShowInvoice(false)} invoiceId={invoiceId}></InvoiceView>
        :
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
          <InvoiceTable invoices={showInvoiceList} setInvoiceId={setInvoiceId} setShowInvoice={setShowInvoice}></InvoiceTable>
        </div>
        <div>
          <CustomButton func={signOutFunc} nameVal="SIGN OUT"></CustomButton>
        </div>
      </div>
    
    );
  } else {
    return (
      <Loading></Loading>
    );
  }
};

export default Home;

