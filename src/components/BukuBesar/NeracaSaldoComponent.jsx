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

const NeracaSaldoComponent = ({  }) => {
    const {state:{listAccount}, ListAccount} = useContext(AccountContext)
    const {state, ListNeraca} = useContext(LedgerContext)
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
            const date = new Date()
            if(value.start_date){
            let data = {
                account_id : value.account_id,
                month: value.start_date.getMonth() + 1 || date.getMonth()+1,
                year: value.end_date.getFullYear() || date.getFullYear()
            }
            console.log('data = ', data);
            ListNeraca(data)
        }else{
            let data = {
                account_id : value.account_id,
                month: date.getMonth()+1,
                year: date.getFullYear()
            }
            console.log('data = ', data);
            ListNeraca(data)
        }
            // alert(JSON.stringify(state.listLedger))
        // }
        
    }

    return (
        <div>
            {/* {JSON.stringify(state.listLedger)} */}
            <MDBRow>
                <MDBCol lg='9'>
                    <h4>Catatan Neraca Saldo</h4>
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
                                <MDBBtn color="dark-green"  gradient="blue" onClick={handleFilter}>
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
            
            {state.listNeraca && (
                <MDBCard className='mb-2'>
                    <MDBCardBody className='p-1'>
                        <MDBTable>
                            <MDBTableHead color="primary-color" textWhite>
                                <tr>
                                    <th>#</th>
                                    <th>NO. TRANSAKSI</th>
                                    <th>AKUN</th>
                                    <th>DEBIT(Rp.)</th>
                                    <th>KREDIT(Rp.)</th>
                            
                                </tr>
                            </MDBTableHead>
                            <MDBTableBody>
                                {state.listNeraca&&Object.keys(state.listNeraca).map((item,i) => (
                                    <tr>
                                        <td>{i+1}</td>
                                       
                                        <td><b>{item.invoice_number}</b></td>
                                        <td>{item}</td>
                                        <td>{state.listNeraca[item].Debet}</td>
                                        <td>{state.listNeraca[item].Kredit}</td>
                            
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

export default NeracaSaldoComponent;
