import React, { useState, useEffect, useContext } from "react";
import { Context as AuthContext } from "../../../services/Context/AuthContext";
import { Context as CustomerContext } from "../../../services/Context/CustomerContext";
import { Context as AccountContext } from "../../../services/Context/AccountContext";
import { Context as IncomeContext } from "../../../services/Context/IncomeContext";
import { Context as ProductContext } from "../../../services/Context/ProductContext";
import {
  Button,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  Icon,
  Grid,
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
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent'
import { useHistory } from 'react-router-dom';
import RemoveCircleOutlinedIcon from '@material-ui/icons/RemoveCircleOutlined';

const TransaksiMasukComponent = ({ props, data, Next }) => {
  const { isAuthenticated } = useContext(AuthContext);
  const history = useHistory();
  const { state: { listAccount }, ListAccount } = useContext(AccountContext);
  const { state: { listProduct }, ListProduct } = useContext(ProductContext);
  const { state, AddIncome, UpdateIncome, GetDetailIncome } = useContext(IncomeContext);
  const [openDialogApprove, setOpenDialogApprove] = useState(false);
  const [dataTanggal, setDataTanggal] = useState([]);
  const [tanggal, setTanggal] = useState("");
  const [bulan, setBulan] = useState("");
  const [ammount, setAmmount] = useState(0);
  const [image, setImage] = useState([]);
  const [count1, setCount] = useState([]);
  const [product, setProduct] = useState([]);
  const [tempProduct, setTempProduct] = useState({});
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

  useEffect(() => {
    // setValue(state.detailIncome);
    let temp = [];
    let tp = {}
    let ti = {}
    let vp = {}
    state.detailIncome && state.detailIncome.products.map((res, index) => {
      tp[index] = res.product.name
      ti[index] = res.product_id
      vp[`${'product'}[${res.product_id}]`] = res.stock
      temp.push("A");
    });
    setCount(temp);
    setTempProduct(tp);
    setProduct(ti);
    setValue({
      ...state.detailIncome,
      ...vp,
    });
  }, [state.detailIncome])

  useEffect(() => {
    ListAccount();
    GetDetailIncome(data.id);
    ListProduct();
    console.log("update value = ", data);
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
  }, []);

  const handleChangeProduk = (name, index) => (event) => {

    if (name === 'product') {
      let temp = '';
      listProduct.map((res) => {

        console.log('name = ', event.target.value);

        if (event.target.value === res.name) {
          console.log('filter = ', res);
          temp = res.id
        }
      });

      setValue({
        ...value,
        [`${name}[${temp}]`]: '0',
      });
      setProduct({
        ...product,
        [index]: temp
      })
    } else
      setValue({
        ...value,
        [name]: event.target.value,
      });
  }
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
  const [trigger, setTrigger] = useState(null);

  const handleApproveProccess = async () => {
    let formdata = new FormData();
    const tamp = await Object.keys(value).map(async (res) => {
      console.log(value[res]);

      if (res === "date") {
        formdata.append(res, today.getFullYear() + "-" + bulan + "-" + tanggal);
      } else if (
        // res === "user_id" ||
        res === "shift" ||
        res === "customer" ||
        res === "invoice_number" ||
        res === "information" ||
        res === "payment_method" ||
        res === "description" ||
        res.includes('product[')
      ) {
        formdata.append(res, value[res]);
      } else if (res === "image") {
        if (typeof value[res] === "string") {
          const tt = await urlToObject(
            "https://newdemo.aplikasiskripsi.com/farah_accounting/public/" +
            data.image
          ).then((result) => result);
          console.log("tt = ", tt);
          formdata.append(res, tt);
        } else {

          formdata.append(res, value[res]);
        }
      }
    });
    formdata.append("_method", "PUT");
    formdata.append("user_id", data.user_id);
    Promise.all(tamp).then(() => {
      UpdateIncome(data.id, formdata, Next, () => {
        history.push('/list-transaksi-pusat')
      });
      setOpenDialogApprove(false);
    });
  };

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

  function numberWithCommas(x) {
    try {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    } catch (error) {
      return '0';
    }

  }

  const removeCard = (index) => {
    console.log(index);
    console.log(value[`product[${product[index]}]`])
    delete value[`product[${product[index]}]`]
    let newArr = [...count1];
    newArr[index] = 'B';
    setCount(newArr);
  }

  useEffect(() => {
    console.log(count1);
  }, [count1])
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
                  margin="normal"
                  value={value.invoice_number}
                  onChange={handleChange("invoice_number")}
                />
                <br></br>
                <br></br>
                <InputLabel>Produk</InputLabel>
                <div style={{ display: 'flex', alignItems: "center", justifyContent: "space-between" }}>
                  <p style={{ marginTop: '20px' }}>Tambah Produk</p>
                  <AddCircleIcon onClick={() => setCount([...count1, 'A'])} style={{ cursor: 'pointer' }} />
                </div>

                {count1.map((res, index) => (
                  <>
                    {res === "A" && <Card style={{ marginTop: '10px' }}>
                      <CardContent>
                        <FormControl fullWidth >
                          <RemoveCircleOutlinedIcon onClick={() => removeCard(index)} style={{ color: 'red', alignItems: 'flex-end', position: "absolute", right: 0, top: 0, fontSize: 20, cursor: 'pointer' }} />
                          <InputLabel>Produk</InputLabel>
                          <Select value={tempProduct[index]} onChange={handleChangeProduk(`product`, index)}>
                            <MenuItem value="none">
                              <em>None</em>
                            </MenuItem>
                            {listProduct.map((res, index) => (
                              <MenuItem value={res.name}>{res.name}</MenuItem>
                            ))}
                          </Select>
                        </FormControl>

                        <TextField
                          fullWidth
                          label={"Produk"}
                          variant="outlined"
                          margin="normal"
                          onChange={handleChangeProduk(`product[${product[index]}]`)}
                          value={value[`product[${product[index]}]`]}
                        />
                      </CardContent>
                    </Card>}
                  </>
                ))}
                <TextField
                  fullWidth
                  label="Deskripsi Transaksi"
                  variant="outlined"
                  margin="normal"
                  multiline
                  rowsMax={4}
                  value={value.description}
                  onChange={handleChange("description")}
                />
                <br></br>
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
                      <MenuItem value={2}>Pebruari</MenuItem>
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
                    <Select fullWidth value={2021}>
                      <MenuItem value={2021}>
                        <em>2021</em>
                      </MenuItem>
                    </Select>
                  </MDBCol>
                </MDBRow>
                <br></br>

                <TextField
                  fullWidth
                  label="Nama Customer"
                  variant="outlined"
                  margin="normal"
                  value={value.customer}
                  onChange={handleChange("customer")}
                />

                <FormControl variant="outlined" margin="normal" fullWidth>
                  <FormControl variant="outlined" margin="normal" fullWidth>
                    <InputLabel id="demo-simple-select-outlined-label">
                      Shift Kerja
                    </InputLabel>
                    <Select
                      label="Metode Pembayaran"
                      value={value.shift}
                      onChange={handleChange("shift")}
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
                
                  <div>
                    <p style={{ color: "grey", fontSize: "15px" }}>
                      Upload Gambar
                    </p>
                    <input
                      type="file"
                      name="images[]"
                      id="button-file"
                      style={{ display: "none" }}
                      accept="image/*"
                      onChange={handleImage}
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
                              onClick={() => removeImage(image, media)}
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
              <MDBRow className="mt-3 mb-2">
                <MDBCol lg="8">
                  <b>TOTAL</b>
                </MDBCol>
                <MDBCol lg="4">
                  <b>
                    <NumberFormat
                      value={value.ammount}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"Rp. "}
                    />
                  </b>
                </MDBCol>
              </MDBRow>
              <Divider />
              <Divider />
              <FormControl variant="outlined" margin="normal" fullWidth>
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
              </FormControl>
              <TextField
                fullWidth
                label="Keterangan"
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
                      Simpan Transaksi
                    </MDBBtn>
                  </MDBBox>
                </MDBCol>
              </MDBRow>
            </MDBCol>
          </MDBRow>
        </MDBCardBody>
      </MDBCard>
    </div >
  );
};

export default withRouter(TransaksiMasukComponent);
