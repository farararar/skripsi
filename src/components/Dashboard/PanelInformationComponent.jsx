import React, { Fragment, useEffect, useContext, useState } from 'react';
import { Context as IncomeContext } from '../../services/Context/IncomeContext'
import { Context as OutcomeContext } from '../../services/Context/OutcomeContext'
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardHeader, MDBRow, MDBCol, MDBBox } from "mdbreact";



const PanelInformationComponent = () => {

    const { state, GetIncome } = useContext(IncomeContext);

    useEffect(() => {
        GetIncome();
    })
    return (
        <Fragment>
            <MDBRow>
                <MDBCol lg='6' md='6' className='mb-lg-0 mb-4'>
                    <MDBBox display="flex" justifyContent="center" >
                        <MDBCard style={{ width: "22rem", marginTop: "1rem" }}>
                            <MDBCardHeader color="primary-color" tag="h3">
                                Penjualan
                                </MDBCardHeader>
                            <MDBCardBody>
                                <MDBCardTitle> {GetIncome()} </MDBCardTitle>
                                <MDBCardText>
                                    170 Transaksi Pada Bulan Ini
                                    </MDBCardText>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBBox>
                </MDBCol>
                <MDBCol lg='6' md='6' className='mb-lg-0 mb-4'>
                    <MDBBox display="flex" justifyContent="center" >
                        <MDBCard style={{ width: "22rem", marginTop: "1rem" }}>
                            <MDBCardHeader color="primary-color" tag="h3">
                                Pengeluaran
                                </MDBCardHeader>
                            <MDBCardBody>
                                <MDBCardTitle>Rp. 260.000.000</MDBCardTitle>
                                <MDBCardText>
                                    90 Transaksi Pada Bulan Ini
                                    </MDBCardText>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBBox>
                </MDBCol>
            </MDBRow>



        </Fragment>
    );
};


export default PanelInformationComponent;
