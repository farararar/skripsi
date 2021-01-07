import React, { Fragment, useEffect, useContext } from 'react'
import { MDBContainer, MDBBreadcrumb, MDBBreadcrumbItem, } from "mdbreact";
import PanelInformationComponent from '../../components/Dashboard/PanelInformationComponent';
import ChartComponent from '../../components/Dashboard/ChartComponent';
import {Context as AccountContext} from '../../services/Context/AccountContext';
export default function TransaksiPusat(props) {
    const {
        state,
        Menu
      } = useContext(AccountContext);

      useEffect(()=>{
        Menu();
      },[])
    return (
        <Fragment>
            <MDBBreadcrumb >
                <MDBBreadcrumbItem ><b>Dashboard | Halaman Utama</b></MDBBreadcrumbItem>
            </MDBBreadcrumb>
            <MDBContainer className="mt-0" fluid>
                <PanelInformationComponent props={props} data={state.menu} />
                {JSON.stringify(state.menu)!=='[]'&&<ChartComponent props={props} data={state.menu} />}
            </MDBContainer>
        </Fragment>
    )
}
