import React, { Fragment } from 'react'
import { MDBContainer, MDBBreadcrumb, MDBBreadcrumbItem, } from "mdbreact";
import StokComponent from '../../components/BahanBaku/StokComponent';

export default function StokBahanBaku() {
    return (
        <Fragment>
            <MDBBreadcrumb >
                <MDBBreadcrumbItem><b>Stok Bahan Baku</b></MDBBreadcrumbItem>
            </MDBBreadcrumb>
            <MDBContainer className="mt-0" fluid>
                <StokComponent />
            </MDBContainer>
        </Fragment>
    )
}