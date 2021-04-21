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
  MDBBreadcrumb,
  MDBBreadcrumbItem
} from "mdbreact";
import { withRouter } from "react-router-dom";
import { CircularProgress, Icon } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { useHistory } from "react-router-dom";
import DoneIcon from '@material-ui/icons/Done';
import EditIcon from "@material-ui/icons/Edit";

const ListPemasukanComponent = ({ props, dataTamp, Next, NextR }) => {
  const { isAuthenticated } = useContext(AuthContext);
  const {
    state,
    ListIncome,
    ListIncomeNext,
    DeleteIncome,
    InvoiceIncome
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
    return () => { };
  }, []);

  useEffect(() => {
    console.log('res name = ', login.data);
  }, [login]);

  const handleClickReview = (data) => {
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
  };

  const [triggerPDF, setTriggerPDF] = useState(null);
  const handlePDF = (id) => {
    InvoiceIncome(id);
    setTriggerPDF(true);
  };

  useEffect(() => {
    if (triggerPDF == true) {
      const timer = setTimeout(() => {
        console.log("This will run after 1 second!", JSON.stringify(state));
        history.push(`/generate-invoice-income`, { data: state.invoiceIncome });
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [triggerPDF]);

  const listTransaksi = () => (
    <Fragment>
      {state.listIncome.map((item, i) => {
        console.log('ite = ', item.is_valid);
        return (
          <div>
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
                    <MDBRow lg="1">
                      {isAuthenticated().data.level === "Accountant" && (
                        <MDBBtn
                          color="cyan"
                          size="sm"
                          style={{ margin: "10px", position: "absolute", left: "100px" }}
                          onClick={() => handleClickReview(item)}
                        >
                          Review
                        </MDBBtn>
                      )}
                      {login.data && login.data.name === 'Marketing' &&
                        <>
                          <MDBBtn
                            color="dark-green"
                            size="sm"
                            style={{ margin: "10px" }}
                            onClick={() =>
                              history.push(`/generate-invoice-income`, { userId: item.id })
                            }
                          >
                            Generate
                      </MDBBtn>
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
                            onClick={() => handleDelete(item.id)}
                          />
                        </>
                      }
                    </MDBRow>
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>
          </div>
        )
      })}
    </Fragment >
  );

  return (
    <Fragment>
      <MDBBreadcrumb >
        <MDBBreadcrumbItem><b>Daftar Transaksi Masuk</b></MDBBreadcrumbItem>
      </MDBBreadcrumb>
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
                  positiion="absolute"
                  left="90px"
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

export default withRouter(ListPemasukanComponent);
