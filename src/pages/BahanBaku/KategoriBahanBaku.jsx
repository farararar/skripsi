import React, { Fragment } from 'react'
import { MDBContainer, MDBBreadcrumb, MDBBreadcrumbItem, } from "mdbreact";
import FormComponent from '../../components/BahanBaku/kategori/FormComponent';
import ListComponent from '../../components/BahanBaku/kategori/ListComponent';




export default function KategoriBahanBaku() {
    return (
        <Fragment>
            <MDBBreadcrumb >
                <MDBBreadcrumbItem><b>Kategori Bahan Baku</b></MDBBreadcrumbItem>
            </MDBBreadcrumb>
            <MDBContainer className="mt-0" fluid>
                <FormComponent />
                <ListComponent />
            </MDBContainer>
        </Fragment>
    )
}
