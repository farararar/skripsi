import React, { Fragment } from 'react'
import { MDBContainer, MDBBreadcrumb, MDBBreadcrumbItem, } from "mdbreact";
import KeuanganComponent from '../../../components/Transaksi/KeuanganComponent';

export default function Keuangan() {
    return (
        <Fragment>
            <MDBBreadcrumb >
                <MDBBreadcrumbItem><b>Keuangan</b></MDBBreadcrumbItem>
            </MDBBreadcrumb>
            <MDBContainer className="mt-0" fluid>
                <KeuanganComponent/>
            </MDBContainer>
        </Fragment>
    )
}
