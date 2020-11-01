import React, { Fragment } from 'react'
import { MDBContainer, MDBBreadcrumb, MDBBreadcrumbItem, } from "mdbreact";
import JurnalPerhariComponent from '../../components/Jurnal/JurnalPerhariComponent';


export default function JurnalPerHari(props) {
    const { match: { params } } = props;
    return (
        <Fragment>
            <MDBBreadcrumb>
                <MDBBreadcrumbItem MDBBreadcrumbItem><b>Jurnal Harian {params.tanggal} </b></MDBBreadcrumbItem>
            </MDBBreadcrumb>
            <MDBContainer className="mt-0" fluid>
                <JurnalPerhariComponent props={props} params={params} />
            </MDBContainer>
        </Fragment>
    )
}
