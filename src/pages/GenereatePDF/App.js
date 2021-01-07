import React, { Component, Fragment, useEffect, useContext, useState } from 'react';
import { PDFViewer } from '@react-pdf/renderer'
import Invoice from './components/reports/Invoice'
import invoice from './data/invoice'
import './App.css';
import { Context as IncomeContext } from "../../services/Context/IncomeContext";
export default function App({ props, history }) {
  const {
    state,
    InvoiceIncome
  } = useContext(IncomeContext);
  const [value, setValue] = useState([])
  useEffect(() => {
    const timer = setTimeout(() => {
      InvoiceIncome(history.location.state.userId)
    }, 3000);
    return () => clearTimeout(timer);
  }, [])

  return (
    <>
      {state.loading ?
        <div />
        : <Fragment>
          <PDFViewer width="1000" height="600" className="app" >
            {<Invoice invoice={invoice} data={state.invoiceIncome} />}
          </PDFViewer>
        </Fragment>}
    </>
  );
}