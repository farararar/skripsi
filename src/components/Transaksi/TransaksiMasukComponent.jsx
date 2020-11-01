import React, { useState, useEffect, useContext } from 'react';
import { Context as AuthContext } from '../../services/Context/AuthContext'
import { Context as CustomerContext } from '../../services/Context/CustomerContext'
import {Context as AccountContext} from '../../services/Context/AccountContext'
import {Context as IncomeContext} from '../../services/Context/IncomeContext'
import {Context as ProductContext} from '../../services/Context/ProductContext'
import { Button, TextField, Select, MenuItem, InputLabel, FormControl, Divider, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, LinearProgress } from '@material-ui/core';
import { MDBCard, MDBCardBody, MDBRow, MDBCol, MDBBtn, MDBBox } from 'mdbreact';
import NumberFormat from 'react-number-format';
import { withRouter } from "react-router-dom";

const TransaksiMasukComponent = (props) => {
    const { isAuthenticated } = useContext(AuthContext)
    const {state:{listAccount}, ListAccount} = useContext(AccountContext)
    const { state:{listCustomer}, ListCustomer } = useContext(CustomerContext)
    const {state:{listProduct}, ListProduct} = useContext(ProductContext)
    const {state, AddIncome} = useContext(IncomeContext)
    const [openDialogApprove, setOpenDialogApprove] = useState(false)
    const [dataTanggal, setDataTanggal] = useState([])
    const [tanggal, setTanggal] = useState('')
    const [bulan, setBulan] = useState('')
    const [ammount, setAmmount] = useState(0)
    const [value, setValue] = useState({
        customer_id: '',
        account_id: '',
        product_id: '',
        invoice_number: '',
        description: '',
        payment_method: '',
        date: '',
        unit: 0,
        unit_price: 0,
        information: ''
    })
    let today = new Date()
    const handleChange = name => event => {
        setValue({
            ...value,
            [name]: event.target.value
        })
        if (name === 'unit_price') {
            let set_ammount = event.target.value * value.unit;
            setAmmount(set_ammount)
        }
        if (name === 'unit') {
            let set_ammount = event.target.value * value.unit_price;
            setAmmount(set_ammount)
        }
    }

    useEffect(() => {
        ListAccount()
        ListCustomer()
        ListProduct()
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
            customer_id: value.customer_id,
            account_id: value.account_id,
            product_id: value.product_id,
            invoice_number: value.invoice_number,
            unit: value.unit,
            unit_price: value.unit_price,
            information: value.information,
            description: value.description,
            payment_method: value.payment_method,
            date: today.getFullYear()+'-'+bulan+'-'+tanggal
        }
        // alert(JSON.stringify(data))
        AddIncome(data, () => setValue({
            customer_id: '',
            account_id: '',
            product_id: '',
            invoice_number: '',
            description: '',
            payment_method: '',
            date: '',
            unit: 0,
            unit_price: 0,
            information: ''
        }))
        setOpenDialogApprove(false)
    }

    return (
        <div>
            {/* {today.getFullYear()} */}
            <h4>Input Transaksi Masuk</h4>
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
                                <TextField fullWidth label="No. Transaksi / Invoice" variant="outlined" margin="normal" value={value.invoice_number} onChange={handleChange('invoice_number')} /><br></br><br></br>
                                <InputLabel>Produk</InputLabel>
                                <Select fullWidth value={value.product_id} onChange={handleChange('product_id')}>
                                    <MenuItem value="">
                                        <em>Pilih Produk</em>
                                    </MenuItem>
                                    {listProduct.map((item, i) => (
                                         <MenuItem key={i} value={item.id}>{item.name}</MenuItem>
                                    ))}
                                </Select>
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
                                    <InputLabel id="demo-simple-select-outlined-label">Pilih Customer</InputLabel>
                                    <Select label="Metode Pembayaran" value={value.customer_id} onChange={handleChange('customer_id')}>
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        {listCustomer.map((item, i) => (
                                            <MenuItem key={i} value={item.id}>{item.name}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>

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

                            </form>
                        </MDBCol>
                        <MDBCol lg="5">
                            {/* <MDBBox display="flex" justifyContent="center">
                                <MDBCardImage className="img-fluid" src="https://docs.devexpress.com/XtraReports/images/invoice-preview.png" style={{ height: 300 }} />
                            </MDBBox> */}
                            {/* <TextField fullWidth label="Pesan" defaultValue="Default Value" variant="outlined" margin="normal" multiline rowsMax={4} /> */}
                            <MDBRow className='m-12'>
                                <MDBCol lg="4">
                                    <TextField fullWidth label="Jumlah Item" defaultValue="Default Value" variant="outlined" margin="normal" type='number' value={value.unit} onChange={handleChange('unit')} />
                                </MDBCol>
                                <MDBCol lg="8">
                                    <TextField fullWidth label="Harga Satuan" defaultValue="Default Value" variant="outlined" margin="normal" type='number' value={value.unit_price} onChange={handleChange('unit_price')} />
                                </MDBCol>
                            </MDBRow>
                            <MDBRow className='mt-3 mb-2'>
                                <MDBCol lg="8" >
                                    <b>TOTAL</b>
                                </MDBCol>
                                <MDBCol lg="4">
                                    <b><NumberFormat value={ammount} displayType={'text'} thousandSeparator={true} prefix={'Rp. '} /></b>
                                </MDBCol>
                            </MDBRow>
                            <Divider /><Divider />
                            <FormControl variant="outlined" margin='normal' fullWidth>
                                <InputLabel id="demo-simple-select-outlined-label">Metode Pembayaran</InputLabel>
                                <Select label="Metode Pembayaran" value={value.payment_method} onChange={handleChange('payment_method')}>
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value='Tunai'>Tunai</MenuItem>
                                    <MenuItem value='Transfer'>Transfer</MenuItem>
                                    <MenuItem value='Pembayaran Uang Muka'>Pembayaran Uang Muka</MenuItem>
                                    <MenuItem value='Pembayaran Bulanan'>Pembayaran Bulanan</MenuItem>
                                    <MenuItem value='Pembayaran Sisa Bulanan'>Transfer</MenuItem>
                                    <MenuItem value='Retur Penjualan'>Retur Penjualan</MenuItem>
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
                                {/* <MDBCol lg="6">
                                    <MDBBox display="flex" justifyContent="start">
                                        <MDBBtn color="danger" >
                                            Batal
                                        </MDBBtn>
                                    </MDBBox>
                                </MDBCol> */}
                            </MDBRow>
                        </MDBCol>
                    </MDBRow>
                </MDBCardBody>
            </MDBCard>
        </div>
    );
};


export default withRouter(TransaksiMasukComponent);
