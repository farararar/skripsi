import React, { useState, useEffect, useContext } from "react";
import { Context as AuthContext } from "../../services/Context/AuthContext";
import { Context as CustomerContext } from "../../services/Context/CustomerContext";
import { Context as AccountContext } from "../../services/Context/AccountContext";
import { Context as IncomeContext } from "../../services/Context/IncomeContext";
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
import { useHistory, withRouter } from "react-router-dom";
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent'
import RemoveCircleOutlinedIcon from '@material-ui/icons/RemoveCircleOutlined';
const TransaksiMasukComponent = (props) => {
  const history = useHistory()
  const { isAuthenticated } = useContext(AuthContext);
  const {
    state: { listAccount },
    ListAccount,
  } = useContext(AccountContext);
  const {
    state: { listCustomer },
    ListCustomer,
  } = useContext(CustomerContext);
  const {
    state: { listProduct },
    ListProduct,
  } = useContext(ProductContext);
  const { state, AddIncome } = useContext(IncomeContext);
  const [openDialogApprove, setOpenDialogApprove] = useState(false);
  const [dataTanggal, setDataTanggal] = useState([]);
  const [tanggal, setTanggal] = useState("");
  const [bulan, setBulan] = useState("");
  const [ammount, setAmmount] = useState(0);
  const [image, setImage] = useState([]);

  const defaultData = {
    customer: "",
    account_id: "",
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
    if (ket) {
      if (
        Number(
          `${value[name] ? value[name] : "0"}${event.target.value.slice(
            event.target.value.length - 1
          )}`
        ) <= Number(stok)
      ) {
        setValue({
          ...value,
          [name]: event.target.value.replace(/[^0-9]/g, ""),
        });
      } else {
        console.log("masuk error");
      }
    } else {
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

  const handleChangeProduk = (name, index) => (event) => {
    console.group('name', name);
    console.log('event = ', event.target.value);

    if (name === 'product') {
      setValue({
        ...value,
        [`${name}[${event.target.value.id}]`]: '0',
      });
      setProduct({
        ...product,
        [index]: event.target.value.id
      })
    } else
      setValue({
        ...value,
        [name]: event.target.value,
      });
  }

  useEffect(() => {
    ListAccount();
    // ListCustomer();
    ListProduct();
    setValue({
      ...value,
      user_id: isAuthenticated().data.id,
    });
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
  const [trigger, setTrigger] = useState(null);

  const handleApproveProccess = async () => {
    let formdata = new FormData();
    const tamp = await Object.keys(value).map((res) => {
      console.log(res);

      if (res === "date") {
        formdata.append(res, today.getFullYear() + "-" + bulan + "-" + tanggal);
      } else {
        formdata.append(res, value[res]);
      }
    });

    Promise.all(tamp).then(() => {
      // history.push('/transaksi-masuk')
      // location.reload()
      
      AddIncome(formdata, () => window.location.reload());
      setOpenDialogApprove(false);
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
      //   return process.env.REACT_APP_API_DOMAIN + media.path;
      return "kosong";
    }
  }

  function numberWithCommas(x) {
    try {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    } catch (error) {
      return '0';
    }
  }
  const [count1, setCount] = useState([]);
  const [product, setProduct] = useState([]);
  
  const removeCard = (index) => {
    console.log(index);
    console.log(value[`product[${product[index]}]`])
    delete value[`product[${product[index]}]`]
    let newArr = [...count1];
    newArr[index] = 'B';
    setCount(newArr);
  }

  return (
    <div>
      {/* {today.getFullYear()} */}
      <h4>Input Transaksi Masuk</h4>
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
                <div style={{ display: 'flex', alignItems: "center", justifyContent: "space-between" }}>
                  <p style={{ marginTop: '20px' }}>Tambah Produk</p>
                  <AddCircleIcon onClick={() => setCount([...count1, 'A'])} />
                </div>

                {count1.map((res, index) => (
                  <>
                  {res==="A"&&<Card style={{ marginTop: '10px' }}>
                    <CardContent>
                      <FormControl fullWidth >
                        <RemoveCircleOutlinedIcon onClick={() => removeCard(index)} style={{ color: 'red', alignItems: 'flex-end', position: "absolute", right: 0, top: 0, fontSize: 20, cursor: 'pointer' }} />
                        <InputLabel>Produk</InputLabel>
                        <Select onChange={handleChangeProduk(`product`, index)}>
                          <MenuItem value="">
                            <em>None</em>
                          </MenuItem>
                          {listProduct.map((res) => (
                            <MenuItem value={res}>{res.name}</MenuItem>
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


                {/* <InputLabel>Produk</InputLabel>
                {listProduct.map((item, i) => (
                  <>
                    <TextField
                      fullWidth
                      label={`${item.name}`}
                      variant="outlined"
                      margin="normal"
                      onKeyUp={(event) => {
                        console.log(event.key);
                        if (event.key === "Backspace") {
                          setValue({
                            ...value,
                            [`product[${item.id}]`]: value[
                              `product[${item.id}]`
                            ].slice(0, -1),
                          });
                        }
                      }}
                      value={value[`product[${item.id}]`]}
                      onChange={handleChange(
                        `product[${item.id}]`,
                        true,
                        item.stok
                      )}
                    />
                    <p>
                      Stok tersisa{" "}
                      {value[`product[${item.id}]`]
                        ? item.stok - value[`product[${item.id}]`]
                        : item.stok}
                    </p>
                    <p>
                      Total Harga ({value[`product[${item.id}]`] || "0"}{" "}
                      {item.unit_product} x Rp.{" "}
                      {numberWithCommas(item.unit_price)}/{item.unit_product} =
                      Rp.{" "}
                      {value[`product[${item.id}]`]
                        ? numberWithCommas(
                            value[`product[${item.id}]`] *
                              Number(item.unit_price)
                          )
                        : "0"}
                      )
                    </p>
                    <br></br>
                  </>
                ))}
                 */}


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
                    <Select fullWidth value={2020}>
                      <MenuItem value={2020}>
                        <em>2020</em>
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
                  {/* <InputLabel id="demo-simple-select-outlined-label">
                    Jenis Akun
                  </InputLabel>
                  <Select
                    label="Metode Pembayaran"
                    value={value.account_id}
                    onChange={handleChange("account_id")}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {listAccount.map((item, i) => (
                      <MenuItem key={i} value={item.id}>
                        {item.name}
                      </MenuItem>
                    ))}
                  </Select> */}

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
                      {/* {listAccount.map((item, i) => (
                                            <MenuItem key={i} value={item.id}>{item.name}</MenuItem>
                                        ))} */}
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
                      // className="display-none"
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
                        // className={
                        //   "flex relative w-128 h-128 rounded-4 mr-16 mb-16 overflow-hidden cursor-pointer hover:shadow-5"
                        // }
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
                              src={createObjectURL(media)}
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
              {/* <MDBBox display="flex" justifyContent="center">
                                <MDBCardImage className="img-fluid" src="https://docs.devexpress.com/XtraReports/images/invoice-preview.png" style={{ height: 300 }} />
                            </MDBBox> */}
              {/* <TextField fullWidth label="Pesan" defaultValue="Default Value" variant="outlined" margin="normal" multiline rowsMax={4} /> */}
              {/* <MDBRow className="m-12">
                <MDBCol lg="4">
                  <TextField
                    fullWidth
                    label="Jumlah Item"
                    defaultValue="Default Value"
                    variant="outlined"
                    margin="normal"
                    type="number"
                    value={value.unit}
                    onChange={handleChange("unit")}
                  />
                </MDBCol>
                <MDBCol lg="8">
                  <TextField
                    fullWidth
                    label="Harga Satuan"
                    defaultValue="Default Value"
                    variant="outlined"
                    margin="normal"
                    type="number"
                    value={value.unit_price}
                    onChange={handleChange("unit_price")}
                  />
                </MDBCol>
              </MDBRow> */}
              {/* <MDBRow className="mt-3 mb-2">
                <MDBCol lg="8">
                  <b>TOTAL</b>
                </MDBCol>
                <MDBCol lg="4">
                  <b>
                    <NumberFormat
                      value={ammount}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"Rp. "}
                    />
                  </b>
                </MDBCol>
              </MDBRow> */}
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

export default withRouter(TransaksiMasukComponent);
