import React, { Fragment } from 'react'
import { MDBContainer, MDBBreadcrumb, MDBBreadcrumbItem, } from "mdbreact";
import PanelInformationComponent from '../../components/Dashboard/PanelInformationComponent';
import ChartComponent from '../../components/Dashboard/ChartComponent';

export default function TransaksiPusat(props) {
    return (
        <Fragment>
            <MDBBreadcrumb >
                <MDBBreadcrumbItem ><b>Dashboard | Halaman Utama</b></MDBBreadcrumbItem>
            </MDBBreadcrumb>
            <MDBContainer className="mt-0" fluid>
                <PanelInformationComponent props={props} />
                <ChartComponent props={props} />
            </MDBContainer>
        </Fragment>
    )
}
