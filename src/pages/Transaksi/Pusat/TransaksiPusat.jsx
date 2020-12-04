import React, { Fragment, useState } from 'react'
import { MDBContainer, MDBTypography } from "mdbreact";
import ListTransaksiComponent from '../../../components/Transaksi/TransaksiPusat/ListTransaksiComponent';
import EditTransaksiComponent from '../../../components/Transaksi/TransaksiPusat/EditTransaksiComponent';
import ReviewTransaksi from '../../../pages/Transaksi/ReviewTransaksi';
export default function TransaksiPusat() {
    const [Goto, setGoto] = useState(0);
    const [data, setData] = useState([]);
    return (
        <Fragment>
            <MDBTypography tag='h2' className="mt-4 mx-4"><b>List Transaksi Pusat</b></MDBTypography>
            <MDBContainer className="mt-0" fluid>
                {Goto===5&&<ReviewTransaksi id={data.id} />}
                {Goto===0&&<ListTransaksiComponent dataTamp={(value)=>setData(value)} Next={()=>setGoto(Goto+1)} NextR={()=>setGoto(5)} />}
                {Goto===2&&<EditTransaksiComponent data={data} Next={()=>setGoto(Goto-1)} />}
                
            </MDBContainer>
        </Fragment>
    )
}
