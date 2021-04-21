import React, { useState, useEffect, useContext } from "react";
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
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
  const [subtotal, onChangeSubtotal] = useState([]);

  const history = useHistory()
  const { isAuthenticated } = useContext(AuthContext);
  const [selectedDate, setSelectedDate] = useState();
  const [selectedDateTempo, setSelectedDateTempo] = useState();
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
    ListProduct
  } = useContext(ProductContext);

  const { state, AddIncome } = useContext(IncomeContext);
  const [openDialogApprove, setOpenDialogApprove] = useState(false);
  const [dataTanggal, setDataTanggal] = useState([]);
  const [tanggal, setTanggal] = useState("");
  const [bulan, setBulan] = useState("");
  const [tanggal_jt, setTanggal_jt] = useState("");
  const [bulan_jt, setBulan_jt] = useState("");
  const [ammount, setAmmount] = useState(0);
  const [total, setTotal] = useState();
  const [jmlprod, setJmlprod] = useState();
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
    uang_muka: "",
    jatuh_tempo: "",
    
  };

  function tex_dp(paymentod) {
    if (paymentod == 'Pembayaran Uang Muka' || paymentod == 'Pembayaran Bulanan') {
      return (
        <TextField
          fullWidth label="Uang Muka"
          variant="outlined"
          margin="normal"
          multiline rowsMax={4}
          value={value.uang_muka}
          onChange={handleChange("uang_muka")} />
      )
    }
  };

  function jatuhtempo(paymentod) {
    if (paymentod == 'Pembayaran Uang Muka' || paymentod == 'Pembayaran Bulanan') {
      return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            margin="normal"
            id="date-picker-transaksi"
            label="Tanggal Jatuh Tempo"
            format="dd/MM/yyyy"
            value={selectedDateTempo}
            views={["date"]}
            onChange={handleDateTempoChange}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
        </MuiPickersUtilsProvider>
      )
    }
  };

  const [value, setValue] = useState(defaultData);
  let today = new Date();
  const handleChange = (name, ket, stok) => (event) => {
    if (event.target.value == 'Pembayaran Uang Muka') {
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

  const handleDateChange = (date) => {
    let formattedDate = date.getFullYear() + "-" + ("0" + (date.getMonth() + 1)).slice(-2) + "-" + ("0" + date.getDate()).slice(-2)
    setSelectedDate(date);
    setValue({
      ...value,
      date: formattedDate,
    });
  }

  const handleDateTempoChange = (dateTempo) => {
    let formattedDateTempo = dateTempo.getFullYear() + "-" + ("0" + (dateTempo.getMonth() + 1)).slice(-2) + "-" + ("0" + dateTempo.getDate()).slice(-2)
    setSelectedDateTempo(dateTempo);
    setValue({
      ...value,
      dateTempo: formattedDateTempo,
    });
  }

  useEffect(() => {
    // Update the document title using the browser API
    console.log("VALUE : ", value)
    console.log("Subtotal.. : ", subtotal)
    updateTotalPrice()  
    // document.title = `You clicked ${JSON.stringify(subtotal)} times`;
  });
  
  const handleChangeProduk = (name, index) => (event) => {
    // console.log("Index : ", index)
    console.log('name', name);
    // console.log('event = ', event.target.value);

    if (name === 'product') {
      let id_prod = event.target.value.id

      const prod_val  = Object.values(product)
      if (prod_val.includes(id_prod)) {
        alert("produk sudah ada di daftar pembelian")
        removeCard(index)
        return(null)
      }
      // setJmlprod(1)
      setProduct({
        ...product,
        [index]: event.target.value.id
      })
      setPrice({
        ...price,
        [index]:  event.target.value.unit_price
      })
      let prod_price = event.target.value.unit_price;
      console.log('prod_price',price);

      onChangeSubtotal({
        ...subtotal,
        [index] : 1 * prod_price
      });

     
      setValue({
        ...value,
        ['product['+id_prod+']']: 1,
      });

      
        
       
        
        if(subtotal.length === 0){
          console.log('Sakali deui');
          setTotal(1 * prod_price); 
          
        }else{
          updateTotalPrice()   
        }
        
      
      
    } else {
      let new_qty = parseInt(event.target.value)
      console.log("Subtotal awal : ", subtotal)
      console.log('new qty',new_qty);
      if(isNaN(new_qty) || new_qty < 0){
        console.log('is not nummber');
      }else{
        setValue({
          ...value,
          [name]: new_qty,
        });
  
        onChangeSubtotal({
          ...subtotal,
          [index]: new_qty * price[index],
        });
        console.log("Price : ", price[index])
        console.log("New Subtotal awal : ", subtotal)
        updateTotalPrice()
      }
      
      
      
    }
    
    
  }

  
  
  const updateTotalPrice = async () => {
    let total_price;
    total_price = Object.values(subtotal);
    console.log('GRAND',total_price);
    let sum = total_price.reduce((a, b) => a + b, 0)
    console.log('SUM',sum);
    if(sum == 0){
      let total_price;
      total_price = Object.values(subtotal);
      console.log('GRAND',total_price);
      let sum = total_price.reduce((a, b) => a + b, 0)
      console.log('SUM',sum);
      setTotal(sum);
    }else{
      setTotal(sum);
    }
    
    console.log('value amount',total);

  }
  
  const ammount_value = () =>{
    return value.ammount;
  }
  
  // const updateTotalPrice = async () => {
  //   let total_price = 0
  //   const tamp = await Object.values(subtotal).map((v) => {
  //     console.log("testes",v);
  //     total_price = total_price + v
  //   });
  //   Promise.all(tamp).then(() => {
  //     console.log("Total Price : ", total_price);
  //     setValue({
  //       ...value,
  //       ['ammount']: total_price,
  //     });
  //   });
  // }

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
    console.log(value)
    const tamp = await Object.keys(value).map((res) => {
      console.log(res);
      formdata.append('image',null)
      if (res === "date") {
        formdata.append(res, value.date)
      } else if (res === "jatuh_tempo") {
        formdata.append(res, value.dateTempo)
      }
      else {
        formdata.append(res, value[res]);
      }
    });
    Promise.all(tamp).then(() => {
      console.log(formdata);
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
  const [price, setPrice] = useState([]);
  

  const removeCard = (index) => {
    console.log(index);
    console.log(value[`product[${product[index]}]`])
    delete value[`product[${product[index]}]`]
    let newArr = [...count1];
    newArr[index] = 'B';
    setCount(newArr);
    // updateTotalPrice()
  }

  // useEffect(() => {
  //   console.log(subtotal);
  // }, [subtotal])

  const addProduct = () =>{
    console.log('Sub total',subtotal);
    setCount([...count1, 'A'])
  }

  return (
    <div>
      <h4>Input Transaksi Masuk</h4>
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
                <br></br>
                <br></br>
              </form>
              <div style={{ display: 'flex', alignItems: "center", justifyContent: "space-between" }}>
                <p style={{ marginTop: '15px' }}>Tambah Produk</p>
                <AddCircleIcon onClick={addProduct} />
              </div>
            </MDBCol>
            <MDBCol lg="6">
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
                  <MenuItem value="Retur Penjualan">Retur Penjualan</MenuItem>
                </Select>
              </FormControl>
              {tex_dp(value.payment_method)}
              <br></br>
              {jatuhtempo(value.payment_method)}
              {/*<TextField
                fullWidth
                label="Keterangan"
                variant="outlined"
                margin="normal"
                multiline
                rows={3}
                rowsMax={5}
                value={value.information}
                onChange={handleChange("information")}
              />*/}
            </MDBCol>
          </MDBRow>

          {count1.map((res, index) => (
            <>
              {res === "A" && <Card style={{ marginTop: '10px' }}>
                <CardContent>
                  <MDBRow className="m-12">
                    <MDBCol lg="3">
                      <FormControl fullWidth>
                        <RemoveCircleOutlinedIcon onClick={() => removeCard(index)} style={{ color: 'red', alignItems: 'flex-end', position: "absolute", fontSize: 25, cursor: 'pointer', marginLeft: 930, marginTop: -15 }} />
                        <br></br>
                        <InputLabel>Produk</InputLabel>
                        <Select onChange={handleChangeProduk('product', index)}>
                          <MenuItem value="">
                            <em>None</em>
                          </MenuItem>
                          {listProduct.map((res) => (
                            <MenuItem value={res}>{res.name}</MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </MDBCol>
                    <MDBCol lg="3">
                    
                      <TextField
                        fullWidth
                        variant="outlined"
                        margin="normal"
                        label="Jumlah Produk"
                        type="number"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        onChange={handleChangeProduk(`product[${product[index]}]`, index)}
                        value={value[`product[${product[index]}]`]}
                        // defaultValue={jmlprod}
                      />
                      
                    </MDBCol>
                    <MDBCol lg="3">
                    
                      <TextField
                        fullWidth
                        id="Harga"
                        variant="outlined"
                        label="Harga"
                        InputProps={{
                          readOnly: true,
                        }}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        margin="normal"
                        value={price[index]}
                      />
                    </MDBCol>
                    <MDBCol lg="3">
                    
                      <TextField
                        fullWidth
                        label="Total Harga"
                        InputProps={{
                          readOnly: true,
                        }}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        variant="outlined"
                        
                        margin="normal"
                        value={subtotal[index]}
                      />
                    </MDBCol>
                  </MDBRow>
                </CardContent>
              </Card>}
            </>
          ))}

          <br></br>
          <br></br>
          <MDBCol lg="12">
            <MDBRow className="mt-3 mb-2">
              <MDBCol lg="10">
                <b>TOTAL TRANSAKSI</b>
                <br></br>
              </MDBCol>
              <MDBCol lg="2">
                <b>
                  <NumberFormat
                    // value={value.ammount}
                    value={total}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"Rp. "}
                  />
                </b>
              </MDBCol>
            </MDBRow>
          </MDBCol>
          <Divider style={{ variant: "middle", width: '100%' }} />
          <br></br>
          <br></br>

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
        </MDBCardBody>
      </MDBCard>
    </div>
  );
};

export default withRouter(TransaksiMasukComponent);