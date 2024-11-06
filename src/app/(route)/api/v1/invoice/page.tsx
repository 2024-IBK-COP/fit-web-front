"use client";

import Invoice from "../../../../_components/Invoice"

const invoiceSample = {
    companyName : "Your Company Name",
    businessAddress : "Your Business Address",
    city : "City",
    country : "Country",
    postal : "Postal",
    invoiceNumber : "000001",
    date : "12/31/20",
    dueDate : "12/31/20",
    billTo : {
        name:  "Company Name",
        address:  "Address",
        city:  "City",
        country:  "Country",
        postal:  "Postal"
    },
    items : 
        [{ name:  "Item 1", description:  "Description", quantity:  1, price:  0, tax:  "0%", amount:  "$0000.00" },{ name:  "Item 2", description:  "Description", quantity:  1, price:  0, tax:  "0%", amount:  "$0000.00" }]
    ,
    notes :  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent ut nisi tempus massa blandit luctus.",
    totalAmount :  "$0000.00"
}

const InvoiceView = () => {
    return(
        <Invoice invoice={invoiceSample}></Invoice>
    );
};

export default InvoiceView;

