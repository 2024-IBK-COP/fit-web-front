/*
    "invoices": [
      {
        "id": "string",
        "invoiceDate": "2024-11-05",
        "dueDate": "2024-11-05",
        "memberId": 0,
        "memberEmail": "string",
        "senderName": "string",
        "senderAddress": "string",
        "senderContact": "string",
        "recipientName": "string",
        "recipientAddress": "string",
        "recipientContact": "string",
        "items": [
          {
            "id": 0,
            "itemName": "string",
            "itemDescription": "string",
            "quantity": 0,
            "unitPrice": 0,
            "totalPrice": 0,
            "invoiceId": "string"
          }
        ],
        "subTotal": 0,
        "taxRate": 0,
        "taxAmount": 0,
        "discount": 0,
        "totalAmount": 0,
        "paymentTerms": "string",
        "paymentMethod": "string",
        "bankDetails": "string",
        "paymentStatus": "string",
        "notes": "string",
        "termsAndConditions": "string",
        "currency": "string",
        "referenceNumber": "string"
      }
 */

interface Props {
  invoices: 
    {
      invoiceId: string;
      invoiceDate: string;
      senderName: string;
      recipientName: string;
      currency: string;
      totalAmount: number;
    }[]
  ;
}

export default function InvoiceTable(props: Props) {
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
              <tr key={invoice.invoiceId} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td key={invoice.invoiceId} className="px-6 py-4">{invoice.invoiceDate}</td>
                <td key={invoice.invoiceId} className="px-6 py-4">{invoice.senderName}</td>
                <td key={invoice.invoiceId} className="px-6 py-4">{invoice.recipientName}</td>
                <td key={invoice.invoiceId} className="px-6 py-4">{invoice.currency}</td>
                <td key={invoice.invoiceId} className="px-6 py-4">{invoice.totalAmount}</td>
                <td key={invoice.invoiceId} className="px-6 py-4 text-right">
                  <a
                    href="#"
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    SHOW INVOICE
                  </a>
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
    </div>
  );
}
