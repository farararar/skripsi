import React, { Fragment } from 'react'
import { MDBContainer, MDBBreadcrumb, MDBBreadcrumbItem, } from "mdbreact";
import FormEditComponent from '../../components/product/FormEditComponent';



export default function EditProduct() {
    return (
        <Fragment>
            <MDBBreadcrumb >
                <MDBBreadcrumbItem><b>Edit Produk</b></MDBBreadcrumbItem>
            </MDBBreadcrumb>
            <MDBContainer className="mt-0" fluid>
                <FormEditComponent />
            </MDBContainer>
        </Fragment>
    )
}
