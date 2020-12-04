import React, { Fragment, useState } from 'react'
import { MDBContainer, MDBBreadcrumb, MDBBreadcrumbItem, } from "mdbreact";
import JurnalPerhariComponent from '../../components/Jurnal/JurnalPerhariComponent';
import JurnalManualComponent from '../../components/Jurnal/JurnalManualComponent';


export default function JurnalPerHari(props) {
    const { match: { params } } = props;
    const [change, setChange] = useState(true)
    return (
        <Fragment>
            <MDBBreadcrumb>
                <MDBBreadcrumbItem MDBBreadcrumbItem><b>Jurnal Harian {params.tanggal} </b></MDBBreadcrumbItem>
            </MDBBreadcrumb>
            <MDBContainer className="mt-0" fluid>
                {change?
                    <JurnalPerhariComponent props={props} params={params} Change={()=>setChange(!change)} />:
                    <JurnalManualComponent Change={()=>setChange(!change)} />
                }
            </MDBContainer>
        </Fragment>
    )
}
