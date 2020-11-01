import React, { Fragment } from 'react'
import { MDBBreadcrumb, MDBBreadcrumbItem, MDBContainer, MDBTypography } from "mdbreact";
import ListTransaksiComponent from '../../../components/Transaksi/TransaksiCabang/ListTransaksiComponent';


export default function TransaksiCabang() {
    return (
        <Fragment>
            <MDBBreadcrumb>
                <MDBBreadcrumbItem><b>List Transaksi Cabang</b></MDBBreadcrumbItem>
            </MDBBreadcrumb>
            <MDBContainer className="mt-0" fluid>
                <ListTransaksiComponent />
            </MDBContainer>
        </Fragment>
    )
}
