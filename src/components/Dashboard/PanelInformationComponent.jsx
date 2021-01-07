import React, { Fragment, useEffect } from 'react';
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardHeader, MDBBtn, MDBContainer, MDBRow, MDBCol, MDBBox } from "mdbreact";


const PanelInformationComponent = ({ data }) => {
    useEffect(()=>{
        console.log('data = hasasere = ',data);
    },[])
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
                                <MDBCardTitle>{data.total_pemasukan}</MDBCardTitle>
                                <MDBCardText>
                                    {data.transaksi_pemasukan} Transaksi Pada Bulan Ini
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
                                <MDBCardTitle>{data.total_pengeluaran}</MDBCardTitle>
                                <MDBCardText>
                                    {data.transaksi_pengeluaran} Transaksi Pada Bulan Ini
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
