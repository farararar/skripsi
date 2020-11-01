import React, { Fragment, useContext, useEffect, useState } from 'react';
import { Context as AuthContext } from '../../../services/Context/AuthContext'
import { Context as IncomeContext } from '../../../services/Context/IncomeContext'
import { MDBContainer, MDBRow, MDBCol, MDBTypography, MDBCard, MDBCardBody, MDBBox, MDBBtn, MDBFormInline } from "mdbreact";
import { withRouter } from 'react-router-dom'
import { CircularProgress } from '@material-ui/core';

const ListTransaksiComponent = (props) => {
    const { isAuthenticated } = useContext(AuthContext)
    const { state, ListIncome, ListIncomeNext } = useContext(IncomeContext)
    const [search, setSearch] = useState('')
    const [, setListData] = useState([])

    useEffect(() => {
        ListIncome('')
        setListData(state.listIncome)
        return () => {

        };
    }, []);

    const handleClickReview = (id) => {
        props.history.push(`/review-transaksi/${id}`)
    }

    const handleSearch = () => {
        if(search === ''){
            alert('Ketikan yg ingin dicari!')
        }else{
            ListIncome(search)
        }
    }

    const handleResetSearch = () => {
        ListIncome('')
        setSearch('')
    }


    const handleTestClick = () => {
        ListIncomeNext(2)
    }


    const listTransaksi = () => (
        <Fragment>
            {state.listIncome.map((item,i) => (
                <MDBCard key={i} className='mb-2'>
                    <MDBCardBody className='p-1'>
                        <MDBRow>
                            <MDBCol lg="9">
                                <MDBTypography tag='h5' className="pt-2 mx-2"> {item.invoice_number} <small>{item.account.name}-{item.account.reference_number}</small></MDBTypography>
                            </MDBCol>
                            <MDBCol lg="3">
                                <MDBRow>
                                    {isAuthenticated() && isAuthenticated().data.level === 'Accountant' && (
                                        <MDBBtn color="cyan" size="sm" onClick={() => handleClickReview(item.id)} >Review</MDBBtn>
                                    )}
                                    <MDBBtn color="dark-green" size="sm">Generate Invoice</MDBBtn>
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
            {/* {JSON.stringify(state.listIncome)} */}
            <MDBContainer fluid>
                <MDBBox display="flex" justifyContent="end">
                    <MDBCol md="4">
                        <MDBFormInline className="md-form mr-auto mb-2">
                            <input className="form-control mr-sm-2" type="text" placeholder="Cari Transaksi" aria-label="Search" value={search} onChange={(e) => setSearch(e.target.value)} />
                            <MDBBtn gradient="aqua" rounded size="sm" className="mr-auto" onClick={handleSearch}>
                                Cari
                            </MDBBtn>
                            {search !== '' && (
                                <MDBBtn color="red" rounded size="sm" className="mr-auto" onClick={handleResetSearch}>
                                    Reset
                                </MDBBtn>
                            )}
                        </MDBFormInline>
                    </MDBCol>
                </MDBBox>
                
                {state.loading && (
                    <MDBBox display="flex" justifyContent="center" >
                        <CircularProgress />
                    </MDBBox>
                )}
                {!state.loading && (
                    listTransaksi()
                )}
                <MDBBox display="flex" justifyContent="center" className="mt-4">
                    {state.listIncome.length !== state.totalData && (
                        <MDBBtn outline color="primary" onClick={handleTestClick}>Load More...</MDBBtn>
                    )}  
                </MDBBox>
            </MDBContainer>
        </Fragment>
    );
}

export default withRouter(ListTransaksiComponent);
