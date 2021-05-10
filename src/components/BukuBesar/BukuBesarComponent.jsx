import React, { useState, useContext, useEffect } from 'react';
import { Context as LedgerContext } from '../../services/Context/LedgerContext'
import { Context as AccountContext } from '../../services/Context/AccountContext'
import { MDBCard, MDBCardBody, MDBRow, MDBCol, MDBBtn, MDBIcon, MDBBox, MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';
import { InputLabel, Select, MenuItem, LinearProgress } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import moment from 'moment'
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import NumberFormat from 'react-number-format';

const BukuBesarComponent = ({ }) => {
    const { state: { listAccount }, ListAccount } = useContext(AccountContext)
    const { state, ListLedger } = useContext(LedgerContext)
    const [] = useState(false)
    const [] = useState(false)
    const [] = useState(false)
    const [selectedDate, setSelectedDate] = useState();
    const [selectedDate2, setSelectedDate2] = useState();
    const [] = useState('')
    const [value, setValue] = useState({
        account_id: '',
        start_date: '',
        end_date: ''
    })

    useEffect(() => {
        ListAccount()
        return () => {
        };
    }, []);

    const handleSelectAccount = (e) => {
        // alert(JSON.stringify(e))
        setValue({
            ...value,
            account_id: e
        })
    }

    const handleDateChange = (date) => {
        let formattedDate = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()
        setSelectedDate(date);
        setValue({
            ...value,
            start_date: date
        })
    }

    const handleDateChange2 = (date) => {
        let formattedDate2 = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()
        setSelectedDate2(date);
        setValue({
            ...value,
            end_date: date
        })
    }

    const handleFilter = () => {
        if (value.account_id === '' || value.start_date === '' || value.end_date === '') {
            alert('Pilih Jenis Akun & Tentukan Rentang Tanggal Transaksi!')
        } else {
            let data = {
                account_id: value.account_id,
                month: value.start_date.getMonth() + 1,
                year: value.end_date.getFullYear()
            }
            console.log('data = ', data);
            ListLedger(data)
            console.log(state.listLedger)
            // alert(JSON.stringify(state.listLedger))
        }

    }

    return (
        <div>
            {/* {JSON.stringify(state.listLedger)} */}
            <MDBRow>
                <MDBCol lg='9'>
                    <h4>Catatan Buku Besar</h4>
                </MDBCol>
                <MDBCol lg='3'>
                    <MDBBox display="flex" justifyContent="center">

                    </MDBBox>
                </MDBCol>
            </MDBRow>
            <hr className="" />
            <MDBCard className='mb-2'>
                <MDBCardBody className='p-1'>
                    <MDBRow>
                        <MDBCol lg="2">
                            <InputLabel className="pt-2 mx-2">Jenis Akun</InputLabel>
                            <Select fullWidth className=" mx-2" onChange={(e) => handleSelectAccount(e.target.value)}>
                                <MenuItem value="">
                                    <em>Pilih Jenis Akun</em>
                                </MenuItem>
                                {listAccount.map((item) => (
                                    <MenuItem value={item.id}>{item.name}</MenuItem>
                                ))}
                            </Select>
                        </MDBCol>
                        <MDBCol lg="2">
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <Grid container justify="space-around">
                                    <KeyboardDatePicker
                                        margin="normal"
                                        id="date-picker-dialog"
                                        label="Pilih bulan"
                                        format="MMMM"
                                        value={selectedDate}
                                        views={["month"]}
                                        onChange={handleDateChange}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change date',
                                        }}
                                    />
                                </Grid>
                            </MuiPickersUtilsProvider>
                        </MDBCol>
                        <MDBCol lg="2">
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <Grid container justify="space-around">
                                    <KeyboardDatePicker
                                        margin="normal"
                                        id="date-picker-dialog"
                                        label="Pilih tahun"
                                        // format="dd/MM/yyyy"
                                        views={["year"]}
                                        value={selectedDate2}
                                        onChange={handleDateChange2}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change date',
                                        }}
                                    />
                                </Grid>
                            </MuiPickersUtilsProvider>
                        </MDBCol>
                        <MDBCol lg="3">
                            <MDBRow className="pt-2 mx-2">
                                <MDBBtn color="dark-green" gradient="blue" onClick={handleFilter}>
                                    Tampilkan <MDBIcon icon="filter" className="ml-1" />
                                </MDBBtn>
                            </MDBRow>
                        </MDBCol>
                    </MDBRow>
                </MDBCardBody>
                {state.loading && (
                    <LinearProgress />
                )}
            </MDBCard>

            {state.listLedger && (
                <MDBCard className='mb-2'>
                    <MDBCardBody className='p-1'>
                        <MDBTable>
                            <MDBTableHead color="primary-color" textWhite>
                                <tr>
                                    <th>#</th>
                                    <th>Tanggal</th>
                                    <th>NO. TRANSAKSI</th>
                                    <th>RINCIAN / DESKRIPSI</th>
                                    <th>DEBIT(Rp.)</th>
                                    <th>KREDIT(Rp.)</th>
                                    <th>SALDO DEBIT(Rp.)</th>
                                    <th>SALDO KREDIT(Rp.)</th>
                                </tr>
                            </MDBTableHead>
                            <MDBTableBody>
                                {state.listLedger && state.listLedger.map((item, i) => (
                                    <tr>
                                        <td>{i + 1}</td>
                                        <td> {item.Tanggal} </td>
                                        <td><b>{item.invoice_number}</b></td>
                                        <td>{item.description}</td>
                                        <td> {item.Debet} </td>
                                        <td>{item.Kredit}</td>
                                        <td><b>{item['Saldo Debet']}  </b></td>
                                        <td><b>{item['Saldo Kredit']}  </b></td>
                                    </tr>
                                ))}
                            </MDBTableBody>
                        </MDBTable>
                    </MDBCardBody>
                </MDBCard>
            )}
        </div>
    );
}

export default BukuBesarComponent;
