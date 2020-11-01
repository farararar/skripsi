import React, { Fragment } from 'react'
import { MDBContainer, MDBBreadcrumb, MDBBreadcrumbItem, } from "mdbreact";
import ListComponent from '../../components/BahanBaku/ListComponent';



export default function ListBahanBaku() {
    return (
        <Fragment>
            <MDBBreadcrumb >
                <MDBBreadcrumbItem><b>List Bahan Baku</b></MDBBreadcrumbItem>
            </MDBBreadcrumb>
            <MDBContainer className="mt-0" fluid>
                <ListComponent />
            </MDBContainer>
        </Fragment>
    )
}
