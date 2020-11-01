import React, { Fragment } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBTypography, MDBCard, MDBCardBody, MDBBox, MDBBtn, MDBFormInline } from "mdbreact";
import { Link, withRouter } from 'react-router-dom'

const ListTransaksiComponent = (props) => {

    const handleClickReview = (id) => {
        props.history.push(`/review-transaksi/${id}`)
    }
    const handleClickGenerate = (tanggal) => {
        props.history.push(`/jurnal-perhari/${tanggal}`)
    }

    return (
        <Fragment>
            <MDBContainer fluid>
                <MDBBox display="flex" justifyContent="end">
                    <MDBCol md="3">
                        <MDBFormInline className="md-form mr-auto mb-2">
                            <input className="form-control mr-sm-2" type="text" placeholder="Cari Transaksi" aria-label="Search" />
                            <MDBBtn gradient="aqua" rounded size="sm" type="submit" className="mr-auto">
                                Cari
                                </MDBBtn>
                        </MDBFormInline>
                    </MDBCol>
                </MDBBox>
                <MDBCard className='mb-2'>
                    <MDBCardBody className='p-1'>
                        <MDBRow>
                            <MDBCol lg="9">
                                <h4 className="pt-2 mx-2"> 1. Transaksi Cabang <small>Pemasukan</small></h4>
                            </MDBCol>
                            <MDBCol lg="3">
                                <MDBRow>
                                    <MDBBtn color="cyan" size="sm" onClick={()=>handleClickReview(2)} >Review</MDBBtn>
                                    <MDBBtn color="dark-green" size="sm" onClick={()=>handleClickGenerate('2020-08-20')}>Generate</MDBBtn>
                                </MDBRow>
                            </MDBCol>
                        </MDBRow>
                    </MDBCardBody>
                </MDBCard>

                <MDBCard>
                    <MDBCardBody className='p-1'>
                        <MDBRow>
                            <MDBCol lg="9">
                                <h4 className="pt-2 mx-2"> 1. Transaksi Cabang <small>Pemasukan</small></h4>
                            </MDBCol>
                            <MDBCol lg="3">
                                <MDBRow>
                                    <MDBBtn color="cyan" size="sm">Review</MDBBtn>
                                    <MDBBtn color="dark-green" size="sm">Generate</MDBBtn>
                                </MDBRow>
                            </MDBCol>
                        </MDBRow>
                    </MDBCardBody>
                </MDBCard>
            </MDBContainer>
        </Fragment>
    );
}

export default withRouter(ListTransaksiComponent);
