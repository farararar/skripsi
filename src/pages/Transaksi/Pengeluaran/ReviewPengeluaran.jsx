import React, { Fragment } from 'react'
import { MDBContainer, MDBBreadcrumb, MDBBreadcrumbItem, } from "mdbreact";
import ReviewPengeluaranComponent from '../../../components/Transaksi/Pengeluaran/ReviewPengeluaranComponent';

export default function ReviewTransaksiKeluar({ props, id }) {
    return (
        <Fragment>
            <MDBBreadcrumb >
                <MDBBreadcrumbItem><b>Review Transaksi</b></MDBBreadcrumbItem>
            </MDBBreadcrumb>
            <MDBContainer className="mt-0" fluid>
                <ReviewPengeluaranComponent userId={id} />
            </MDBContainer>
        </Fragment>
    )
}
