import React, { Fragment } from 'react'
import { MDBContainer, MDBBreadcrumb, MDBBreadcrumbItem, } from "mdbreact";
import TransaksiKeluarComponent from '../../../components/Transaksi/Pengeluaran/TransaksiKeluarComponent';



export default function TransaksiKeluar(props) {
    return (
        <Fragment>
            <MDBBreadcrumb >
                <MDBBreadcrumbItem><b>Transaksi Keluar</b></MDBBreadcrumbItem>
            </MDBBreadcrumb>
            <MDBContainer className="mt-0" fluid>
                <TransaksiKeluarComponent />
            </MDBContainer>
        </Fragment>
    )
}
