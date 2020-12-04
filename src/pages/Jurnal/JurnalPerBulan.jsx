import React, { Fragment, useState } from 'react'
import { MDBContainer, MDBBreadcrumb, MDBBreadcrumbItem, } from "mdbreact";
import JurnalPerbulanComponent from '../../components/Jurnal/JurnalPerbulanComponent';
import JurnalManualComponent from '../../components/Jurnal/JurnalManualComponent';


export default function JurnalPerbulan(props) {
    const { match: { params } } = props;
    const [Next, setNext] = useState(0);
    const [value, setValue] = useState([])
    return (
        <Fragment>
            <MDBBreadcrumb>
                <MDBBreadcrumbItem MDBBreadcrumbItem><b>Jurnal Perbulan</b></MDBBreadcrumbItem>
            </MDBBreadcrumb>
            <MDBContainer className="mt-0" fluid>
              {Next===0&&<JurnalPerbulanComponent Next={()=>setNext(1)} params = {params} userData={(data)=>setValue(data)} />}
              {Next===1&&<JurnalManualComponent userData={value} status={false} Change={()=>setNext(0)} />}
            </MDBContainer>
        </Fragment>
    )
}
