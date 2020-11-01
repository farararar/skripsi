import React, { Fragment } from 'react'
import { MDBContainer, MDBBreadcrumb, MDBBreadcrumbItem, } from "mdbreact";
import TransaksiMasukComponent from '../../../components/Transaksi/TransaksiMasukComponent';

export default function TransaksiMasuk() {
    return (
        <Fragment>
            <MDBBreadcrumb >
                <MDBBreadcrumbItem><b>Transaksi Masuk</b></MDBBreadcrumbItem>
            </MDBBreadcrumb>
            <MDBContainer className="mt-0" fluid>
                <TransaksiMasukComponent />
            </MDBContainer>
        </Fragment>
    )
}
