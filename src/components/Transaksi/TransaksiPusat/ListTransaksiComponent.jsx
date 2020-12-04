import React, { Fragment, useContext, useEffect, useState } from "react";
import { Context as AuthContext } from "../../../services/Context/AuthContext";
import { Context as IncomeContext } from "../../../services/Context/IncomeContext";
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
import { withRouter } from "react-router-dom";
import { CircularProgress, Icon } from "@material-ui/core";
import AssignmentTurnedInIcon from "@material-ui/icons/AssignmentTurnedIn";
import DeleteIcon from "@material-ui/icons/Delete";
import { useHistory } from "react-router-dom";
import DoneIcon from '@material-ui/icons/Done';
import EditIcon from "@material-ui/icons/Edit";
const ListTransaksiComponent = ({ props, dataTamp, Next, NextR }) => {
  const { isAuthenticated } = useContext(AuthContext);
  const {
    state,
    ListIncome,
    ListIncomeNext,
    DeleteIncome,
    InvoiceIncome,
    ValidateIncome
  } = useContext(IncomeContext);
  const [search, setSearch] = useState("");
  const [, setListData] = useState([]);
  let history = useHistory();
  const [login, setLogin] = useState([]);
  useEffect(() => {
    ListIncome("");
    setLogin(JSON.parse(localStorage.getItem('login')));
    // console.log('login as = ', localStorage.getItem('login'));
    setListData(state.listIncome);
    return () => {};
  }, []);

  useEffect(() => {
    console.log('res name = ', login.data);
  }, [login]);

  const handleClickReview = (data) => {
    // props.history.push(`/review-transaksi/${id}`);
    dataTamp(data);
    NextR();
  };

  const handleSearch = () => {
    if (search === "") {
      alert("Ketikan yg ingin dicari!");
    } else {
      ListIncome(search);
    }
  };

  const handleResetSearch = () => {
    ListIncome("");
    setSearch("");
  };

  const handleTestClick = () => {
    ListIncomeNext(2);
  };

  const handleEdit = (data) => {
    dataTamp(data);
    Next();
  };

  const handleDelete = (data) => {
    DeleteIncome(data, () => {
      ListIncome("");
      setListData(state.listIncome);
    });
    // Next()
  };

  const handleValidate = (data, param) => {
    ValidateIncome(data, { _method : "put",is_valid: param }, () => {
      ListIncome("");
    });
  };
  const [triggerPDF, setTriggerPDF] = useState(null);
  const handlePDF = (id) => {
    InvoiceIncome(id);
    setTriggerPDF(true);
    // history.push(`/generate-pdf`, {userId:item.id})
  };

  useEffect(() => {
    if (triggerPDF == true) {
      const timer = setTimeout(() => {
        console.log("This will run after 1 second!", JSON.stringify(state));
        history.push(`/generate-pdf`, { data: state.invoiceIncome });
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [triggerPDF]);

  const listTransaksi = () => (
    <Fragment>
      {state.listIncome.map((item, i) => {
        console.log('ite = ', item.is_valid);
        return(
        <MDBCard key={i} className="mb-2">
          <MDBCardBody className="p-1">
            <MDBRow>
              <MDBCol lg="9">
                <div style={{ display: "flex", alignItems: "center" }}>
                  {item.is_valid==='1' && <DoneIcon />}
                  <MDBTypography tag="h5" className="pt-2 mx-2">
                    {" "}
                    {item.invoice_number}{" "}
                    <small>
                      {item.customer} - {item.payment_method}
                    </small>
                  </MDBTypography>
                </div>
                <MDBTypography tag="h5" className="pt-2 mx-2">
                  {" "}
                  {item.review || "-"}
                </MDBTypography>
              </MDBCol>
              <MDBCol lg="3">
                <MDBRow>
                  {isAuthenticated() &&
                    isAuthenticated().data.level === "Accountant" && (
                      <MDBBtn
                        color="cyan"
                        size="sm"
                        onClick={() => handleClickReview(item)}
                        // onClick={NextR}
                      >
                        Review
                      </MDBBtn>
                    )}
                  <MDBBtn
                    color="dark-green"
                    size="sm"
                    onClick={() =>
                      history.push(`/generate-pdf`, { userId: item.id })
                    }
                  >
                    Generate Invoice
                  </MDBBtn>
                  {login.data&&login.data.name==='Marketing' &&
                    <>
                      <EditIcon
                        color="dark-green"
                        size="sm"
                        style={{ color: "green", margin: "10px" }}
                        onClick={() => handleEdit(item)}
                      />
                      <DeleteIcon
                        color="red"
                        // size="sm"
                        style={{ color: "red", margin: "10px" }}
                        onClick={() => handleDelete(item.user_id)}
                      />
                    </>
                  }
                </MDBRow>
                {login.data &&
                login.data.name === "Administrator" &&
                item.is_valid === null ? (
                  <>
                    <MDBBtn
                      color="green"
                      size="sm"
                      onClick={() => handleValidate(item.id, 1)}
                    >
                      Validate
                    </MDBBtn>
                    <MDBBtn
                      color="red"
                      size="sm"
                      onClick={() => handleValidate(item.id, 0)}
                    >
                      Invalidate
                    </MDBBtn>
                  </>
                ) : (
                    <div/>
                )}
              </MDBCol>
            </MDBRow>
          </MDBCardBody>
        </MDBCard>
      )})}
   
    </Fragment>
  );

  return (
    <Fragment>
      {/* {JSON.stringify(state.listIncome)} */}
      <MDBContainer fluid>
        <MDBBox display="flex" justifyContent="end">
          <MDBCol md="4">
            <MDBFormInline className="md-form mr-auto mb-2">
              <input
                className="form-control mr-sm-2"
                type="text"
                placeholder="Cari Transaksi"
                aria-label="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <MDBBtn
                gradient="aqua"
                rounded
                size="sm"
                className="mr-auto"
                onClick={handleSearch}
              >
                Cari
              </MDBBtn>
              {search !== "" && (
                <MDBBtn
                  color="red"
                  rounded
                  size="sm"
                  className="mr-auto"
                  onClick={handleResetSearch}
                >
                  Reset
                </MDBBtn>
              )}
            </MDBFormInline>
          </MDBCol>
        </MDBBox>

        {state.loading && (
          <MDBBox display="flex" justifyContent="center">
            <CircularProgress />
          </MDBBox>
        )}
        {!state.loading && listTransaksi()}
        <MDBBox display="flex" justifyContent="center" className="mt-4">
          {state.listIncome.length !== state.totalData && (
            <MDBBtn outline color="primary" onClick={handleTestClick}>
              Load More...
            </MDBBtn>
          )}
        </MDBBox>
      </MDBContainer>
    </Fragment>
  );
};

export default withRouter(ListTransaksiComponent);
