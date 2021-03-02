import React, { Fragment } from 'react'
import { MDBContainer, MDBBreadcrumb, MDBBreadcrumbItem, } from "mdbreact";
import ListKeuanganComponent from '../../../components/Transaksi/ListKeuanganComponent';

export default function Keuangan() {
    return (
        <Fragment>
            <MDBBreadcrumb >
                <MDBBreadcrumbItem><b>Keuangan</b></MDBBreadcrumbItem>
            </MDBBreadcrumb>
            <MDBContainer className="mt-0" fluid>
                <ListKeuanganComponent/>
            </MDBContainer>
        </Fragment>
    )
}
