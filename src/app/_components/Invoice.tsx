import React from 'react';
import Image from "next/image";
import { usePDF } from 'react-to-pdf';
import generatePDF from 'react-to-pdf';
import CustomButton from './CustomButton';

import { useEffect, useRef, useState } from 'react'
import html2canvas from 'html2canvas'
import { jsPDF } from 'jspdf'

interface Props {
    refUrl?: string;
    invoice: {
        senderName?: string,
        senderAddress?: string,
        senderContact?: string,
        invoiceNumber?: string,
        invoiceDate?: string,
        dueDate?: string,
        recipientName?: string,
        recipientAddress?: string,
        recipientContact?: string,
        items:
        { itemName?: string, itemDescription?: string, totalPrice?: number, unitPrice?: string, quantity?: number }[]
        ,
        notes?: string,
        totalAmount?: string
    }
}



export default function Invoice(props: Props) {

    console.log("export default function Invoice(props: Props) {export default function Invoice(props: Props) {E");
    console.log(props);
    console.log("export default function Invoice(props: Props) {export default function Invoice(props: Props) { S");


    const printRef = useRef<HTMLElement>(null)

    const handleDownloadPdf = async () => {
        const element = printRef.current
        if (!element) {
            return
        }
        const canvas = await html2canvas(element)
        const componentWidth = element.offsetWidth
        const componentHeight = element.offsetHeight

        const orientation = componentWidth >= componentHeight ? 'l' : 'p'

        const imgData = canvas.toDataURL('image/png')
        const pdf = new jsPDF({
            orientation,
            unit: 'px',
        })

        pdf.internal.pageSize.width = componentWidth
        pdf.internal.pageSize.height = componentHeight

        pdf.addImage(imgData, 'PNG', 0, 0, componentWidth, componentHeight)
        pdf.save('대출제안서.pdf')
    }

    return (

        <>
            <div className='absolute-right'><CustomButton nameVal='DOWNLOAD' func={handleDownloadPdf}></CustomButton></div>
            <div >
                Content to be included in the PDF
            </div>
            <div ref={printRef} className="text-black bg-white max-w-[210mm] min-h-[297mm] mx-auto p-10 shadow-lg">

                <div className="flex justify-between items-center content-center mb-10">
                    <div className="flex flex-col items-center">
                        {/* <Image
                            // loader={()=>{return "/img/IBK_CI_LOGO.png"}}
                            // priority={true}
                            width={150}
                            height={100}
                            //className="mx-auto h-50 w-auto"
                            src="/img/COMPANY_LOGO.jpeg"
                            alt="Your Company"
                        
                        /> */}
                        <img src='/img/COMPANY_LOGO.jpeg' width={150}></img>
                        <br></br>
                        <h1 className="text-4xl font-bold">Invoice</h1>
                    </div>
                    <div className="text-right">
                        <p>{props.invoice.senderName}</p>
                        <p>{props.invoice.senderAddress}</p>
                        <p>{props.invoice.senderContact}</p>
                    </div>
                </div>

                <div className="flex justify-between mb-8">
                    <div>
                        <h2 className="text-xl font-semibold">Bill To:</h2>
                        <p>{props.invoice.recipientName}</p>
                        <p>{props.invoice.recipientAddress}</p>
                        <p>{props.invoice.recipientContact}</p>
                    </div>
                    <div className="text-right">
                        <p><span className="font-semibold">Invoice #:</span> {props.invoice.invoiceNumber}</p>
                        <p><span className="font-semibold">Date:</span> {props.invoice.invoiceDate}</p>
                        <p><span className="font-semibold">Invoice Due Date:</span> {props.invoice.dueDate}</p>
                    </div>
                </div>

                <table className="w-full border-collapse border border-gray-300 mb-8">
                    <thead>
                        <tr>
                            <th className="border border-gray-300 p-2 bg-gray-100 font-semibold">Item</th>
                            <th className="border border-gray-300 p-2 bg-gray-100 font-semibold">Description</th>
                            <th className="border border-gray-300 p-2 bg-gray-100 font-semibold">Total Price</th>
                            <th className="border border-gray-300 p-2 bg-gray-100 font-semibold">Unit Price</th>
                            <th className="border border-gray-300 p-2 bg-gray-100 font-semibold">Quantity</th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.invoice.items.map((item, index) => (
                            <tr key={index}>
                                <td className="border border-gray-300 p-2">{item.itemName}</td>
                                <td className="border border-gray-300 p-2">{item.itemDescription}</td>
                                <td className="border border-gray-300 p-2 text-center">{item.totalPrice}</td>
                                <td className="border border-gray-300 p-2 text-center">{item.unitPrice}</td>
                                <td className="border border-gray-300 p-2 text-right">{item.quantity}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className="mb-8">
                    <p className="font-semibold">Notes:</p>
                    <p>{props.invoice.notes}</p>
                </div>

                <div className="flex justify-end items-center">
                    <div className="text-2xl font-bold">Total:</div>
                    <div className="text-2xl font-bold ml-4">{props.invoice.totalAmount}</div>
                </div>
            </div>
        </>
    );
};