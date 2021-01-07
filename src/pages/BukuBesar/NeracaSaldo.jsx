import React, { Fragment } from 'react'
import { MDBContainer, MDBBreadcrumb, MDBBreadcrumbItem, } from "mdbreact";
import NeracaSaldoComponent from '../../components/BukuBesar/NeracaSaldoComponent';



export default function NeracaSaldo() {
    return (
        <Fragment>
            <MDBBreadcrumb >
                <MDBBreadcrumbItem><b>Neraca Saldo</b></MDBBreadcrumbItem>
            </MDBBreadcrumb>
            <MDBContainer className="mt-0" fluid>
                <NeracaSaldoComponent />
            </MDBContainer>
        </Fragment>
    )
}
