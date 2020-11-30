import React, { Fragment } from 'react'
import { MDBContainer, MDBBreadcrumb, MDBBreadcrumbItem, } from "mdbreact";
import BukuBesarKeuanganComponent from '../../components/BukuBesar/BukuBesarKeuanganComponent';

export default function LaporanKeuangan() {
    return (
        <Fragment>
            <MDBBreadcrumb >
                <MDBBreadcrumbItem><b>Laporan Keuangan</b></MDBBreadcrumbItem>
            </MDBBreadcrumb>
            <MDBContainer className="mt-0" fluid>
                <BukuBesarKeuanganComponent />
            </MDBContainer>
        </Fragment>
    )
}