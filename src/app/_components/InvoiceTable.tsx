import { useState } from "react";
import InvoiceView from "./InvoiceView";

interface Props {
  invoices:
  {
    id: string;
    invoiceDate: string;
    senderName: string;
    recipientName: string;
    currency: string;
    totalAmount: number;
  }[];
  setInvoiceId ?: (value : string) => void;
  setShowInvoice ?: (value : boolean) => void;
}

export default function InvoiceTable(props: Props) {
  const [showModal, setShowModal] = useState(false);
  const [modalInvoieId, setModalInvoiceId] = useState("");

  const showModalY = () => {
    setShowModal(true);
  }
  const showModalN = () => {
    setShowModal(false);
  }
  const clickShowModalButton = (invoiceId : string) => {
    showModalY();
    setModalInvoiceId(invoiceId);
    
    if (props.setInvoiceId) props.setInvoiceId(invoiceId);
    if (props.setShowInvoice) props.setShowInvoice(true);
  }

  return (
    <div className="relative w-full overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Date
            </th>
            <th scope="col" className="px-6 py-3">
              Seller
            </th>
            <th scope="col" className="px-6 py-3">
              Buyer
            </th>
            <th scope="col" className="px-6 py-3">
              Currency
            </th>
            <th scope="col" className="px-6 py-3">
              Price
            </th>
            <th scope="col" className="px-6 py-3">
              <span className="sr-only">Edit</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {props.invoices.length > 0 ? (
            props.invoices.map((invoice) => (
              <tr key={invoice.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td className="px-6 py-4">{invoice.invoiceDate}</td>
                <td className="px-6 py-4">{invoice.senderName}</td>
                <td className="px-6 py-4">{invoice.recipientName}</td>
                <td className="px-6 py-4">{(invoice.currency == '$') ? ('USD') : (invoice.currency)}</td>
                <td className="px-6 py-4">{invoice.totalAmount}</td>
                <td className="px-6 py-4 text-right">
                  <button
                    onClick={()=> clickShowModalButton(invoice.id)}
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    SHOW INVOICE
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              <td colSpan={6} className="px-6 py-4 text-center">
                No Data
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {showModal && 
      <div tabIndex={-1} className="absolute top-0 left-0 text-black bg-white max-w-[210mm] min-w-[210mm] min-h-[297mm] max-h-[297mm] mx-auto p-10 shadow-lg">
        <InvoiceView invoiceId={modalInvoieId} closeFunc={showModalN} ></InvoiceView>
      </div>}
    </div>
  );
}
