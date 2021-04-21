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
import { Context as AuthContext } from "../../services/Context/AuthContext";
import { Context as JournalContext } from "../../services/Context/JournalContext";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import NumberFormat from 'react-number-format';

var d = new Date();
const JurnalPerbulanComponent = ({ Next, userData, params }) => {
  const { isAuthenticated } = useContext(AuthContext);
  const [review] = useState(false);
  const [] = useState(false);
  const [memo, setMemo] = useState("");
  const [] = useState(false);
  const [bulan, setBulan] = useState(0);
  const [tahun, setTahun] = useState(d.getFullYear());
  const { state, GetDailyJournal, PostingJournal, DeleteJournal } = useContext(JournalContext);
  const [debit, setDebit] = useState(0);
  const [kredit, setKredit] = useState(0);
  const [date, setDate] = useState(params.tanggal);
  useEffect(() => {
    // var d = new Date();
    // var n = d.getFullYear();
    GetDailyJournal(`${tahun}/${bulan}`);
  }, [bulan, tahun]);

  useEffect(() => {
    console.log('add = ', state);
    setMemo(state.additionalData.review ? state.additionalData.review.memo : '')
  }, [state.additionalData]);

  const [years, setYears] = useState([]);

  useEffect(() => {
    var d = 0,
      c = 0;
    state.listJournalDaily.map((res) => {
      d += Number(res.debit);
      c += Number(res.credit);
    });
    setDebit(d);
    setKredit(c);
  }, [state.listJournalDaily]);

  useEffect(() => {
    const now = new Date().getUTCFullYear();
    const years = Array(now - (now - 20))
      .fill("")
      .map((v, idx) => now - idx);
    setYears(years);
  }, []);

  const handleDelete = (id) => {
    DeleteJournal(id, () => GetDailyJournal(`${tahun}/${bulan}`))
  }
  const handleEdit = (data) => {
    Next()
    userData(data)
  }

  const handleSave = () => {
    if (state.listJournalDaily.length > 0) {
      // setSave(true);
      // alert('Silahkan untuk melanjutkan posting!')
      let data = {
        reviewer_id: isAuthenticated().data.id,
        memo: memo,
        year: tahun,
        month: bulan
      };
      PostingJournal(data, 'monthly');
    } else {
      alert("Tidak tersedia data jurnal untuk tanggal yang dipilih!");
    }
  };

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
                <MenuItem value="01">Januari</MenuItem>
                <MenuItem value="02">Pebruari</MenuItem>
                <MenuItem value="03">Maret</MenuItem>
                <MenuItem value="04">April</MenuItem>
                <MenuItem value="05">Mei</MenuItem>
                <MenuItem value="06">Juni</MenuItem>
                <MenuItem value="07">Juli</MenuItem>
                <MenuItem value="08">Agustus</MenuItem>
                <MenuItem value="09">September</MenuItem>
                <MenuItem value="10">Oktober</MenuItem>
                <MenuItem value="11">Nopember</MenuItem>
                <MenuItem value="12">Desember</MenuItem>
              </Select>
            </MDBCol>
            <MDBCol lg="2" className="ml-4">
              <InputLabel>Tahun</InputLabel>
              <Select
                fullWidth
                value={tahun}
                onChange={(event) => setTahun(event.target.value)}
              >
                <MenuItem value="">
                  <em>Pilih Bulan</em>
                </MenuItem>
                {years.map((res, index) => (
                  <MenuItem value={res}>{res}</MenuItem>
                ))}
              </Select>
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
                <th>Action</th>
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
                          <b>{res.account.reference_number}</b>
                        </td>
                        <td>{res.account.name}</td>
                        <td>{res.description}</td>
                        <td><NumberFormat value={res.credit} displayType={'text'} thousandSeparator={true} prefix={'Rp. '} style={{color:'green'}}/></td>
                        <td><NumberFormat value={res.debit} displayType={'text'} thousandSeparator={true} prefix={'Rp. '} style={{color:'red'}}/></td>
                        <td>
                          {
                            res.review_bulanan == 0 &&
                            <>

                              <EditIcon
                                color="dark-green"
                                size="sm"
                                style={{ color: "green", margin: "10px" }}
                                onClick={() => handleEdit(res)}
                              />
                              <DeleteIcon
                                color="red"
                                // size="sm"
                                style={{ color: "red", margin: "10px" }}
                                onClick={() => handleDelete(res.id)}
                              /></>
                          }
                        </td>
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
                  <b> <NumberFormat value = {debit} displayType={'text'} thousandSeparator={true} prefix={'Rp. '}  /> </b>
                  </small>
                  <br></br>
                  <small>
                 <b><NumberFormat value={kredit} displayType={'text'} thousandSeparator={true} prefix={'Rp. '}/> </b>
                  </small>
                </h5>
              </MDBBox>
            </MDBCol>
          </MDBRow>
          <hr></hr>
          {false && state.listJournalDaily.length > 0 && (
            <MDBRow className="mx-3">
              <MDBCol lg="6">
                <TextField
                  fullWidth
                  label="Memo"
                  // defaultValue="Default Value"
                  variant="outlined"
                  margin="normal"
                  multiline
                  rows={3}
                  value={memo}
                  rowsMax={4}
                  onChange={(e) => setMemo(e.target.value)}
                />
                <MDBBtn color="dark-green" gradient="blue" onClick={handleSave} >
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
