import React, { Fragment, useState } from 'react'
import { MDBContainer, MDBBreadcrumb, MDBBreadcrumbItem, } from "mdbreact";
import TransaksiKeluarComponent from '../../../components/Transaksi/Pengeluaran/TransaksiKeluarComponent'
import ReviewTransaksiKeluar from './ReviewPengeluaran'
import EditPengeluaranComponent from '../../../components/Transaksi/Pengeluaran/EditPengeluaranComponent'

export default function TransaksiKeluar(props) {
    const [Goto, setGoto] = useState(0);
    const [data, setData] = useState([]);
    return (
        <Fragment>
            <MDBBreadcrumb >
                <MDBBreadcrumbItem><b>Transaksi Keluar</b></MDBBreadcrumbItem>
            </MDBBreadcrumb>
            <MDBContainer className="mt-0" fluid>
                {Goto === 5 && <ReviewTransaksiKeluar id={data.id} />}
                {Goto === 0 && <TransaksiKeluarComponent dataTamp={(value) => setData(value)} Next={() => setGoto(Goto + 1)} NextR={() => setGoto(5)} />}
                {Goto === 1 && <EditPengeluaranComponent data={data} Next={() => setGoto(Goto - 1)} />}
            </MDBContainer>
        </Fragment>
    )
}
