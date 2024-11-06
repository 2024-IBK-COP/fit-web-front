import React from 'react';

const Invoice = ({
    companyName = "Your Company Name",
    businessAddress = "Your Business Address",
    city = "City",
    country = "Country",
    postal = "Postal",
    invoiceNumber = "000001",
    date = "12/31/20",
    dueDate = "12/31/20",
    billTo = {
        name: "Company Name",
        address: "Address",
        city: "City",
        country: "Country",
        postal: "Postal"
    },
    items = [
        { name: "Item 1", description: "Description", quantity: 1, price: 0, tax: "0%", amount: "$0000.00" },
        { name: "Item 2", description: "Description", quantity: 1, price: 0, tax: "0%", amount: "$0000.00" },
    ],
    notes = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent ut nisi tempus massa blandit luctus.",
    totalAmount = "$0000.00"
}) => {
    return (
        <div className="bg-white max-w-[210mm] min-h-[297mm] mx-auto p-10 shadow-lg">
            
            <div className="flex justify-between items-center mb-10">
                <div className="flex items-center">
                    <img src="logo.png" alt="Company Logo" className="w-12 h-12 mr-4" />
                    <h1 className="text-4xl font-bold">Invoice</h1>
                </div>
                <div className="text-right">
                    <p>{companyName}</p>
                    <p>{businessAddress}</p>
                    <p>{city}, {country}</p>
                    <p>{postal}</p>
                </div>
            </div>

            <div className="flex justify-between mb-8">
                <div>
                    <h2 className="text-xl font-semibold">Bill To:</h2>
                    <p>{billTo.name}</p>
                    <p>{billTo.address}</p>
                    <p>{billTo.city}</p>
                    <p>{billTo.country}</p>
                    <p>{billTo.postal}</p>
                </div>
                <div className="text-right">
                    <p><span className="font-semibold">Invoice #:</span> {invoiceNumber}</p>
                    <p><span className="font-semibold">Date:</span> {date}</p>
                    <p><span className="font-semibold">Invoice Due Date:</span> {dueDate}</p>
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
                    {items.map((item, index) => (
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
                <p>{notes}</p>
            </div>

            <div className="flex justify-end items-center">
                <div className="text-2xl font-bold">Total:</div>
                <div className="text-2xl font-bold ml-4">{totalAmount}</div>
            </div>
        </div>
    );
};

export default Invoice;
