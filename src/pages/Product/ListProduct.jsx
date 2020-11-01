import React, { Fragment } from 'react'
import { MDBContainer, MDBBreadcrumb, MDBBreadcrumbItem, } from "mdbreact";
import ListComponent from '../../components/product//ListComponent';

export default function ListProduct() {
    return (
        <Fragment>
            <MDBBreadcrumb >
                <MDBBreadcrumbItem><b>Daftar Produk</b></MDBBreadcrumbItem>
            </MDBBreadcrumb>
            <MDBContainer className="mt-0" fluid>
                <ListComponent />
            </MDBContainer>
        </Fragment>
    )
}
