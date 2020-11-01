import React, { Fragment, useContext, useEffect } from 'react';
import { Context as OutcomeContext } from '../../../services/Context/OutcomeContext'
import { MDBContainer, MDBRow, MDBCol, MDBTypography, MDBCard, MDBCardBody, MDBBox, MDBBtn, MDBFormInline } from "mdbreact";
import { Link, withRouter } from 'react-router-dom'
import { CircularProgress } from '@material-ui/core';

const ListComponent = (props) => {
    const { state, ListOutcome } = useContext(OutcomeContext)

    useEffect(() => {
        ListOutcome()
        return () => {

        };
    }, []);

    const ListTransaksi = () => (
        <Fragment>
            {state.listOutcome.map((item, i) => (
                <MDBCard className='mb-2'>
                    <MDBCardBody className='p-1'>
                        <MDBRow>
                            <MDBCol lg="9">
                                <MDBTypography tag='h5' className="pt-2 mx-2"> {item.invoice_number} <small>{item.account.name}-{item.account.reference_number}</small></MDBTypography>
                            </MDBCol>
                            <MDBCol lg="3">
                                <MDBRow>
                                    <MDBBtn color="cyan" size="sm" >Detail</MDBBtn>
                                </MDBRow>
                            </MDBCol>
                        </MDBRow>
                    </MDBCardBody>
                </MDBCard>
            ))}
        </Fragment>
    )

    return (
        <Fragment>
            {/* {JSON.stringify(state.listOutcome)} */}
            <MDBContainer fluid>
                <MDBBox display="flex" justifyContent="end">
                    <MDBCol md="3">
                        <MDBFormInline className="md-form mr-auto mb-2">
                            <input className="form-control mr-sm-2" type="text" placeholder="Cari Transaksi" aria-label="Search" />
                            <MDBBtn gradient="aqua" rounded size="sm" type="submit" className="mr-auto">
                                Cari
                                </MDBBtn>
                        </MDBFormInline>
                    </MDBCol>
                </MDBBox>
                {state.loading && (
                    <MDBBox display="flex" justifyContent="center" >
                        <CircularProgress />
                    </MDBBox>
                )}
                {!state.loading && (
                    ListTransaksi()
                )}
            </MDBContainer>
        </Fragment>
    );
}

export default withRouter(ListComponent);
