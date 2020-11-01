import React, { useState, useEffect, useContext, Fragment } from 'react';
import { Context as AuthContext } from '../../services/Context/AuthContext'
import {Context as IncomeContext} from '../../services/Context/IncomeContext'
import { Button, TextField, Divider, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, LinearProgress} from '@material-ui/core';
import { MDBCard, MDBCardBody, MDBRow, MDBCol, MDBBtn, MDBIcon } from 'mdbreact';
import {useParams} from "react-router-dom";
import NumberFormat from 'react-number-format';

const ReviewTransaksiComponent = () => {
    let { id } = useParams();
    const { isAuthenticated } = useContext(AuthContext)
    const {state, GetDetailIncome, ReviewIncome} = useContext(IncomeContext)
    const [, setDataTanggal] = useState([])
    const [, setDataBulan] = useState([])
    const [openDialogApprove, setOpenDialogApprove] = useState(false)

    useEffect(() => {
        GetDetailIncome(id)
        const loopingTanggal = () => {
            let tanggal = '';
            let data_tanggal = [];
            for (tanggal = 1; tanggal <= 31; tanggal++) {
                data_tanggal.push({ 'tanggal': `${tanggal}`})
            }
            setDataTanggal(data_tanggal)
        }
        const loopingBulan = () => {
            let bulan = '';
            let data_bulan = [];
            for (bulan = 1; bulan <= 12; bulan++) {
                data_bulan.push({ 'bulan': `${bulan}` })
            }
            setDataBulan(data_bulan)
        }
        loopingTanggal()
        loopingBulan()
    }, []);

    const dialogApprove = () => (
        <Dialog open={openDialogApprove} onClose={handleApproveCancle} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
            <DialogTitle id="alert-dialog-title">{"Setujui / Tolak Transaksi?"}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Pilih untuk menyetujui atau menolak transaksi ini, transaksi tidak dapat di ubah setelah melakukan tindakan ini!.
          </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleRejectedProccess} color="secondary">
                    Tolak Transaksi
                </Button>
                <Button onClick={handleApproveProccess} color="primary" autoFocus>
                    Setujui Transaksi
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
            review_status: 'approved',
            reviewer_id: isAuthenticated().data.id
        }
        setOpenDialogApprove(false)
        ReviewIncome(id, data)
    } 

    const handleRejectedProccess = () => {
        let data = {
            review_status: 'rejected',
            reviewer_id: isAuthenticated().data.id
        }
        setOpenDialogApprove(false)
        ReviewIncome(id, data)
    }

    return (
        <div>
            <h4>Transaksi Pusat ID {id}</h4>
            <hr className="" />
            <MDBCard className='mb-2'>
                <MDBCardBody className='p-1'>
                    <MDBRow>
                        <MDBCol lg="3">
                            <h5 className="pt-2 mx-2">
                                Nomor Transaksi<br></br>
                                <small>{state.detailIncome.invoice_number}</small>
                            </h5>
                        </MDBCol>
                        <MDBCol lg="2">
                            <h5 className="pt-2 mx-2">
                                Status Review<br></br>
                                <b>{state.detailIncome.review_status}</b>
                                {state.detailIncome.review_status === null && (
                                    '........................'
                                )}
                            </h5>
                        </MDBCol>
                        <MDBCol lg="2">
                            
                                <h5 className="pt-2 mx-2">
                                    Direview Oleh<br></br>
                                    {state.detailReviewer && (
                                        <Fragment>
                                            <b>{state.detailReviewer.name}</b>
                                        </Fragment>
                                    )}
                                    {!state.detailReviewer && (
                                        '........................'
                                    )}
                                </h5> 
                            
                        </MDBCol>
                        <MDBCol lg="2">
                            <h5 className="pt-2 mx-2">
                                Tanggal Review<br></br>
                                <small>{state.detailIncome.review_date}</small>
                                {state.detailIncome.review_date === null && (
                                        '........................'
                                )}
                            </h5> 
                        </MDBCol>
                        <MDBCol lg="3">
                            <MDBRow className="pt-2 mx-2">
                                {state.detailReviewer && (
                                    <MDBBtn color="dark-green" size="sm" disabled>
                                        Transaksi Sudah Direview
                                    </MDBBtn>
                                )}
                                {!state.detailReviewer && (
                                    <MDBBtn color="dark-green" size="sm" onClick={() => handleApproveDialog('approve')} gradient="blue">
                                        Setujui / Tolak Transaksi <MDBIcon icon="check" className="ml-1" /> <MDBIcon icon="times" className="ml-1" />
                                    </MDBBtn>
                                )}
                                {/* <MDBBtn color="danger" size="sm">
                                    Tolak <MDBIcon icon="times" className="ml-1" />
                                </MDBBtn> */}
                            </MDBRow>
                        </MDBCol>
                        {dialogApprove()}
                    </MDBRow>
                </MDBCardBody>
            </MDBCard>
            <MDBCard className='mb-2'>
                {state.loading && (
                    <LinearProgress />
                )}
                <MDBCardBody className='p-1'>
                    <MDBRow className='m-3'>
                        <MDBCol lg="7">
                            {/* {JSON.stringify(state.detailReviewer)} */}
                            <form>
                                <TextField fullWidth value={`${state.detailUser.name} | ${state.detailUser.email}`} margin="normal" readonly /><br></br>
                                <TextField fullWidth value={state.detailIncome.description} margin="normal" readonly /><br></br>
                                <TextField fullWidth value={state.detailIncome.date} margin="normal" readonly /><br></br>
                                <TextField fullWidth value={state.detailCustomer.name} margin="normal" readonly /><br></br>
                                <TextField fullWidth value={state.detailAccount.name} margin="normal" readonly /><br></br>
                            </form>
                        </MDBCol>

                        <MDBCol lg="5">
                            <MDBRow className='m-12'>
                                <MDBCol lg="4">
                                    <TextField fullWidth defaultValue="Default Value" margin="normal" type='number' value={state.detailIncome.unit}  />
                                </MDBCol>
                                <MDBCol lg="8">
                                    <TextField fullWidth margin="normal" type='number' value={state.detailIncome.unit_price} />
                                </MDBCol>
                            </MDBRow>
                            <MDBRow className='mt-3 mb-2'>
                                <MDBCol lg="8" >
                                    <b>TOTAL</b>
                                </MDBCol>
                                <MDBCol lg="4">
                                    <b><NumberFormat displayType={'text'} thousandSeparator={true} prefix={'Rp. '} value={state.detailIncome.ammount} /></b>
                                </MDBCol>
                            </MDBRow>
                            <Divider /><Divider />
                            <TextField fullWidth value={state.detailIncome.payment_method} margin="normal" readonly />
                            <TextField fullWidth  variant="outlined" margin="normal" multiline rows={3} rowsMax={5} value={`Keterangan: ${state.detailIncome.information}`} readonly />
                            
                        </MDBCol>
                    </MDBRow>
                </MDBCardBody>
            </MDBCard>
        </div>
    );
};


export default ReviewTransaksiComponent;
