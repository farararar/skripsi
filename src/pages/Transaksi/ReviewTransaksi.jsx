import React, { Fragment } from 'react'
import { MDBContainer, MDBBreadcrumb, MDBBreadcrumbItem, } from "mdbreact";
import ReviewTransaksiComponent from '../../components/Transaksi/ReviewTransaksiComponent';


export default function ReviewTransaksi({props, id}) {
    return (
        <Fragment>
            <MDBBreadcrumb >
                <MDBBreadcrumbItem><b>Review Transaksi</b></MDBBreadcrumbItem>
            </MDBBreadcrumb>
            <MDBContainer className="mt-0" fluid>
                <ReviewTransaksiComponent userId={id} />
            </MDBContainer>
        </Fragment>
    )
}
