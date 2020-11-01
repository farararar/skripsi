import React, { Fragment } from 'react'
import { MDBContainer, MDBBreadcrumb, MDBBreadcrumbItem, } from "mdbreact";
import ListComponent from '../../components/ProductProccess/ListComponent';


export default function ProccessProduct() {
    return (
        <Fragment>
            <MDBBreadcrumb >
                <MDBBreadcrumbItem><b>Produk Dalam Proses</b></MDBBreadcrumbItem>
            </MDBBreadcrumb>
            <MDBContainer className="mt-0" fluid>
                <ListComponent />
            </MDBContainer>
        </Fragment>
    )
}
