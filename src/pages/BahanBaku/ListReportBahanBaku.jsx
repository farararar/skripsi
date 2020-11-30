import React, { Fragment } from 'react'
import { MDBContainer, MDBBreadcrumb, MDBBreadcrumbItem, } from "mdbreact";
import ListReportComponent from '../../components/BahanBaku/ListReportComponent';



export default function ListBahanBaku() {
    return (
        <Fragment>
            <MDBBreadcrumb >
                <MDBBreadcrumbItem><b>List Bahan Baku</b></MDBBreadcrumbItem>
            </MDBBreadcrumb>
            <MDBContainer className="mt-0" fluid>
                <ListReportComponent />
            </MDBContainer>
        </Fragment>
    )
}