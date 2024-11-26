import Invoice from "@/app/_components/Invoice";
import React from "react";
import { useRef, useCallback } from "react";
import axios from "axios";
import Loading from "@/app/_components/Loading";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import FloatButton from "@/app/_components/FloatButton";
import InvoicePdf from "./InvoicePdf";

interface Props {
  invoiceId?: string;
  closeFunc?: () => void;
}

const InvoiceView = (props: Props) => {
  const [invoiceData, setInvoiceData] = React.useState<any>();
  const [invoiceFile, setInvoiceFile] = React.useState(false);

  const printRef = useRef<HTMLElement>(null);

  const handleDownloadPdf = async (invoiceData: any) => {
    const element = printRef.current;
    if (!element) {
      return;
    }
    const canvas = await html2canvas(element);
    const componentWidth = element.offsetWidth;
    const componentHeight = element.offsetHeight;

    const orientation = componentWidth >= componentHeight ? "l" : "p";

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF({
      orientation,
      unit: "px",
    });

    pdf.internal.pageSize.width = componentWidth;
    pdf.internal.pageSize.height = componentHeight;

    pdf.addImage(imgData, "PNG", 0, 0, componentWidth, componentHeight);
    pdf.save(invoiceData.invoiceDate + "_invoice.pdf");
  };


  const downloadPdf = useCallback((srcUrl: string, name: string) => {
    fetch(srcUrl, { method: 'GET' }).then((res) => res.blob()).then((blob) => {
       const url = window.URL.createObjectURL(blob);
       const a = document.createElement('a');
       a.href = url;
       a.download = name;
       document.body.appendChild(a);
       a.click();
       setTimeout((_) => {
       window.URL.revokeObjectURL(url);
       }, 1000);
       a.remove();
    }).catch((err) => {
       console.error('err', err);
    });
 }, []);


  React.useEffect(() => {
    axios
      .get(`/api/v1/invoice?invoiceId=${props.invoiceId}`, {
        headers: {},
        validateStatus: function (status) {
          return status < 500; // 상태 코드가 500 미만인 경우에만 해결
        },
      })
      .then((res) => {
        // return res.data;
        console.log("console.log(res);console.log(res);11");
        console.log(res);
        console.log("console.log(res);console.log(res);11");
        setInvoiceData(res.data.data);
      })
      .catch((err) => {
        setInvoiceData(err.data);
        // return err.data;
      });

    axios
      .get(`/invoice/invoice/${props.invoiceId}.pdf`, {
        headers: {}
      })
      .then((res) => {
        //"1fb9e55e-dbee-4cac-b7e8-a2fb72a67653"
        // return res.data;
        console.log("console.log(res);console.log(res);22");
        console.log(res);
        console.log("console.log(res);console.log(res);22");
        setInvoiceFile(true)
      })
      .catch((err) => {
        console.log("console.log(res);console.log(res);22");
        console.log(err);
        console.log("console.log(res);console.log(res);22");
        setInvoiceFile(false)
        // return err.data;
      });
  }, []);

  if (invoiceData) {
    return (
      // <Invoice invoice={invoiceSample}></Invoice>
      // "1203f1e3-80b3-415a-a8af-db08b2f8196f"
      <>
        <div className="fixed top-4 right-4 py-3 px-6">
          <FloatButton func={props.closeFunc} textVal="Close"></FloatButton>
        </div>
        <div className="fixed bottom-4 right-4 py-3 px-6">
          <FloatButton
            func={() => {
                if (invoiceFile){
                    downloadPdf(`/invoice/invoice/${props.invoiceId}.pdf`, invoiceData.invoiceDate + "_invoice.pdf")
                }else{
                    handleDownloadPdf(invoiceData);
                }
            }}
            textVal="Download"
          ></FloatButton>
        </div>

        
        { invoiceFile ? 
            <InvoicePdf invoiceId={props.invoiceId}></InvoicePdf> : 
            <Invoice printRef={printRef} invoice={invoiceData}></Invoice> 
        }

        
      </>
    );
  } else {
    return <Loading></Loading>;
  }
};

export default InvoiceView;
