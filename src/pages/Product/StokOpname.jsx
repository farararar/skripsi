import React, { Fragment } from 'react'
import { MDBContainer, MDBBreadcrumb, MDBBreadcrumbItem, } from "mdbreact";
import ListComponent from '../../components/StockOpname/ListComponent';


export default function StockOpname() {
    return (
        <Fragment>
            <MDBBreadcrumb >
                <MDBBreadcrumbItem><b>Stock Opname Produk</b></MDBBreadcrumbItem>
            </MDBBreadcrumb>
            <MDBContainer className="mt-0" fluid>
                <ListComponent />
            </MDBContainer>
        </Fragment>
    )
}
