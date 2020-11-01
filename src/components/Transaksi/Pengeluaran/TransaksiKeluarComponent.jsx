import React, { useState, useEffect, useContext } from 'react';
import { Context as AuthContext } from '../../../services/Context/AuthContext'
import {Context as AccountContext} from '../../../services/Context/AccountContext'
import {Context as OutcomeContext} from '../../../services/Context/OutcomeContext'
import { Button, TextField, Select, MenuItem, InputLabel, FormControl, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, LinearProgress } from '@material-ui/core';
import { MDBCard, MDBCardBody, MDBRow, MDBCol, MDBBtn, MDBBox } from 'mdbreact';
import { withRouter } from "react-router-dom";

const TransaksiKeluarComponent = (props) => {
    const { isAuthenticated } = useContext(AuthContext)
    const {state:{listAccount}, ListAccount} = useContext(AccountContext)
    const {state, ListOutcomeTypeBy, AddOutcome} = useContext(OutcomeContext)
    const [openDialogApprove, setOpenDialogApprove] = useState(false)
    const [dataTanggal, setDataTanggal] = useState([])
    const [tanggal, setTanggal] = useState('')
    const [bulan, setBulan] = useState('')
    const [typeOutcome, setTypeOutcome] = useState('')
    const [value, setValue] = useState({
        account_id: '',
        outcome_type_id: '',
        invoice_number: '',
        description: '',
        payment_method: '',
        date: '',
        ammount: '',
        information: ''
    })
    let today = new Date()

    const handleChange = name => event => {
        setValue({
            ...value,
            [name]: event.target.value
        })
    }

    const handleChangeTypeOutcome = (value) => {
        setTypeOutcome(value)
        return ListOutcomeTypeBy(value)
    }

    useEffect(() => {
        ListAccount()
        const loopingTanggal = () => {
            let tanggal = '';
            let data_tanggal = [];
            for (tanggal = 1; tanggal <= 31; tanggal++) {
                data_tanggal.push({ 'tanggal': `${tanggal}` })
            }
            setDataTanggal(data_tanggal)
        }
        loopingTanggal()
    }, []);


    const dialogApprove = () => (
        <Dialog open={openDialogApprove} onClose={handleApproveCancle} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
            <DialogTitle id="alert-dialog-title">{"Simpan Transakasi?"}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Sebelum menyimpan transaksi, pastikan inputan sudah benar agar transakasi anda tidak di tolak oleh pihak Akuntan!
          </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleApproveCancle} color="secondary">
                    Batal
                </Button>
                <Button onClick={handleApproveProccess} color="primary" autoFocus disabled={state.loading}>
                    {state.loading?state.message:'Simpan Transaksi'}
                </Button>
            </DialogActions>
        </Dialog>
    )

    const handleApproveDialog = () => {
        setOpenDialogApprove(true)
    }

    const handleApproveCancle = () => {
        setOpenDialogApprove(false)
    }

    const handleApproveProccess = () => {
        let data = {
            user_id: isAuthenticated().data.id,
            outcometype_id: value.outcome_type_id,
            account_id: value.account_id,
            invoice_number: value.invoice_number,
            ammount: value.ammount,
            information: value.information,
            description: value.description,
            payment_method: value.payment_method,
            date: today.getFullYear()+'-'+bulan+'-'+tanggal
        }
        AddOutcome(data, () => setValue({
            outcometype_id: '',
            account_id: '',
            invoice_number: '',
            ammount: '',
            information: '',
            description: '',
            payment_method: '',
            date: ''
        }))
        // alert(JSON.stringify(data))
        setOpenDialogApprove(false)
    }

    return (
        <div>
            {/* {today.getFullYear()} */}
            {/* {JSON.stringify(listOutcomeType)} */}
            <h4>Input Transaksi Keluar</h4>
            <hr className="" />
            <MDBCard className='mb-2'>
                {dialogApprove()}
                {state.loading && (
                    <LinearProgress />
                )}
                <MDBCardBody className='p-1'>
                    <MDBRow className='m-3'>
                        <MDBCol lg="7">
                            <form>
                                <TextField fullWidth label="No. Transaksi / Invoice" variant="outlined" margin="normal" value={value.invoice_number} onChange={handleChange('invoice_number')} /><br></br>
                                <TextField fullWidth label="Deskripsi Transaksi" variant="outlined" margin="normal" multiline rowsMax={4} value={value.description} onChange={handleChange('description')} /><br></br>
                                <br></br>
                                <MDBRow className='m-12'>
                                    <MDBCol lg="4">
                                        <InputLabel>Tanggal</InputLabel>
                                        <Select fullWidth value={tanggal} onChange={(event) => setTanggal(event.target.value)}>
                                            <MenuItem value="">
                                                <em>Pilih Tanggal</em>
                                            </MenuItem>
                                            {dataTanggal.map((item) => (
                                                <MenuItem key={item.tanggal} value={item.tanggal}>{item.tanggal}</MenuItem>
                                            ))}
                                        </Select>
                                    </MDBCol>
                                    <MDBCol lg="4">
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
                                    <MDBCol lg="4">
                                        <InputLabel>Tahun</InputLabel>
                                        <Select fullWidth value={2020}>
                                            <MenuItem value={2020}>
                                                <em>2020</em>
                                            </MenuItem>
                                        </Select>
                                    </MDBCol>
                                </MDBRow><br></br>
                                <FormControl variant="outlined" margin='normal' fullWidth>
                                    <InputLabel id="demo-simple-select-outlined-label">Jenis Akun</InputLabel>
                                    <Select label="Metode Pembayaran" value={value.account_id} onChange={handleChange('account_id')}>
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        {listAccount.map((item, i) => (
                                            <MenuItem key={i} value={item.id}>{item.name}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                <MDBRow className='m-12'>
                                    <MDBCol lg="12">
                                        <TextField fullWidth label="Jumlah Pengeluaran" defaultValue="Default Value" variant="outlined" margin="normal" type='number' value={value.ammount} onChange={handleChange('ammount')} />
                                    </MDBCol>
                                </MDBRow>
                            </form>
                        </MDBCol>
                        <MDBCol lg="5">
                            <FormControl variant="outlined" margin='normal' fullWidth>
                                <InputLabel id="demo-simple-select-outlined-label">Tipe Jenis Pengeluaran</InputLabel>
                                <Select label="Metode Pembayaran" value={typeOutcome} onChange={(e) => handleChangeTypeOutcome(e.target.value)}>
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value='Logistik'>Logistik</MenuItem>
                                    <MenuItem value='Operasional-Perusahaan'>Operasional Perusahaan</MenuItem>
                                </Select>
                            </FormControl>
                            <MDBRow className='m-12'>
                                <MDBCol lg="12">
                                    <FormControl variant="outlined" margin='normal' fullWidth>
                                        <InputLabel id="demo-simple-select-outlined-label">Jenis Pengeluaran</InputLabel>
                                        <Select label="Metode Pembayaran" value={value.outcome_type_id} onChange={handleChange('outcome_type_id')}>
                                            {
                                                typeOutcome === ''?
                                                <MenuItem value=""><em>Pilih Jenis Akun Terlebih Dahulu</em></MenuItem>:
                                                <MenuItem value=""><em>None</em></MenuItem>
                                            }
                                            {state.listOutcomeType.map((item, i) => (
                                                <MenuItem key={i} value={item.id}>{item.name}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </MDBCol>
                            </MDBRow>
                            <FormControl variant="outlined" margin='normal' fullWidth>
                                <InputLabel id="demo-simple-select-outlined-label">Metode Pembayaran</InputLabel>
                                <Select label="Metode Pembayaran" value={value.payment_method} onChange={handleChange('payment_method')}>
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value='Cash'>Tunai</MenuItem>
                                    <MenuItem value='Transfer'>Transfer</MenuItem>
                                </Select>
                            </FormControl>
                            <TextField fullWidth label="Keterangan" variant="outlined" margin="normal" multiline rows={3} rowsMax={5} value={value.information} onChange={handleChange('information')} />
                            <MDBRow className='mt-3 mb-2'>
                                <MDBCol lg="12" >
                                    <MDBBox display="flex" justifyContent="end">
                                        <MDBBtn color="dark-green" onClick={() => handleApproveDialog('approve')} disabled={state.loading}>
                                            Simpan Transaksi
                                        </MDBBtn>
                                    </MDBBox>
                                </MDBCol>
                            </MDBRow>
                        </MDBCol>
                    </MDBRow>
                </MDBCardBody>
            </MDBCard>
        </div>
    );
};


export default withRouter(TransaksiKeluarComponent);