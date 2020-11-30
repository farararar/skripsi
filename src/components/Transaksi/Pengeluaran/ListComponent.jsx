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
import DetailTransaksiComponent from "../../../components/Transaksi/Pengeluaran/DetailTransaksiComponent";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
const ListComponent = (props) => {
  const { state, ListOutcome, DeleteOutcome, UpdateOutcome } = useContext(OutcomeContext);
  const { isAuthenticated } = useContext(AuthContext)
  const [Next, setNext] = useState(true);
  const [value, setValue] = useState([]);
  useEffect(() => {
    ListOutcome();
    return () => { };
  }, []);
  const handleNext = (data) => {
    setNext(false)
    setValue(data)
  }
  const ListTransaksi = () => (
    <Fragment>
      {state.listOutcome.map((item, i) => (
        <MDBCard className="mb-2">
          <MDBCardBody className="p-1">
            <MDBRow>
              <MDBCol lg="9">
                <MDBTypography tag="h5" className="pt-2 mx-2">
                  {" "}
                  {item.invoice_number}{" "}
                  <small>
                    {item.customer} - {item.payment_method}
                  </small>
                </MDBTypography>
              </MDBCol>
              <MDBCol lg="3">
                <MDBRow>
                  <MDBBtn color="cyan" size="sm" onClick={() => handleNext(item)} >
                    Detail
                  </MDBBtn>
                  {isAuthenticated().data.level === 'Admin'&&<>
                    <DeleteIcon
                      color="red"
                      // size="sm"
                      style={{ color: "red", margin: "10px" }}
                      onClick={() => DeleteOutcome(item.id, ()=>ListOutcome())}
                    />
                    </>}
                </MDBRow>
              </MDBCol>
            </MDBRow>
          </MDBCardBody>
        </MDBCard>
      ))}
    </Fragment>
  );

  if (Next)
    return (
      <Fragment>
        {/* {JSON.stringify(state.listOutcome)} */}
        <MDBContainer fluid>
          <MDBBox display="flex" justifyContent="end">
            <MDBCol md="3">
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
  else
    return (
      <>
        <DetailTransaksiComponent data={value} Next={()=>setNext(true)} />
      </>
    );
};

export default withRouter(ListComponent);
