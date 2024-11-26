'use client'

import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

// pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

// pdfjs.GlobalWorkerOptions.workerSrc = new URL(
//     'pdfjs-dist/build/pdf.worker.min.mjs',
//     import.meta.url,
//   ).toString();
  

interface Props {
    invoiceId ?: string;
}

function InvoicePdf(props : Props) {
  const [numPages, setNumPages] = useState<number>(1);
  const [pageNumber, setPageNumber] = useState<number>(1);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
  }

  return (
    <div className='absolute top-0 left-1/2 transform -translate-x-1/2'>
    <Document
      file={"/invoice/invoice/" + props.invoiceId + ".pdf"}
      onLoadSuccess={onDocumentLoadSuccess}>
      <Page pageNumber={pageNumber} />
    </Document>
    <p>
        //이전 페이지 보기
      <span onClick={()=> pageNumber > 1 ? setPageNumber(pageNumber-1):null}>
      &lt;
      </span>
      <span>Page {pageNumber} of {numPages}</span>
         //다음 페이지 보기
      <span onClick={()=> pageNumber < numPages ? setPageNumber(pageNumber+1):null}>
      &gt;
      </span>
    </p>
  </div>
  );
}

export default InvoicePdf;
