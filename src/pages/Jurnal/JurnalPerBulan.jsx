import React, { Fragment } from 'react'
import { MDBContainer, MDBBreadcrumb, MDBBreadcrumbItem, } from "mdbreact";
import JurnalPerbulanComponent from '../../components/Jurnal/JurnalPerbulanComponent';



export default function JurnalPerbulan(props) {
    const { match: { params } } = props;
    return (
        <Fragment>
            <MDBBreadcrumb>
                <MDBBreadcrumbItem MDBBreadcrumbItem><b>Jurnal Perbulan</b></MDBBreadcrumbItem>
            </MDBBreadcrumb>
            <MDBContainer className="mt-0" fluid>
              <JurnalPerbulanComponent />
            </MDBContainer>
        </Fragment>
    )
}
