import React, { Fragment } from 'react'
import { MDBContainer, MDBBreadcrumb, MDBBreadcrumbItem, } from "mdbreact";
import ListComponent from '../../../components/Transaksi/Pengeluaran/ListPengeluaranComponent';


export default function ListTransaksiKeluar(props) {
    return (
        <Fragment>
            <MDBBreadcrumb >
                <MDBBreadcrumbItem><b>Daftar Transaksi Keluar</b></MDBBreadcrumbItem>
            </MDBBreadcrumb>
            <MDBContainer className="mt-0" fluid>
                <ListComponent />
            </MDBContainer>
        </Fragment>
    )
}
