import React, { useState, useEffect, useContext } from "react";
import { Context as AuthContext } from "../../services/Context/AuthContext";
import { Context as CustomerContext } from "../../services/Context/CustomerContext";
import { Context as AccountContext } from "../../services/Context/AccountContext";
import { Context as JournalContext } from "../../services/Context/JournalContext";
import { Context as ProductContext } from "../../services/Context/ProductContext";
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import {
  Button,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  Icon,
  FormControl,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  LinearProgress,
} from "@material-ui/core";
import { MDBCard, MDBCardBody, MDBRow, MDBCol, MDBBtn, MDBBox } from "mdbreact";
import NumberFormat from "react-number-format";
import { withRouter } from "react-router-dom";

const JurnalManualComponent = ({ Change, userData, status }) => {
  const { isAuthenticated } = useContext(AuthContext);
  const {
    state: { listAccount },
    ListAccount,
  } = useContext(AccountContext);
  const { state, JournalManual } = useContext(JournalContext);
  const [openDialogApprove, setOpenDialogApprove] = useState(false);
  const [dataTanggal, setDataTanggal] = useState([]);
  const [tanggal, setTanggal] = useState("");
  const [bulan, setBulan] = useState("");
  const [ammount, setAmmount] = useState(0);
  const [image, setImage] = useState([]);
  const [selectedDate, setSelectedDate] = useState();

  const constData = {
    account_id: "",
    description: "",
    payment_method: "",
    date: "",
    debit: 0,
    credit: 0,
    akun: []
  }
  const [value, setValue] = useState(constData);
  let today = new Date();
  const handleChange = (name) => (event) => {
    console.log('test = ', name)
    if (name === "akun") {
      console.log('masuk akun = ', event.target.value);
      setValue({ ...value, [name]: event.target.value })
      return 0;
    }
    setValue({
      ...value,
      [name]: event.target.value,
    });

    if (name === "unit_price") {
      let set_ammount = event.target.value * value.unit;
      setAmmount(set_ammount);
    }
    if (name === "unit") {
      let set_ammount = event.target.value * value.unit_price;
      setAmmount(set_ammount);
    }
  };

  useEffect(() => {
    console.log('user dtaa = ', userData);
    ListAccount();
    setValue(userData ? userData : constData);
    
    const loopingTanggal = () => {
      let tanggal = "";
      let data_tanggal = [];
      for (tanggal = 1; tanggal <= 31; tanggal++) {
        data_tanggal.push({ tanggal: `${tanggal}` });
      }
      setDataTanggal(data_tanggal);
    };
    loopingTanggal();
  }, []);

  const dialogApprove = () => (
    <Dialog
      open={openDialogApprove}
      onClose={handleApproveCancle}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{"Simpan Transakasi?"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Sebelum menyimpan transaksi, pastikan inputan sudah benar agar
          transakasi anda tidak di tolak oleh pihak Akuntan!
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleApproveCancle} color="secondary">
          Batal
        </Button>
        <Button
          onClick={handleApproveProccess}
          color="primary"
          autoFocus
          disabled={state.loading}
        >
          {state.loading ? state.message : "Simpan Transaksi"}
        </Button>
      </DialogActions>
    </Dialog>
  );

  const handleDateChange = (date) => {
    let formattedDate = date.getFullYear() + "-" + ("0" + (date.getMonth() + 1)).slice(-2) + "-" + ("0" + date.getDate()).slice(-2)
    setSelectedDate(date);
    setValue({
      ...value,
      date: formattedDate,
    });
  }

  const handleApproveDialog = () => {
    setOpenDialogApprove(true);
  };

  const handleApproveCancle = () => {
    setOpenDialogApprove(false);
  };

  const handleApproveProccess = async () => {

    console.log(value)
    let data = {
      account_id: value.account_id,
      debit: value.debit,
      credit: value.credit,
      description: value.description,
      invoice_number: value.invoice_number,
      date: today.getFullYear() + "-" + today.getMonth() + "-" + today.getDate(),
    };

  
    JournalManual(data, Change, status, value.id)
    setOpenDialogApprove(false);
  };
  return (
    <div>
      {/* {today.getFullYear()} */}
      <h4>Input Jurnal Manual</h4>
      <hr className="" />
      <MDBCard className="mb-2">
        {dialogApprove()}
        {state.loading && <LinearProgress />}
        <MDBCardBody className="p-1">
          <MDBRow className="m-3">
            <MDBCol lg="6">
              <form>
                <TextField
                  fullWidth
                  label="Nomor Invoice"
                  variant="outlined"
                  margin="normal"
                  value={value.invoice_number}
                  onChange={handleChange("invoice_number")}
                />
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    margin="normal"
                    id="date-picker-transaksi"
                    label="Tanggal Transaksi"
                    format="dd/MM/yyyy"
                    value={selectedDate}
                    views={["date"]}
                    onChange={handleDateChange}
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                  />
                </MuiPickersUtilsProvider>
              </form>
            </MDBCol>
            <MDBCol lg="6">
              <FormControl variant="outlined" margin="normal" fullWidth>
                <InputLabel id="demo-simple-select-outlined-label">
                  Akun
                </InputLabel>
                <Select
                  label="Akun"
                  value={parseInt(value.account_id)}
                  name={'account_id'}
                  onChange={handleChange("account_id")}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>

                  {listAccount && listAccount.map((res, i) => (
                    <MenuItem value={parseInt(res.id)}>{res.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <MDBRow className="m-12">
                <MDBCol lg="6">
                  <TextField
                    fullWidth
                    label="Debit"
                    variant="outlined"
                    margin="normal"
                    type="number"
                    value={value.debit}
                    onChange={handleChange("debit")}
                  />
                </MDBCol>
                <MDBCol lg="6">
                  <TextField
                    fullWidth
                    label="Kredit"
                    variant="outlined"
                    margin="normal"
                    type="number"
                    value={value.kredit}
                    onChange={handleChange("credit")}
                  />
                </MDBCol>
              </MDBRow>
              <TextField
                fullWidth
                label="Keterangan"
                variant="outlined"
                margin="normal"
                multiline
                rows={3}
                rowsMax={5}
                value={value.description}
                onChange={handleChange("description")}
              />
              <MDBRow className="mt-3 mb-2">
                <MDBCol lg="12">
                  <MDBBox display="flex" justifyContent="end">
                    <MDBBtn
                      color="dark-green"
                      onClick={() => handleApproveDialog("approve")}
                      disabled={state.loading}
                    >
                      Simpan Transaksi
                    </MDBBtn>
                  </MDBBox>
                </MDBCol>
              </MDBRow>
            </MDBCol>
          </MDBRow>
        </MDBCardBody>
      </MDBCard>
    </div>
  );
};

export default withRouter(JurnalManualComponent);
