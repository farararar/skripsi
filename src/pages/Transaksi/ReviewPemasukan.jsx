import React, { Fragment } from 'react'
import { MDBContainer, MDBBreadcrumb, MDBBreadcrumbItem, } from "mdbreact";
import ReviewPemasukanComponent from '../../components/Transaksi/Pemasukkan/ReviewPemasukanComponent';

export default function ReviewTransaksi({ props, id }) {
    return (
        <Fragment>
            <MDBBreadcrumb >
                <MDBBreadcrumbItem><b>Review Transaksi</b></MDBBreadcrumbItem>
            </MDBBreadcrumb>
            <MDBContainer className="mt-0" fluid>
                <ReviewPemasukanComponent userId={id} />
            </MDBContainer>
        </Fragment>
    )
}

