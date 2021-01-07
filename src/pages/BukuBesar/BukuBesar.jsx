import React, { Fragment } from 'react'
import { MDBContainer, MDBBreadcrumb, MDBBreadcrumbItem, } from "mdbreact";
import BukuBesarComponent from '../../components/BukuBesar/BukuBesarComponent';



export default function BukuBesar() {
    return (
        <Fragment>
            <MDBBreadcrumb >
                <MDBBreadcrumbItem><b>Buku Besar</b></MDBBreadcrumbItem>
            </MDBBreadcrumb>
            <MDBContainer className="mt-0" fluid>
                <BukuBesarComponent />
            </MDBContainer>
        </Fragment>
    )
}
