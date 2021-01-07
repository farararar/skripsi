import React, { Fragment, useContext, useEffect, useState } from "react";
import { Context as OutcomeContext } from "../../../services/Context/OutcomeContext";
import { Context as AuthContext } from "../../../services/Context/AuthContext";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBTypography,
  MDBCard,
  MDBCardBody,
  MDBBox,
  MDBBtn,
  MDBFormInline,
} from "mdbreact";
import { Link, withRouter } from "react-router-dom";
import { CircularProgress } from "@material-ui/core";
import EditPengeluaranComponent from "./EditPengeluaranComponent";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { useHistory } from "react-router-dom";
import DoneIcon from '@material-ui/icons/Done';
import ReviewPengeluaranComponent from "./ReviewPengeluaranComponent";

const ListPengeluaranComponent = (props, dataTamp, NextR) => {
  const { state, ListOutcome, DeleteOutcome, UpdateOutcome } = useContext(OutcomeContext);
  const { isAuthenticated } = useContext(AuthContext)
  const [Next, setNext] = useState(0);
  const [value, setValue] = useState([]);
  useEffect(() => {
    ListOutcome();
    return () => { };
  }, []);
  const handleNext = (value, data) => {
    setNext(value)
    setValue(data)
  }

  /*const { state, ListOutcome, DeleteOutcome, UpdateOutcome, InvoiceOutcome } = useContext(OutcomeContext);
  const { isAuthenticated } = useContext(AuthContext)
  const [Next, setNext] = useState(true);
  const [value, setValue] = useState([]);
  const [, setListData] = useState([]);
  const [login, setLogin] = useState([]);
  let history = useHistory();

  useEffect(() => {
    ListOutcome("");
    setLogin(JSON.parse(localStorage.getItem('login')));
    setListData(state.listOutcome);
    return () => { };
  }, []);

  useEffect(() => {
    ListOutcome();
    return () => { };
  }, []);

  const handleNext = (data) => {
    setNext(false)
    setValue(data)
  }

  const handleClickReview = (data) => {
    props.history.push(`/review-transaksi-keluar/${data.id}`);
    dataTamp(data.id);
    NextR();
  };*/

  const ListTransaksi = () => (
    <Fragment>
      {state.listOutcome.map((item, i) => {
        console.log('ite = ', item.is_valid);
        return (
          <MDBCard key={i} className="mb-2">
            <MDBCardBody className="p-1">
              <MDBRow>
                <MDBCol lg="9">
                  <div style={{ display: "flex", alignItems: "center" }}>
                    {item.is_valid === '1' && <DoneIcon />}
                    <MDBTypography tag="h5" className="pt-2 mx-2">
                      {" "}
                      {item.invoice_number}{" "}
                      <small>
                        {item.customer} - {item.payment_method}
                      </small>
                    </MDBTypography>
                  </div>
                  <MDBTypography tag="h10" className="pt-2 mx-2">
                    {" "}
                    {"status review: "} {item.review_status == null ? '-' : item.review_status}
                  </MDBTypography>
                  <MDBTypography tag="h5" className="pt-2 mx-2">
                    {" "}
                    {"pesan review: "} {item.review == null ? '-' : item.review}
                  </MDBTypography>
                </MDBCol>
                <MDBCol lg="3">
                  <MDBRow>
                    {isAuthenticated().data.level === "Accountant" && (
                      <MDBBtn
                        color="cyan"
                        size="sm"
                        style={{ margin: "10px", position: "absolute", left: "100px" }}
                        onClick={() => handleNext(2, item)}
                      >
                        Review
                      </MDBBtn>
                    )}
                    {isAuthenticated().data.level === 'Admin' && <>
                      <EditIcon
                        color="dark-green"
                        size="sm"
                        style={{ color: "green", margin: "10px", position: "absolute", left: "150px" }}
                        onClick={() => handleNext(1, item)}
                      />
                      <DeleteIcon
                        color="red"
                        // size="sm"
                        style={{ color: "red", margin: "10px", position: "absolute", left: "100px" }}
                        onClick={() => DeleteOutcome(item.id, () => ListOutcome())}
                      />
                    </>
                    }
                  </MDBRow>
                </MDBCol>
              </MDBRow>
            </MDBCardBody>
          </MDBCard>
        )
      })}
    </Fragment >
  );

  if (Next === 0)
    return (
      <Fragment>
        <MDBContainer fluid>
          <MDBBox display="flex" justifyContent="end">
            <MDBCol md="4">
              <MDBFormInline className="md-form mr-auto mb-2">
                <input
                  className="form-control mr-sm-2"
                  type="text"
                  placeholder="Cari Transaksi"
                  aria-label="Search"
                />
                <MDBBtn
                  gradient="aqua"
                  rounded
                  positiion="absolute"
                  left="90px"
                  size="sm"
                  type="submit"
                  className="mr-auto"
                >
                  Cari
                </MDBBtn>
              </MDBFormInline>
            </MDBCol>
          </MDBBox>
          {state.loading && (
            <MDBBox display="flex" justifyContent="center">
              <CircularProgress />
            </MDBBox>
          )}
          {!state.loading && ListTransaksi()}
        </MDBContainer>
      </Fragment>
    );
  else if (Next === 1)
    return (
      <>
        <EditPengeluaranComponent data={value} Next={(v) => setNext(v)} />
      </>
    );
  else
    return <ReviewPengeluaranComponent data={value} Next={(v) => setNext(v)} />
  /*else
    return (
      <>
        <EditPengeluaranComponent data={value} Next={() => setNext(true)} />
      </>*/

};

export default withRouter(ListPengeluaranComponent);
