import React, { useState, useEffect, useContext, Fragment } from 'react';
import { Context as AuthContext } from "../../../services/Context/AuthContext"
import { Context as IncomeContext } from '../../../services/Context/IncomeContext'
import { Button, TextField, Divider, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, LinearProgress } from '@material-ui/core';
import { MDBCard, MDBCardBody, MDBRow, MDBCol, MDBBtn, MDBIcon } from 'mdbreact';
import { useParams } from "react-router-dom";
import NumberFormat from 'react-number-format';

const ReviewPemasukanComponent = ({ userId }) => {
    let { id } = useParams();
    const { isAuthenticated } = useContext(AuthContext)
    const { state, GetDetailIncome, ReviewIncome } = useContext(IncomeContext)
    const [, setDataTanggal] = useState([])
    const [, setDataBulan] = useState([])
    const [openDialogApprove, setOpenDialogApprove] = useState(false)
    const [form, setForm] = useState([]);

    useEffect(() => {
        GetDetailIncome(userId)
        const loopingTanggal = () => {
            let tanggal = '';
            let data_tanggal = [];
            for (tanggal = 1; tanggal <= 31; tanggal++) {
                data_tanggal.push({ 'tanggal': `${tanggal}` })
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

    useEffect(() => {
        const obj = {
            email: `${state.detailUser.name} | ${state.detailUser.email}`,
            desc: state.detailIncome.description,
            date: state.detailIncome.date,
            customerName: state.detailIncome ? state.detailIncome.customer : '-',
            data: state.detailIncome.products,
            unit: state.detailIncome.stock,
            unitPrice: state.detailIncome.unit_price,
            ammount: state.detailIncome.ammount,
            paymentMethod: state.detailIncome.payment_method,
            information: `Keterangan: ${state.detailIncome.information}`
        }
        setForm(obj);
    }, [state])

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
        ReviewIncome(userId, data)
    }

    const handleRejectedProccess = () => {
        let data = {
            review_status: 'rejected',
            reviewer_id: isAuthenticated().data.id
        }
        setOpenDialogApprove(false)
        ReviewIncome(id, data)
    }

    const onchange = (event) => {
        const value = event.target.value;

        setForm({
            ...form,
            [event.target.name]: value
        })
    }
    return (
        <div>
            <h4>Transaksi Pemasukkan {id}</h4>
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
                                        Validasi Transaksi <MDBIcon icon="check" className="ml-1" /> <MDBIcon icon="times" className="ml-1" />
                                    </MDBBtn>
                                )}
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
                            <form>
                                <TextField fullWidth value={form.email} name={'email'} margin="normal" onChange={onchange} /><br></br>
                                <TextField fullWidth value={form.desc} name={'desc'} margin="normal" onChange={onchange} /><br></br>
                                <TextField fullWidth value={form.date} name={'date'} margin="normal" onChange={onchange} /><br></br>
                                <TextField fullWidth value={form.customerName} name={'customerName'} margin="normal" onChange={onchange} /><br></br>
                                <TextField fullWidth value={form.paymentMethod} name={'paymentMethod'} margin="normal" onChange={onchange} />
                            </form>
                        </MDBCol>
                        <MDBCol lg="5">
                            {form.data !== undefined && (form.data.map((item, i) => {
                                return (
                                    <Fragment>
                                        <MDBRow className='m-12'>
                                            <MDBCol lg="4">
                                                <TextField fullWidth defaultValue="Default Value" margin="normal" type='number' value={item.stock} name={'unit'} onChange={onchange} />
                                            </MDBCol>
                                            <MDBCol lg="8">
                                                <TextField fullWidth margin="normal" type='number' value={item.product.unit_price} name={'unitPrice'} onChange={onchange} />
                                            </MDBCol>
                                        </MDBRow>
                                    </Fragment>
                                )
                            }))}
                            <MDBRow className='mt-3 mb-2'>
                                <MDBCol lg="8" >
                                    <b>TOTAL</b>
                                </MDBCol>
                                <MDBCol lg="4">
                                    <b><NumberFormat displayType={'text'} thousandSeparator={true} prefix={'Rp. '} value={form.ammount} /></b>
                                </MDBCol>
                            </MDBRow>
                            <Divider /><Divider />
                            <TextField fullWidth variant="outlined" margin="normal" multiline rows={3} rowsMax={5} value={form.information} name={'information'} onChange={onchange} />
                        </MDBCol>

                    </MDBRow>
                </MDBCardBody>
            </MDBCard>
        </div>
    );
};


export default ReviewPemasukanComponent;
