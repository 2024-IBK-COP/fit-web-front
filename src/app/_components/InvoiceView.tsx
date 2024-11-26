import Invoice from "@/app/_components/Invoice";
import React from "react";
import {  useRef } from 'react'
import axios from "axios";
import Loading from "@/app/_components/Loading";
import html2canvas from 'html2canvas'
import { jsPDF } from 'jspdf'
import FloatButton from "@/app/_components/FloatButton";
import InvoicePdf from "./InvoicePdf";

interface Props {
    invoiceId ?: string;
    closeFunc ?: ()=>void;
}

const InvoiceView = (props : Props) => {

    const [invoiceData, setInvoiceData] = React.useState();
    
    const handleDownloadPdf = async () => {
        
    }
    return (
        <>            
        <div className="fixed top-4 right-4 py-3 px-6">
            <FloatButton func={props.closeFunc} textVal="Close"></FloatButton>
        </div>
        <div className="fixed bottom-4 right-4 py-3 px-6">
            <FloatButton func={handleDownloadPdf} textVal="Download"></FloatButton>
        </div>
            {/* <Invoice printRef={printRef} invoice={invoiceData}></Invoice> */}
            <InvoicePdf></InvoicePdf>
        </>
    );
};

export default InvoiceView;

