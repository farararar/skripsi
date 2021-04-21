import React, { useState, useEffect, useContext } from "react";
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { Context as AuthContext } from "../../../services/Context/AuthContext";
import { Context as AccountContext } from "../../../services/Context/AccountContext";
import { Context as OutcomeContext } from "../../../services/Context/OutcomeContext";
import { useHistory } from 'react-router-dom';
import {
  Button,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  Icon,
  FormControl,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  LinearProgress,
} from "@material-ui/core";
import { MDBCard, MDBCardBody, MDBRow, MDBCol, MDBBtn, MDBBox } from "mdbreact";
import { withRouter } from "react-router-dom";

const TransaksiKeluarComponent = ({ props, data, Next }) => {
  const history = useHistory();
  const { isAuthenticated } = useContext(AuthContext);
  const { state: { listAccount }, ListAccount, } = useContext(AccountContext);
  const { state, DetailOutcome, UpdateOutcome, ListOutcomeTypeBy } = useContext(OutcomeContext);
  const [selectedDate, setSelectedDate] = useState();
  const [openDialogApprove, setOpenDialogApprove] = useState(false);
  const [dataTanggal, setDataTanggal] = useState([]);
  const [tanggal, setTanggal] = useState("");
  const [bulan, setBulan] = useState("");
  const [ammount, setAmmount] = useState(0);
  const [image, setImage] = useState([]);
  const [typeOutcome, setTypeOutcome] = useState("");

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
  let today = new Date();
  const handleChange = (name, ket, stok) => (event) => {
    console.log('firs render = ', value[name] ? value[name] : "0");
    if (ket) {
      if (
        Number(
          `${value[name] ? value[name] : ""}${event.target.value.slice(
            event.target.value.length - 1
          )}`
        ) <= Number(stok)
      ) {
        setValue({
          ...value,
          [name]: event.target.value.replace(/[^0-9]/g, ""),
        });
      } else {
        if (value[name] === undefined || value[name] === null) {
          setValue({
            ...value,
            [name]: '',
          });
        }
        console.log("masuk error");
        return 0;
      }
    } else {
      console.log('elseee')
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
    }
  };

  const month = [
    "Januari",
    "Pebruari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];

  const [updated, setUpdated] = useState(true);

  useEffect(() => {
    DetailOutcome(data.id);
    setUpdated(isAuthenticated().data.level === 'Admin' ? false : true)
  }, [])

  useEffect(() => {
    ListAccount();
    setValue(data);

    setImage([data.image]);
    setTanggal(data.date.split(" ")[0]);
    var bln = 0;
    month.map((res, i) => {
      console.log(res);
      if (res === data.date.split(" ")[1]) {
        bln = i + 1;
      }
    });
    setBulan(bln);
    console.log("data  ==  ", data);
    const loopingTanggal = () => {
      let tanggal = "";
      let data_tanggal = [];
      for (tanggal = 1; tanggal <= 31; tanggal++) {
        data_tanggal.push({ tanggal: `${tanggal}` });
      }
      setDataTanggal(data_tanggal);
    };
    loopingTanggal();
  }, [state.detailOutcome]);

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

  const alertSuccess = () => (
    <Dialog
      open={openDialogApprove}
      onClose={handleApproveCancle}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{"Success?"}</DialogTitle>
      <DialogActions>
        <Button onClick={handleApproveCancle} color="secondary">
          OK
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
  const [trigger, setTrigger] = useState(null);


  const handleApproveProccess = async () => {
    let formdata = new FormData();
    const tamp = await Object.keys(value).map(async (res) => {
      console.log(value[res]);

      if (res === "date") {
        formdata.append(res, today.getFullYear() + "-" + bulan + "-" + tanggal); //format tanggal
      } else if (
        res === "shift" ||
        res === "customer" ||
        res === "invoice_number" ||
        res === "information" ||
        res === "payment_method" ||
        res === "description"
      ) {
        formdata.append(res, value[res]);
      } else if (res === "image") {  //format gambar
        if (typeof value[res] === "string") {
          const tt = await urlToObject(
            "https://newdemo.aplikasiskripsi.com/farah_accounting/public/" + //simpan ke BE
            data.image
          ).then((result) => result);
          formdata.append(res, tt);
        } else {
          formdata.append(res, value[res]);
        }
      } else if (res !== "user_id") {
        formdata.append(res, value[res]);
      }
    });
    formdata.append("_method", "PUT");
    formdata.append("user_id", data.user_id);

    Promise.all(tamp).then((res) => {
      let back = history.goBack()
      UpdateOutcome(data.id, formdata, () => {
        history.push('/list-pengeluaran-admin')
      });
      setOpenDialogApprove(false);
    });
  };

  function backPage(){
    return alertSuccess()
  }

  const urlToObject = async (inputURI) => {
    var binaryVal;

    // mime extension extraction
    var inputMIME = inputURI.split(",")[0].split(":")[1].split(";")[0];

    // Extract remaining part of URL and convert it to binary value
    if (inputURI.split(",")[0].indexOf("base64") >= 0)
      binaryVal = atob(inputURI.split(",")[1]);
    // Decoding of base64 encoded string
    else binaryVal = unescape(inputURI.split(",")[1]);

    // Computation of new string in which hexadecimal
    // escape sequences are replaced by the character
    // it represents

    // Store the bytes of the string to a typed array
    var blobArray = [];
    for (var index = 0; index < binaryVal.length; index++) {
      blobArray.push(binaryVal.charCodeAt(index));
    }

    return new Blob([blobArray], {
      type: inputMIME,
    });
  };

  const removeImage = (form, img) => {
    setImage([...image.filter((q) => q !== img)]);
  };
  const handleImage = (event) => {
    setImage([...image, event.target.files[0]]);
    setValue({
      ...value,
      image: event.target.files[0],
    });
  };

  function createObjectURL(media) {
    if (media instanceof File) {
      if (window.webkitURL) {
        return window.webkitURL.createObjectURL(media);
      } else if (window.URL && window.URL.createObjectURL) {
        return window.URL.createObjectURL(media);
      } else {
        return null;
      }
    } else {
      console.log("masuk else", media);
      return (
        "https://newdemo.aplikasiskripsi.com/farah_accounting/public/" + media
      );
    }
  }

  const handleDateChange = (date) => {
    let formattedDate = date.getFullYear() + "-" + ("0" + (date.getMonth() + 1)).slice(-2) + "-" + ("0" + date.getDate()).slice(-2)
    setSelectedDate(date);
    setValue({
      ...value,
      date: formattedDate,
    });
  }

  const handleChangeTypeOutcome = (value) => {
    setTypeOutcome(value);
    return ListOutcomeTypeBy(value);
  };

  return (
    <div>
      <h4>Edit Transaksi</h4>
      <hr className="" />
      <MDBCard className="mb-2">
        {dialogApprove()}
        {state.loading && <LinearProgress />}
        <MDBCardBody className="p-1">
          <MDBRow className="m-3">
            <MDBCol lg="7">
              <form>
                <TextField
                  fullWidth
                  label="No. Transaksi / Invoice"
                  variant="outlined"
                  disabled={updated}
                  margin="normal"
                  value={value.invoice_number}
                  onChange={handleChange("invoice_number")}
                />
                <TextField
                  fullWidth
                  label="Deskripsi Transaksi"
                  variant="outlined"
                  margin="normal"
                  multiline
                  rowsMax={4}
                  disabled={updated}
                  value={value.description}
                  onChange={handleChange("description")}
                />
                <TextField
                  fullWidth
                  label="Nama Customer"
                  variant="outlined"
                  disabled={updated}
                  margin="normal"
                  value={value.user ? value.user.name : '-'}
                  onChange={handleChange("customer")}
                />
                 <FormControl variant="outlined" margin="normal" fullWidth>
                    <InputLabel id="demo-simple-select-outlined-label">
                      Shift Kerja
                    </InputLabel>
                    <Select
                      label="Metode Pembayaran"
                      value={value.shift}
                      disabled={updated}
                    >
                      <MenuItem value="">
                        <em>Pilih Shift</em>
                      </MenuItem>
                      {[
                        { id: 1, sif: "Pagi" },
                        { id: 2, sif: "Siang" },
                      ].map((item, i) => (
                        <MenuItem key={i} value={item.sif}>
                          {item.sif}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                <br></br>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    margin="normal"
                    id="date-picker-transaksi"
                    label="Tanggal Transaksi"
                    format="dd/MM/yyyy"
                    value={value.date}
                    views={["date"]}
                    onChange={handleDateChange}
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                  />
                </MuiPickersUtilsProvider>
                <br></br>
               
                <FormControl variant="outlined" margin="normal" fullWidth>
                  <div>
                    <p style={{ color: "grey", fontSize: "15px" }}>
                      Gambar
                    </p>
                    <input
                      type="file"
                      name="images[]"
                      id="button-file"
                      className="display-none"
                      style={{ display: "none" }}
                      accept="image/*"
                      onChange={!updated ? handleImage : {}}
                    />
                    <div className="flex justify-center sm:justify-start flex-wrap">
                      {image.length !== 1 && (
                        <label
                          htmlFor="button-file"
                          style={{
                            padding: "50px",
                            margin: "10px",
                            alignItems: "center",
                            borderRadius: "10px",
                            boxShadow:
                              "0 1px 3px 0 rgba(0,0,0,.2), 0 1px 1px 0 rgba(0,0,0,.14), 0 2px 1px -1px rgba(0,0,0,.12)",
                          }}
                        >
                          <Icon
                            className={{
                              fontSize: "3.6rem",
                              color: "rgba(0, 0, 0, 0.54)",
                              width: "1em",
                              height: "1em",
                              overflow: "hidden",
                              flexShrink: "0",
                              useSelect: "none",
                              margin: "16px",
                            }}
                          >
                            cloud_upload
                          </Icon>
                        </label>
                      )}
                      {image &&
                        image.map((media, index) => {
                          return (
                            <img
                              onClick={() => !updated ? removeImage(image, media) : {}}
                              style={{
                                width: "120px",
                                marginBottom: "20px",
                                height: "120px",
                                borderRadius: "10px",
                                backgroundColor: "red",
                                margin: "10px",
                              }}
                              src={
                                typeof image === "string"
                                  ? "https://newdemo.aplikasiskripsi.com/farah_accounting/public/" +
                                  media
                                  : createObjectURL(media)
                              }
                              alt="product2"
                            />
                          );
                        })}
                    </div>
                  </div>
                </FormControl>
              </form>
            </MDBCol>
            <MDBCol lg="5">
              <FormControl variant="outlined" margin="normal" fullWidth>
                <InputLabel id="demo-simple-select-outlined-label">
                  Tipe Jenis Pengeluaran
                </InputLabel>
                <Select
                  label="Metode Pembayaran"
                  value={value.category} //typeOutcome
                  onChange={(e) => handleChangeTypeOutcome(e.target.value)}>
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value="Logistik">Logistik</MenuItem>
                  <MenuItem value="Operasional">Operasional Perusahaan</MenuItem>
                </Select>
              </FormControl>
              <MDBRow className="m-12">
                <MDBCol lg="12">
                  <FormControl variant="outlined" margin="normal" fullWidth>
                    <InputLabel id="demo-simple-select-outlined-label">
                      Jenis Pengeluaran
                    </InputLabel>
                    <Select
                      label="Metode Pembayaran"
                      value={value.type}
                      onChange={handleChange("type")}
                    >
                      {typeOutcome === "" ? (
                        <MenuItem value="">
                          <em>Pilih Jenis Akun Terlebih Dahulu</em>
                        </MenuItem>
                      ) : (
                          <MenuItem value="">
                            <em>None</em>
                          </MenuItem>
                        )}
                      {state.listOutcomeType && state.listOutcomeType.map((item, i) => (
                        <MenuItem key={i} value={item}>
                          {item}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </MDBCol>
              </MDBRow>
              <FormControl variant="outlined" margin="normal" fullWidth>
                <InputLabel id="demo-simple-select-outlined-label">
                  Metode Pembayaran
                </InputLabel>
                <Select
                  label="Metode Pembayaran"
                  disabled={updated}
                  value={value.payment_method}
                  onChange={handleChange("payment_method")}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value="Tunai">Tunai</MenuItem>
                  <MenuItem value="Kredit">Kredit</MenuItem>
                  <MenuItem value="Pembayaran Utang">Pembayaran Utang</MenuItem>
                </Select>
              </FormControl>
              <TextField
                    fullWidth
                    label="Quantity"
                    variant="outlined"
                    disabled={updated}
                    margin="normal"
                    value={value.qty}
                    onChange={handleChange("qty")}
                  />

                  <TextField
                    fullWidth
                    label="Harga Satuan"
                    variant="outlined"
                    disabled={updated}
                    margin="normal"
                    value={value.unit_price}
                    onChange={handleChange("unit_price")}
                  />
              <TextField
                fullWidth
                label="Keterangan"
                disabled={updated}
                variant="outlined"
                margin="normal"
                multiline
                rows={3}
                rowsMax={5}
                value={value.information}
                onChange={handleChange("information")}
              />
              <MDBRow className="mt-3 mb-2">
                <MDBCol lg="12">
                  <MDBBox display="flex" justifyContent="end">
                    <MDBBtn
                      color="dark-green"
                      onClick={() => handleApproveDialog("approve")}
                      disabled={state.loading}
                    >
                      Update Transaksi
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

export default withRouter(TransaksiKeluarComponent);
