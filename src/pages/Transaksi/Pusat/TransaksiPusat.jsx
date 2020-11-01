import React, { Fragment } from 'react'
import { MDBContainer, MDBTypography } from "mdbreact";
import ListTransaksiComponent from '../../../components/Transaksi/TransaksiPusat/ListTransaksiComponent';

export default function TransaksiPusat() {
    return (
        <Fragment>
            <MDBTypography tag='h2' className="mt-4 mx-4"><b>List Transaksi Pusat</b></MDBTypography>
            <MDBContainer className="mt-0" fluid>
                <ListTransaksiComponent />
            </MDBContainer>
        </Fragment>
    )
}
