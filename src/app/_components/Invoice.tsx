import React from 'react';
import Image from "next/image";
// import '/css/invoice.css';
// import '../../../public/css/invoice.css'

interface Props {
    invoice: {
        companyName: string | "Your Company Name",
        businessAddress: string | "Your Business Address",
        city: string | "City",
        country: string | "Country",
        postal: string | "Postal",
        invoiceNumber: string | "000001",
        date: string | "12/31/20",
        dueDate: string | "12/31/20",
        billTo: {
            name: string | "Company Name",
            address: string | "Address",
            city: string | "City",
            country: string | "Country",
            postal: string | "Postal"
        },
        items:
        { name: string | "Item 1", description: string | "Description", quantity: number | 1, price: number | 0, tax: string | "0%", amount: string | "$0000.00" }[]
        ,
        notes: string | "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent ut nisi tempus massa blandit luctus.",
        totalAmount: string | "$0000.00"
    }
}



export default function Invoice(props: Props) {
    return (
        <div className="text-black bg-white max-w-[210mm] min-h-[297mm] mx-auto p-10 shadow-lg">
            
            <div className="flex justify-between items-center mb-10">
                <div className="flex flex-col items-center">
                    <Image
                    // loader={()=>{return "/img/IBK_CI_LOGO.png"}}
                    // priority={true}
                    width={150}
                    height={100}
                    //className="mx-auto h-50 w-auto"
                    src="/img/COMPANY_LOGO.jpeg"
                    alt="Your Company"
                    />
                    <br></br>
                    <h1 className="text-4xl font-bold">Invoice</h1>
                </div>
                <div className="text-right">
                    <p>{props.invoice.companyName}</p>
                    <p>{props.invoice.businessAddress}</p>
                    <p>{props.invoice.city}, {props.invoice.country}</p>
                    <p>{props.invoice.postal}</p>
                </div>
            </div>

            <div className="flex justify-between mb-8">
                <div>
                    <h2 className="text-xl font-semibold">Bill To:</h2>
                    <p>{props.invoice.billTo.name}</p>
                    <p>{props.invoice.billTo.address}</p>
                    <p>{props.invoice.billTo.city}</p>
                    <p>{props.invoice.billTo.country}</p>
                    <p>{props.invoice.billTo.postal}</p>
                </div>
                <div className="text-right">
                    <p><span className="font-semibold">Invoice #:</span> {props.invoice.invoiceNumber}</p>
                    <p><span className="font-semibold">Date:</span> {props.invoice.date}</p>
                    <p><span className="font-semibold">Invoice Due Date:</span> {props.invoice.dueDate}</p>
                </div>
            </div>

            <table className="w-full border-collapse border border-gray-300 mb-8">
                <thead>
                    <tr>
                        <th className="border border-gray-300 p-2 bg-gray-100 font-semibold">Items</th>
                        <th className="border border-gray-300 p-2 bg-gray-100 font-semibold">Description</th>
                        <th className="border border-gray-300 p-2 bg-gray-100 font-semibold">Quantity</th>
                        <th className="border border-gray-300 p-2 bg-gray-100 font-semibold">Price</th>
                        <th className="border border-gray-300 p-2 bg-gray-100 font-semibold">Tax</th>
                        <th className="border border-gray-300 p-2 bg-gray-100 font-semibold">Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {props.invoice.items.map((item, index) => (
                        <tr key={index}>
                            <td className="border border-gray-300 p-2">{item.name}</td>
                            <td className="border border-gray-300 p-2">{item.description}</td>
                            <td className="border border-gray-300 p-2 text-center">{item.quantity}</td>
                            <td className="border border-gray-300 p-2 text-right">${item.price}</td>
                            <td className="border border-gray-300 p-2 text-center">{item.tax}</td>
                            <td className="border border-gray-300 p-2 text-right">{item.amount}</td>
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
    );
};