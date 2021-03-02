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
<<<<<<< HEAD
  
=======
>>>>>>> 7bcb6f993b11653d0e16f6f6cced064d552663a3
  const { state, AddIncome } = useContext(IncomeContext);
  const [openDialogApprove, setOpenDialogApprove] = useState(false);
  const [dataTanggal, setDataTanggal] = useState([]);
  const [tanggal, setTanggal] = useState("");
  const [bulan, setBulan] = useState("");
  const [tanggal_jt, setTanggal_jt] = useState("");
  const [bulan_jt, setBulan_jt] = useState("");
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
    uang_muka :"",
    jatuh_tempo : ""
  };
  
  
  
  function tex_dp(paymentod){
    if(paymentod == 'Pembayaran Uang Muka' || paymentod == 'Pembayaran Bulanan'){
      return (
        <TextField 
        fullWidth label="Uang Muka" 
        variant="outlined" 
        margin="normal" 
        multiline rowsMax={4} 
        value={value.uang_muka}
        onChange={handleChange("uang_muka")}/>
      )
    }
  };
  function jatuhtempo(paymentod){
    if(paymentod == 'Pembayaran Uang Muka'|| paymentod == 'Pembayaran Bulanan'){
      return (
        
        <MDBRow className="m-12">
                <br></br>
                  <MDBCol lg="4">
                    <InputLabel>Tanggal</InputLabel>
                    <Select
                      fullWidth
                      value={tanggal_jt}
                      onChange={(event) => setTanggal_jt(event.target.value)}
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
                      value={bulan_jt}
                      onChange={(event) => setBulan_jt(event.target.value)}
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
                      <MenuItem value={2019}>
                        <em>2019</em>
                      </MenuItem>
                      <MenuItem value={2020}>
                        <em>2020</em>
                      </MenuItem>
                      <MenuItem value={2021}>
                        <em>2021</em>
                      </MenuItem>
                    </Select>
                  </MDBCol>
                </MDBRow>
      )
    }
  };

  const [value, setValue] = useState(defaultData);
  let today = new Date();
  const handleChange = (name, ket, stok) => (event) => {
    if(event.target.value == 'Pembayaran Uang Muka'){
      console.log('show field');
      let paymentod = event.target.value
      tex_dp(paymentod)
    }
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
      } else if (res === "jatuh_tempo"){
        formdata.append(res, today.getFullYear() + "-" + bulan_jt+ "-" + tanggal_jt);
      }
      else {
        formdata.append(res, value[res]);
      }
    });
    Promise.all(tamp).then(() => {
      // history.push('/transaksi-masuk')
      // location.reload()
<<<<<<< HEAD
      console.log(formdata);
=======

>>>>>>> 7bcb6f993b11653d0e16f6f6cced064d552663a3
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
                <TextField
                fullWidth
                label="Nama Customer"
                variant="outlined"
                margin="normal"
                value={value.customer}
                onChange={handleChange("customer")}
              />
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
<<<<<<< HEAD
                      <MenuItem value={2019}>
                        <em>2019</em>
                      </MenuItem>
                      <MenuItem value={2020}>
                        <em>2020</em>
                      </MenuItem>
=======
>>>>>>> 7bcb6f993b11653d0e16f6f6cced064d552663a3
                      <MenuItem value={2021}>
                        <em>2021</em>
                      </MenuItem>
                    </Select>
                  </MDBCol>
                </MDBRow>
                <br></br>
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
<<<<<<< HEAD
                  <MenuItem value="Retur Penjualan">Retur Penjualan</MenuItem>
                </Select>
              </FormControl>
              {tex_dp(value.payment_method)}
              {jatuhtempo(value.payment_method)}
=======
                    <MenuItem value="Retur Penjualan">Retur Penjualan</MenuItem>
                  </Select>
                </FormControl>
>>>>>>> 7bcb6f993b11653d0e16f6f6cced064d552663a3
                <FormControl variant="outlined" margin="normal" fullWidth>
                    <InputLabel id="demo-simple-select-outlined-label">
                      Kantor
                    </InputLabel>
                    <Select
                      label="Kantor"
                      value={value.kantor}
                      onChange={handleChange("kantor")}
                    >
                      <MenuItem value="">
                        <em>Pilih...</em>
                      </MenuItem>
                      {[
                        { id: 0, value: "cabang" },
                        { id: 1, value: "pusat" },
                      ].map((item, i) => (
                        <MenuItem key={i} value={item.id}>
                          {item.value}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
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
              </form>
            </MDBCol>
            <MDBCol lg="">
              <Divider />
              <Divider />
              <br></br>
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
                            padding: "120px",
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
                              margin: "10px",
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
                  <br></br>
                <div style={{ display: 'flex', alignItems: "center", justifyContent: "space-between" }}>
                  <p style={{ marginTop: '15px' }}>Tambah Produk</p>
                  <AddCircleIcon onClick={() => setCount([...count1, 'A'])} />
                </div>
              {count1.map((res, index) => (
                  <>
                    {res === "A" && <Card style={{ marginTop: '10px' }}>
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
