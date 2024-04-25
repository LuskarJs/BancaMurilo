import React from 'react';
import { Page, Text, Document, StyleSheet } from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4'
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  }
});

// Create PDF component
const RelatorioPDF = ({ dados }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.section}>Relatório PDF</Text>
      {dados.map((produto, index) => (
        <Text key={index} style={styles.section}>
          {produto.nome} - Vendas: {produto.vendas}
        </Text>
      ))}
    </Page>
  </Document>
);

export default RelatorioPDF;
