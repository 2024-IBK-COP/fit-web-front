"use client";

import Invoice from "../../../../../_components/Invoice";
import { useSearchParams } from 'next/navigation';
import React from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
const invoiceSample = {
    companyName: "Your Company Name",
    businessAddress: "Your Business Address",
    city: "City",
    country: "Country",
    postal: "Postal",
    invoiceNumber: "000001",
    date: "12/31/20",
    dueDate: "12/31/20",
    billTo: {
        name: "Company Name",
        address: "Address",
        city: "City",
        country: "Country",
        postal: "Postal"
    },
    items:
        [{ name: "Item 1", description: "Description", quantity: 1, price: 0, tax: "0%", amount: "$0000.00" }, { name: "Item 2", description: "Description", quantity: 1, price: 0, tax: "0%", amount: "$0000.00" }]
    ,
    notes: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent ut nisi tempus massa blandit luctus.",
    totalAmount: "$0000.00"
}

const InvoiceView = () => {

    const { status, data: session } = useSession();
    const [invoiceData, setInvoiceData] = React.useState();
    const invoiceId = useSearchParams().get('invoiceId');

    React.useEffect( () => {

        const response: any = axios
            .get(`/api/v1/invoice?invoiceId=${invoiceId}`, {
                headers: {
                    Authorization: `Bearer ${session?.accessToken}`,
                },
                validateStatus: function (status) {
                    return status < 500; // 상태 코드가 500 미만인 경우에만 해결
                },
            })
            .then((res) => {
                return res.data;
            })
            .catch((err) => {
                return err.data;
            });
        setInvoiceData(response.data)
    }, [status]);


    if (status === "loading") {
        return (
            <div className="flex min-h-screen flex-col items-center justify-between p-24">
                loading
            </div>
        );
    }

    return (
        // <Invoice invoice={invoiceSample}></Invoice>
        // "1203f1e3-80b3-415a-a8af-db08b2f8196f"
        <Invoice invoice={invoiceData}></Invoice>
    );
};

export default InvoiceView;

