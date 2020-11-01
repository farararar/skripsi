import React, { useState, useContext, useEffect } from 'react';
import {Context as LedgerContext} from '../../services/Context/LedgerContext'
import {Context as AccountContext} from '../../services/Context/AccountContext'
import { MDBCard, MDBCardBody, MDBRow, MDBCol, MDBBtn, MDBIcon, MDBBox, MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';
import { InputLabel, Select, MenuItem, LinearProgress } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import NumberFormat from 'react-number-format';

const BukuBesarComponent = ({  }) => {
    const {state:{listAccount}, ListAccount} = useContext(AccountContext)
    const {state, ListLedger} = useContext(LedgerContext)
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
            start_date: formattedDate
        })   
    }

    const handleDateChange2 = (date) => {
        let formattedDate2 = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()
        setSelectedDate2(date); 
        setValue({
            ...value,
            end_date: formattedDate2
        }) 
    }

    const handleFilter = () => {
        if(value.account_id===''||value.start_date===''||value.end_date===''){
            alert('Pilih Jenis Akun & Tentukan Rentang Tanggal Transaksi!')
        }else{
            let data = {
                account_id : value.account_id,
                start_date: value.start_date,
                end_date: value.end_date
            }
            ListLedger(data)
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
                        {/* <MDBCol lg="2">
                            <h5 className="pt-2 mx-2">
                                No. Reff.<br></br>
                                <small><i>Pilih Jenis Akun</i></small>
                            </h5>
                        </MDBCol> */}
                        <MDBCol lg="2">
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <Grid container justify="space-around">
                                    <KeyboardDatePicker
                                        margin="normal"
                                        id="date-picker-dialog"
                                        label="Tanggal Awal"
                                        format="dd/MM/yyyy"
                                        value={selectedDate}
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
                                        label="Tanggal Akhir"
                                        format="dd/MM/yyyy"
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
                                <MDBBtn color="dark-green"  gradient="blue" onClick={handleFilter}>
                                    Tampilkan <MDBIcon icon="filter" className="ml-1" />
                                </MDBBtn>
                                {/* <MDBBtn color="danger" size="sm">
                                    Tolak <MDBIcon icon="times" className="ml-1" />
                                </MDBBtn> */}
                            </MDBRow>
                        </MDBCol>
                    </MDBRow>
                </MDBCardBody>
                {state.loading && (
                    <LinearProgress />
                )}
            </MDBCard>
            
            {state.listLedger.length !== 0 && (
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
                                    <th>SALDO(Rp.)</th>
                                </tr>
                            </MDBTableHead>
                            <MDBTableBody>
                                {state.listLedger.map((item,i) => (
                                    <tr>
                                        <td>{i+1}</td>
                                        <td> {item.date} </td>
                                        <td><b>{item.invoice_number}</b></td>
                                        <td>{item.description}</td>
                                        <td><NumberFormat value={item.debit} displayType={'text'} thousandSeparator={true} prefix={'Rp. '} style={{color:'green'}} /></td>
                                        <td><NumberFormat value={item.credit} displayType={'text'} thousandSeparator={true} prefix={'Rp. '} style={{color:'red'}}/></td>
                                        <td><b><NumberFormat value={item.saldo} displayType={'text'} thousandSeparator={true} prefix={'Rp. '} /></b></td>
                                    </tr>
                                ))}
                            </MDBTableBody>
                        </MDBTable>
                        <hr></hr>
                        <MDBRow className='mx-3'>
                            <MDBCol lg="9">
                                <h5 className="pt-2 mx-2">
                                    <small>TOTAL DEBIT</small><br></br>
                                    <small>TOTAL KREDIT</small><br></br><hr></hr>
                                    <small>SALDO AWAL</small><br></br>
                                    <small>SALDO AKHIR</small>
                                </h5>
                            </MDBCol>
                            <MDBCol lg="3">
                                <MDBBox display='flex' justifyContent="start">
                                    <h5 className="pt-2 mx-2">
                                        <small><b><NumberFormat value={state.ledgerAdditional.total_debit} displayType={'text'} thousandSeparator={true} prefix={'Rp. '} /></b></small><br></br>
                                        <small><b><NumberFormat value={state.ledgerAdditional.total_credit} displayType={'text'} thousandSeparator={true} prefix={'Rp. '} /></b></small><br></br><hr></hr>
                                        <small><b><NumberFormat value={state.ledgerAdditional.saldo_awal} displayType={'text'} thousandSeparator={true} prefix={'Rp. '} /></b></small><br></br>
                                        <small><b><NumberFormat value={state.ledgerAdditional.saldo_akhir} displayType={'text'} thousandSeparator={true} prefix={'Rp. '} /></b></small>
                                    </h5>
                                </MDBBox>
                            </MDBCol>
                        </MDBRow>
                        <hr></hr>
                    </MDBCardBody>
                </MDBCard>
            )}
        </div>
    );
}

export default BukuBesarComponent;
