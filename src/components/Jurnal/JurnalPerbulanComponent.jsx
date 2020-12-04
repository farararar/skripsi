import React, { useState, useEffect, useContext } from "react";
import { TextField, Select, MenuItem, InputLabel } from "@material-ui/core";
import {
  MDBCard,
  MDBCardBody,
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBBox,
  MDBTable,
  MDBTableBody,
  MDBTableHead,
} from "mdbreact";
import { Context as JournalContext } from "../../services/Context/JournalContext";

const JurnalPerbulanComponent = () => {
  const [review] = useState(false);
  const [] = useState(false);
  const [] = useState(false);
  const [bulan, setBulan] = useState(0);
  const { state, GetDailyJournal } = useContext(JournalContext);
const [debit, setDebit] = useState(0)
const [kredit, setKredit] = useState(0)
  useEffect(() => {
    var d = new Date();
    var n = d.getFullYear();
    GetDailyJournal(`${n}/${bulan}`);
  }, [bulan]);

  useEffect(() => {
    var d = 0, c = 0
    state.listJournalDaily.map((res)=>{
        d+=Number(res.debit)
        c+=Number(res.credit)
    })
    setDebit(d)
    setKredit(c)
  }, [state.listJournalDaily]);

  return (
    <div>
      <MDBRow>
        <MDBCol lg="9">
          <h4>Jurnal Umum | Perbulan</h4>
        </MDBCol>
      </MDBRow>
      <hr className="" />
      <MDBCard className="mb-2">
        <MDBCardBody className="p-1">
          <MDBRow>
            <MDBCol lg="2" className="ml-4">
              <InputLabel>Bulan</InputLabel>
              <Select
                fullWidth
                value={bulan}
                onChange={(event) => setBulan(event.target.value)}
              >
                <MenuItem value="">
                  <em>Pilih Bulan</em>
                </MenuItem>
                <MenuItem value={1}>Januari</MenuItem>
                <MenuItem value={2}>Pebruari</MenuItem>
                <MenuItem value={3}>Maret</MenuItem>
                <MenuItem value={4}>April</MenuItem>
                <MenuItem value={5}>Mei</MenuItem>
                <MenuItem value={6}>Juni</MenuItem>
                <MenuItem value={7}>Juli</MenuItem>
                <MenuItem value={8}>Agustus</MenuItem>
                <MenuItem value={9}>September</MenuItem>
                <MenuItem value={10}>Oktober</MenuItem>
                <MenuItem value={11}>Nopember</MenuItem>
                <MenuItem value={12}>Desember</MenuItem>
              </Select>
            </MDBCol>
            <MDBCol lg="3">
              <h5 className="pt-2 mx-2">
                Bulan Transaksi<br></br>
                <smal>Silahkan Pilih Bulan</smal>
              </h5>
            </MDBCol>
            <MDBCol lg="3">
              <h5 className="pt-2 mx-2">
                Status<br></br>
                ............
              </h5>
            </MDBCol>
            <MDBCol lg="3">
              <h5 className="pt-2 mx-2">
                Diperiksa Oleh<br></br>
                ..........
              </h5>
            </MDBCol>
          </MDBRow>
        </MDBCardBody>
      </MDBCard>
      <MDBCard className="mb-2">
        <MDBCardBody className="p-1">
          {/* <MDBRow className='m-3'>
                            <h5 className="pt-2 mx-2">
                                Tanggal Transaksi<br></br>
                                <small>11/07/2020</small>
                            </h5>
                        </MDBRow> */}
          <MDBTable>
            <MDBTableHead color="primary-color" textWhite>
              <tr>
                <th>#</th>
                <th>NO. REFERENSI</th>
                <th>AKUN</th>
                <th>DESKRIPSI</th>
                <th>KREDIT(Rp.)</th>
                <th>DEBIT(Rp.)</th>
              </tr>
            </MDBTableHead>
            <MDBTableBody>
              {state &&
                state.listJournalDaily.map((res) => {
                    
                  return (
                    <>
                      <tr>
                        <td>{res.account_id}</td>
                        <td>
                          <b>{res.jreview_id}</b>
                        </td>
                        <td>{res.review.memo}</td>
                        <td>{res.description}</td>
                        <td>{res.credit}</td>
                        <td>{res.debit}</td>
                      </tr>
                    </>
                  );
                })}
            </MDBTableBody>
          </MDBTable>
          <hr></hr>
          <MDBRow className="mx-3">
            <MDBCol lg="9">
              <h5 className="pt-2 mx-2">
                <small>TOTAL DEBIT</small>
                <br></br>
                <small>TOTAL KREDIT</small>
              </h5>
            </MDBCol>
            <MDBCol lg="3">
              <MDBBox display="flex" justifyContent="start">
                <h5 className="pt-2 mx-2">
                  <small>
                    <b>Rp. {debit}</b>
                  </small>
                  <br></br>
                  <small>
                    <b>Rp. {kredit}</b>
                  </small>
                </h5>
              </MDBBox>
            </MDBCol>
          </MDBRow>
          <hr></hr>
          {review && (
            <MDBRow className="mx-3">
              <MDBCol lg="6">
                <TextField
                  fullWidth
                  label="Memo"
                  defaultValue="Default Value"
                  variant="outlined"
                  margin="normal"
                  multiline
                  rows={3}
                  rowsMax={4}
                />
                <MDBBtn color="dark-green" gradient="blue">
                  Simpan
                </MDBBtn>
              </MDBCol>
            </MDBRow>
          )}
        </MDBCardBody>
      </MDBCard>
    </div>
  );
};

export default JurnalPerbulanComponent;
