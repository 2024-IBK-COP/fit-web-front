"use client";

import Invoice from "@/app/_components/Invoice";
import { useSearchParams } from 'next/navigation';
import React from "react";
import axios from "axios";
import { useSession } from "next-auth/react";

const InvoiceView = () => {

    const { status, data: session } = useSession();

    const [invoiceData, setInvoiceData] = React.useState();
    const invoiceId = useSearchParams().get('invoiceId');

    React.useEffect(() => {

        axios
            .get(`/api/v1/invoice?invoiceId=${invoiceId}`, {
                headers: {
                    Authorization: `Bearer ${session?.accessToken}`,
                  },
                validateStatus: function (status) {
                    return status < 500; // 상태 코드가 500 미만인 경우에만 해결
                },
            })
            .then((res) => {
                // return res.data;
                console.log("console.log(res);console.log(res);")
                console.log(res);
                console.log("console.log(res);console.log(res);")
                setInvoiceData(res.data.data)
            })
            .catch((err) => {
                setInvoiceData(err.data)
                // return err.data;
            });

    }, []);


    if (status == "loading") {
        return (
            <div className="flex min-h-screen flex-col items-center justify-between p-24">
                loading
            </div>
        );
    }
    
    if( session ) {
        if(invoiceData){
            return (
                // <Invoice invoice={invoiceSample}></Invoice>
                // "1203f1e3-80b3-415a-a8af-db08b2f8196f"
                <Invoice invoice={invoiceData}></Invoice>
            );
        }
    }
    
};

export default InvoiceView;

