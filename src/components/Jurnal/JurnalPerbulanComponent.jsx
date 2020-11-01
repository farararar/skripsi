import React, { useState } from 'react';
import { TextField, Select, MenuItem, InputLabel } from '@material-ui/core';
import { MDBCard, MDBCardBody, MDBRow, MDBCol, MDBBtn, MDBBox, MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';

const JurnalPerbulanComponent = () => {
    const [review] = useState(false)
    const [] = useState(false)
    const [] = useState(false)
    const [bulan, setBulan] = useState('')

    return (
        <div>
            <MDBRow>
                <MDBCol lg='9'>
                    <h4>Jurnal Umum | Perbulan</h4>
                </MDBCol>

            </MDBRow>
            <hr className="" />
            <MDBCard className='mb-2'>
                <MDBCardBody className='p-1'>
                    <MDBRow>
                        <MDBCol lg="2" className='ml-4'>
                            <InputLabel>Bulan</InputLabel>
                            <Select fullWidth value={bulan} onChange={(event) => setBulan(event.target.value)}>
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
            <MDBCard className='mb-2'>
                <MDBCardBody className='p-1'>
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
                            <tr>
                                <td>1</td>
                                <td><b>1001</b></td>
                                <td>Kas</td>
                                <td>-</td>
                                <td>50.000.000</td>
                                <td>-</td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td><b>1002</b></td>
                                <td>Modal</td>
                                <td>-</td>
                                <td>-</td>
                                <td>20.000.000</td>
                            </tr>
                            {/* <tr color="primary-color">
                                    <th colspan="6">No. Transaksi : <b>PUSAT/IN/PEN/001/10-2020</b></th>
                                </tr> */}
                            <tr>
                                <td>3</td>
                                <td><b>1002</b></td>
                                <td>Peralatan</td>
                                <td>-</td>
                                <td>1.000.000</td>
                                <td>-</td>
                            </tr>
                            <tr>
                                <td>4</td>
                                <td><b>1002</b></td>
                                <td>Modal</td>
                                <td>-</td>
                                <td>-</td>
                                <td>2.000.000</td>
                            </tr>
                        </MDBTableBody>
                    </MDBTable>
                    <hr></hr>
                    <MDBRow className='mx-3'>
                        <MDBCol lg="9">
                            <h5 className="pt-2 mx-2">
                                <small>TOTAL DEBIT</small><br></br>
                                <small>TOTAL KREDIT</small>
                            </h5>
                        </MDBCol>
                        <MDBCol lg="3">
                            <MDBBox display='flex' justifyContent="start">
                                <h5 className="pt-2 mx-2">
                                    <small><b>Rp. 52.000.000</b></small><br></br>
                                    <small><b>Rp. 52.000.000</b></small>
                                </h5>
                            </MDBBox>
                        </MDBCol>
                    </MDBRow>
                    <hr></hr>
                    {review && (
                        <MDBRow className='mx-3'>
                            <MDBCol lg="6">
                                <TextField fullWidth label="Memo" defaultValue="Default Value" variant="outlined" margin="normal" multiline rows={3} rowsMax={4} />
                                <MDBBtn color="dark-green" gradient="blue" >
                                    Simpan
                                    </MDBBtn>
                            </MDBCol>
                        </MDBRow>
                    )}
                </MDBCardBody>
            </MDBCard>

        </div>
    );
}

export default JurnalPerbulanComponent;
