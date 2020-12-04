import React, { useState, useEffect, useContext } from "react";
import { Context as AuthContext } from "../../services/Context/AuthContext";
import { Context as CustomerContext } from "../../services/Context/CustomerContext";
import { Context as RawMaterialContext } from "../../services/Context/RawMaterialContext";
import { Context as IncomeContext } from "../../services/Context/IncomeContext";
import { Context as OutcomeContext } from "../../services/Context/OutcomeContext";
import { Context as ProductContext } from "../../services/Context/ProductContext";

import {
  TextField,
  LinearProgress,
} from "@material-ui/core";
import { MDBCard, MDBCardBody, MDBRow, MDBCol, MDBBtn, MDBBox } from "mdbreact";
import NumberFormat from "react-number-format";
import { withRouter } from "react-router-dom";
import { useLocation } from "react-router-dom";
const DetailProdukComponent = ({ props }) => {
  const location = useLocation();
  const { isAuthenticated } = useContext(AuthContext);
  const {
    state: { report },
    DetailPorduksi,
  } = useContext(RawMaterialContext);
  const {
    state: { detailOutcome },
    DetailOutcome,
    UpdateOutcome
  } = useContext(OutcomeContext);
  const {
    state: { listProduct },
    ListProduct,
  } = useContext(ProductContext);
  const { state, AddIncome, UpdateIncome } = useContext(IncomeContext);

  const defaultData = {
    customer: "",
    account_id: "",
    user_id: null,
    invoice_number: "",
    description: "",
    payment_method: "",
    date: "",
    information: "",
    image: [],
    shift: "",
  };
  const [value, setValue] = useState(defaultData);
  
  useEffect(()=>{
    DetailPorduksi(location.state.userId);
  },[])


  return (
    <div>
      <h4>Detail Produk</h4>
      <hr className="" />
      <MDBCard className="mb-2">
        {state.loading && <LinearProgress />}
        <MDBCardBody className="p-1">
          <MDBRow className="m-3">
            <MDBCol lg="7">
              <form>
                <TextField
                  fullWidth
                  label="No. Transaksi / Invoice"
                  variant="outlined"
                  disabled
                  margin="normal"
                  value={value.invoice_number}
                  // onChange={handleChange("invoice_number")}
                />
                <br></br>
                <br></br>
                

                <TextField
                  fullWidth
                  label="Deskripsi Transaksi"
                  variant="outlined"
                  margin="normal"
                  multiline
                  rowsMax={4}
                  disabled
                  value={value.description}
                  // onChange={handleChange("description")}
                />
                <br></br>
                <br></br>

                <TextField
                  fullWidth
                  label="Nama Customer"
                  variant="outlined"
                  disabled
                  margin="normal"
                  value={value.user?value.user.name:'-'}
                  // onChange={handleChange("customer")}
                />

              </form>
            </MDBCol>
          </MDBRow>
        </MDBCardBody>
      </MDBCard>
    </div>
  );
};

export default withRouter(DetailProdukComponent);
