import React from 'react';
import { Page, Text, View, Document, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';

// 예시 스타일
const styles = StyleSheet.create({
  page: {
    padding: 30,
  },
  section: {
    marginBottom: 10,
    padding: 10,
  },
  header: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'center',
  },
  details: {
    fontSize: 12,
    marginBottom: 10,
  },
  table: {
    display: 'table',
    width: 'auto',
    borderStyle: 'solid',
    borderColor: '#000',
    borderWidth: 1,
    marginTop: 20,
  },
  tableRow: {
    flexDirection: 'row',
  },
  tableCol: {
    borderStyle: 'solid',
    borderColor: '#000',
    borderWidth: 1,
    padding: 5,
    width: '25%',
  },
  tableCell: {
    fontSize: 10,
  },
});

// 인보이스 데이터 예시
const invoiceData = {
  invoiceNumber: '123456',
  date: '2023-11-01',
  dueDate: '2023-12-01',
  client: {
    name: 'John Doe',
    address: '123 Main St, City, Country',
  },
  items: [
    { description: 'Service 1', quantity: 2, price: 50 },
    { description: 'Service 2', quantity: 3, price: 75 },
  ],
};

// 총 가격 계산 함수
const calculateTotal = (items) =>
  items.reduce((total, item) => total + item.quantity * item.price, 0);

// 인보이스 문서 컴포넌트
const InvoiceDocument = () => (
  <Document>
    <Page style={styles.page}>
      <Text style={styles.header}>Invoice #{invoiceData.invoiceNumber}</Text>
      
      <View style={styles.section}>
        <Text style={styles.details}>Date: {invoiceData.date}</Text>
        <Text style={styles.details}>Due Date: {invoiceData.dueDate}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.details}>Bill To:</Text>
        <Text style={styles.details}>{invoiceData.client.name}</Text>
        <Text style={styles.details}>{invoiceData.client.address}</Text>
      </View>

      <View style={styles.table}>
        <View style={styles.tableRow}>
          <View style={styles.tableCol}><Text style={styles.tableCell}>Description</Text></View>
          <View style={styles.tableCol}><Text style={styles.tableCell}>Quantity</Text></View>
          <View style={styles.tableCol}><Text style={styles.tableCell}>Price</Text></View>
          <View style={styles.tableCol}><Text style={styles.tableCell}>Total</Text></View>
        </View>
        
        {invoiceData.items.map((item, index) => (
          <View style={styles.tableRow} key={index}>
            <View style={styles.tableCol}><Text style={styles.tableCell}>{item.description}</Text></View>
            <View style={styles.tableCol}><Text style={styles.tableCell}>{item.quantity}</Text></View>
            <View style={styles.tableCol}><Text style={styles.tableCell}>${item.price.toFixed(2)}</Text></View>
            <View style={styles.tableCol}><Text style={styles.tableCell}>${(item.quantity * item.price).toFixed(2)}</Text></View>
          </View>
        ))}

        <View style={styles.tableRow}>
          <View style={styles.tableCol}><Text style={styles.tableCell}>Total</Text></View>
          <View style={styles.tableCol}></View>
          <View style={styles.tableCol}></View>
          <View style={styles.tableCol}><Text style={styles.tableCell}>${calculateTotal(invoiceData.items).toFixed(2)}</Text></View>
        </View>
      </View>
    </Page>
  </Document>
);

// PDF 다운로드 링크 컴포넌트
const InvoicePDF = () => (
  <PDFDownloadLink document={<InvoiceDocument />} fileName="invoice.pdf">
    {({ loading }) => (loading ? 'Loading document...' : 'Download Invoice')}
  </PDFDownloadLink>
);

export default InvoicePDF;
