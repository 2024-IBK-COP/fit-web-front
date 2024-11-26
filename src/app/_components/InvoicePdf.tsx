const InvoicePdf = () => {

  return (
    <iframe
    className="min-w-full min-h-full"
      src={"/api/v1/invoice?invoiceId=241119_radiata03@naver.com_sample-invoice.pdf"}
      onLoad={(e) => e.target.contentWindow.focus()} 
    ></iframe>
  );
};

export default InvoicePdf;