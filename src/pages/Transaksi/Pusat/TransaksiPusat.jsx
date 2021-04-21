import React, { Fragment, useState } from 'react'
import { MDBContainer, MDBTypography } from "mdbreact";
import ListPemasukanComponent from '../../../components/Transaksi/TransaksiPusat/ListPemasukanComponent';
import EditPemasukanComponent from '../../../components/Transaksi/TransaksiPusat/EditPemasukanComponent';
import ReviewTransaksi from '../ReviewPemasukan';
export default function TransaksiPusat() {
    const [Goto, setGoto] = useState(0);
    const [data, setData] = useState([]);
    return (
        <Fragment>
            <MDBContainer className="mt-0" fluid>
            {Goto === 1 && <EditPemasukanComponent data={data} Next={() => setGoto(Goto - 1)} />}
                {Goto === 5 && <ReviewTransaksi id={data.id} />}
                {Goto === 0 && <ListPemasukanComponent dataTamp={(value) => setData(value)} Next={() => setGoto(Goto + 1)} NextR={() => setGoto(5)} />}
            </MDBContainer>
        </Fragment>
    )
}
