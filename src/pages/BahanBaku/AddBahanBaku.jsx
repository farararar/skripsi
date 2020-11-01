import React, { Fragment, useState, useContext } from 'react'
import { MDBContainer, MDBBreadcrumb, MDBBreadcrumbItem, } from "mdbreact";
import FormComponent from '../../components/BahanBaku/FormComponent';

export default function AddBahanBaku() {
    return (
        <Fragment>
            <MDBBreadcrumb >
                <MDBBreadcrumbItem><b>Tambah Bahan Baku</b></MDBBreadcrumbItem>
            </MDBBreadcrumb>
            <MDBContainer className="mt-0" fluid>
                <FormComponent />
            </MDBContainer>
        </Fragment>
    )
}
