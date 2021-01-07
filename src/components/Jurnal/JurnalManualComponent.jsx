import React, { useState, useEffect, useContext } from "react";
import { Context as AuthContext } from "../../services/Context/AuthContext";
import { Context as CustomerContext } from "../../services/Context/CustomerContext";
import { Context as AccountContext } from "../../services/Context/AccountContext";
import { Context as JournalContext } from "../../services/Context/JournalContext";
import { Context as ProductContext } from "../../services/Context/ProductContext";
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
    // ListCustomer();
    // ListProduct();
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

  const handleApproveDialog = () => {
    setOpenDialogApprove(true);
  };

  const handleApproveCancle = () => {
    setOpenDialogApprove(false);
  };

  const handleApproveProccess = async () => {

    console.log(value)
    let data = {
      account_id: value.akun.id,
      debit: value.debit,
      credit: value.credit,
      description: value.description,
      invoice_number: value.invoice_number,
      date: today.getFullYear() + "-" + bulan + "-" + tanggal,
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
            <MDBCol lg="7">
              <form>
                <MDBRow className="m-12">
                  <TextField
                    fullWidth
                    label="Nomor Invoice"
                    variant="outlined"
                    margin="normal"
                    value={value.invoice_number}
                    onChange={handleChange("invoice_number")}
                  />
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
                      // defaultValue="Default Value"
                      variant="outlined"
                      margin="normal"
                      type="number"
                      value={value.kredit}
                      onChange={handleChange("credit")}
                    />
                  </MDBCol>
                </MDBRow>
                <br></br>
                <MDBRow className="m-12">
                  <MDBCol lg="4">
                    <InputLabel>Tanggal</InputLabel>
                    <Select
                      fullWidth
                      value={tanggal}
                      onChange={(event) => setTanggal(event.target.value)}
                    >
                      <MenuItem value="">
                        <em>Pilih Tanggal</em>
                      </MenuItem>
                      {dataTanggal.map((item) => (
                        <MenuItem key={item.tanggal} value={item.tanggal}>
                          {item.tanggal}
                        </MenuItem>
                      ))}
                    </Select>
                  </MDBCol>

                  <MDBCol lg="4">
                    <InputLabel>Bulan</InputLabel>
                    <Select
                      fullWidth
                      value={bulan}
                      onChange={(event) => setBulan(event.target.value)}
                    >
                      <MenuItem value="">
                        <em>Pilih Bulan</em>
                      </MenuItem>
                      <MenuItem value={1}>Januari</MenuItem>
                      <MenuItem value={2}>Februari</MenuItem>
                      <MenuItem value={3}>Maret</MenuItem>
                      <MenuItem value={4}>April</MenuItem>
                      <MenuItem value={5}>Mei</MenuItem>
                      <MenuItem value={6}>Juni</MenuItem>
                      <MenuItem value={7}>Juli</MenuItem>
                      <MenuItem value={8}>Agustus</MenuItem>
                      <MenuItem value={9}>September</MenuItem>
                      <MenuItem value={10}>Oktober</MenuItem>
                      <MenuItem value={11}>Nopember</MenuItem>
                      <MenuItem value={12}>Desember</MenuItem>
                    </Select>
                  </MDBCol>
                  <MDBCol lg="4">
                    <InputLabel>Tahun</InputLabel>
                    <Select fullWidth value={2020}>
                      <MenuItem value={2020}>
                        <em>2021</em>
                      </MenuItem>
                      <MenuItem value={2020}>
                        <em>2022</em>
                      </MenuItem>
                      <MenuItem value={2020}>
                        <em>2023</em>
                      </MenuItem>
                    </Select>
                  </MDBCol>
                </MDBRow>
                <br></br>
              </form>
            </MDBCol>
            <MDBCol lg="5">

              <FormControl variant="outlined" margin="normal" fullWidth>
                <InputLabel id="demo-simple-select-outlined-label">
                  Akun
                </InputLabel>
                <Select
                  label="Akun"
                  value={value.akun ? value.akun.name : ''}
                  name={'akun'}
                  onChange={handleChange("akun")}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>

                  {listAccount && listAccount.map((res, i) => (
                    <MenuItem value={res}>{res.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>

              {/* <FormControl variant="outlined" margin="normal" fullWidth>
                <InputLabel id="demo-simple-select-outlined-label">
                  Metode Pembayaran
                </InputLabel>
                <Select
                  label="Metode Pembayaran"
                  value={value.payment_method}
                  onChange={handleChange("payment_method")}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value="Tunai">Tunai</MenuItem>
                  <MenuItem value="Transfer">Transfer</MenuItem>
                  <MenuItem value="Pembayaran Uang Muka">
                    Pembayaran Uang Muka
                  </MenuItem>
                  <MenuItem value="Pembayaran Bulanan">
                    Pembayaran Bulanan
                  </MenuItem>
                  <MenuItem value="Pembayaran Sisa Bulanan">
                    Pembayaran Sisa Bulanan
                  </MenuItem>
                  <MenuItem value="Retur Penjualan">Retur Penjualan</MenuItem>
                </Select>
              </FormControl> */}
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
                {/* <MDBCol lg="6">
                                    <MDBBox display="flex" justifyContent="start">
                                        <MDBBtn color="danger" >
                                            Batal
                                        </MDBBtn>
                                    </MDBBox>
                                </MDBCol> */}
              </MDBRow>
            </MDBCol>
          </MDBRow>
        </MDBCardBody>
      </MDBCard>
    </div>
  );
};

export default withRouter(JurnalManualComponent);
