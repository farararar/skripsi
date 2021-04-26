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
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
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
  const [openAletDouble , setOpenAletDouble] = useState(false);
  const [selectedDate, setSelectedDate] = useState();
  const [dataTanggal, setDataTanggal] = useState([]);
  const [tanggal, setTanggal] = useState("");
  const [bulan, setBulan] = useState("");
  const [ammount, setAmmount] = useState(0);
  const [image, setImage] = useState([]);
  const [count1, setCount] = useState([]);
  const [product, setProduct] = useState([]);
  const [tempProduct, setTempProduct] = useState({});
  const [selectedDateTempo, setSelectedDateTempo] = useState();
  const [subtotal, setSubtotal] = useState();
  const [total, setTotal] = useState();
  const [price, setPrice] = useState([]);
  
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
    uang_muka: "",
    jatuh_tempo: ""
  };

  const [value, setValue] = useState(defaultData);
  let today = new Date();
  const handleChange = (name, ket, stok) => (event) => {
    console.log('firs render = ', value[name] ? value[name] : "0");
    if (event.target.value == 'Pembayaran Uang Muka') {
      console.log('show field');
      let paymentod = event.target.value
      tex_dp(paymentod)
    
    }
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

  function tex_dp(paymentod) {
    if (paymentod == 'Pembayaran Bulanan') {
      return (
        <TextField
          fullWidth label="Uang Muka"
          variant="outlined"
          margin="normal"
          multiline rowsMax={4}
          value={0}
          onChange={handleChange("uang muka")} />
      )
    }
  };

  function jatuhtempo(paymentod) {
    if (paymentod == 'Pembayaran Bulanan') {
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

  useEffect(() => {
  
    let temp = [];
    let tp = {}
    let ti = {}
    let vp = {}
    let subtol = {}
    let prc = {}
    
    state.detailIncome && state.detailIncome.products.map((res, index) => {
      console.log("LIST PROD",res, index);
      tp[index] = res.product.name
      ti[index] = res.product_id
      subtol[index] = parseInt(res.stock) * res.product.unit_price
      prc[index] = res.product.unit_price
      vp[`${'product'}[${res.product_id}]`] = res.stock
      temp.push("A");
      setPrice(prc)
      setSubtotal(subtol);
    });
    
    setCount(temp);
    setTempProduct(tp);
    setProduct(ti);
    setValue({
      ...state.detailIncome,
      ...vp,
    });
    console.log('CURRET PROD',tempProduct);
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
    console.log('EV',event.target.value);
    console.log('INDEX',index)
    let temp = '';
      let id_prod = '';
      let price_prod = '';
      let tp = '';
    if (name === 'product') {
      
      listProduct.map((res,index) => {
        console.log('name = ', event.target.value);
        if (event.target.value === res.name) {
          console.log('filter = ', res,index);
          temp = res.id
          id_prod = res.id
          price_prod = res.unit_price
          tp = res.name
        }
      });

      const prod_val =  Object.values(product)
      if (prod_val.includes(id_prod)) {
        handleDoubleDialog('ok')
        removeCard(index)
        return null
      }
      setTempProduct({
        ...tempProduct,
        [index] : tp
      });
      setProduct({
        ...product,
        [index]: id_prod
      })
      setPrice({
        ...price,
        [index]:  price_prod
      })
      console.log('prod_price',price_prod);

      setSubtotal({
        ...subtotal,
        [index]: 1 * price_prod,
      });

      setValue({
        ...value,
        ['product['+id_prod+']']: 1,
      });

      

      console.log('PRICE',price[index]);
  }else{
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
  
        setSubtotal({
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
  if(subtotal != undefined){
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
  }else{
    console.log(subtotal);
  }
  
  
  console.log('value amount',total);

}



useEffect(()=>{
  console.log("Subtotal.. : ", subtotal)
  console.log('TOTAL',total);
  updateTotalPrice()
})

  const alertDouble = () => (
    <Dialog
      open={openAletDouble}
      onClose={handleDoubleCancle}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{"Ada Kesalahan"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Produk sudah ada pada daftar pembelian silahkan pilih produk lain
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDoubleCancle} color="primary">
          Ok
        </Button>
       
      </DialogActions>
    </Dialog>
  );

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

  const handleDateTempoChange = (dateTempo) => {
    let formattedDateTempo = dateTempo.getFullYear() + "-" + ("0" + (dateTempo.getMonth() + 1)).slice(-2) + "-" + ("0" + dateTempo.getDate()).slice(-2)
    setSelectedDateTempo(dateTempo);
    setValue({
      ...value,
      dateTempo: formattedDateTempo,
    });
  }

  const handleApproveDialog = () => {
    setOpenDialogApprove(true);
    
  };

  const handleApproveCancle = () => {
    setOpenDialogApprove(false);
    
  };

  const handleDoubleDialog = () => {
    setOpenAletDouble(true);
    
  };

  const handleDoubleCancle = () => {
    setOpenAletDouble(false);
    
  };

  const [trigger, setTrigger] = useState(null);

  const handleApproveProccess = async () => {
    let formdata = new FormData();
    const tamp = await Object.keys(value).map(async (res) => {
      console.log("VALUE POST",value['date']);

      if (res === "date") {
        //formdata.append(res, value.date)
      } else if (
        // res === "user_id" ||
        res == "shift" ||
        res == "customer" ||
        res == "invoice_number" ||
        res == "information" ||
        res == "payment_method" ||
        res == "date" ||
        res == "description" ||
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
    formdata.append('kantor','0')
    formdata.append('date',value['date'])
    formdata.append('image',null)
    formdata.append("user_id", data.user_id);
    Promise.all(tamp).then(() => {
      UpdateIncome(data.id, formdata, Next, () => {
        history.push('/list-transaksi-admin')
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
      <br></br>
      <h4>Edit Transaksi</h4>
      <hr className="" />
      <MDBCard className="mb-2">
        {dialogApprove()}
        {alertDouble()}
        {state.loading && <LinearProgress />}
        <MDBCardBody className="p-1">
          <MDBRow className="m-3">
            <MDBCol lg="6">
              <form>
                <TextField
                  fullWidth
                  label="No. Transaksi / Invoice"
                  variant="outlined"
                  InputLabelProps={{
                          shrink: true,
                        }}
                  margin="normal"
                  value={value.invoice_number}
                  onChange={handleChange("invoice_number")}
                />
                <TextField
                  fullWidth
                  label="Nama Customer"
                  variant="outlined"
                  InputLabelProps={{
                          shrink: true,
                        }}
                  margin="normal"
                  value={value.customer}
                  onChange={handleChange("customer")}
                />
                <TextField
                  fullWidth
                  label="Deskripsi Transaksi"
                  variant="outlined"
                  margin="normal"
                  InputLabelProps={{
                          shrink: true,
                        }}
                  multiline
                  rowsMax={4}
                  value={value.description}
                  onChange={handleChange("description")}
                />
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
              </form>
              <br></br>
              <div style={{ display: 'flex', alignItems: "center", justifyContent: "space-between" }}>
                <p style={{ marginTop: '20px' }}>Tambah Produk</p>
                <AddCircleIcon onClick={() => setCount([...count1, 'A'])} style={{ cursor: 'pointer' }} />
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
                  <MenuItem value="Pembayaran Bulanan">
                    Pembayaran Bulanan
                  </MenuItem>
                  <MenuItem value="Pembayaran Sisa Bulanan">
                    Pembayaran Sisa Bulanan
                  </MenuItem>
                  <MenuItem value="Retur Penjualan">Retur Penjualan</MenuItem>
                </Select>
              </FormControl>
              {tex_dp(value.payment_method)}
              <br></br>
              {jatuhtempo(value.payment_method, value.due_date)}
            </MDBCol>
          </MDBRow>

          {count1.map((res, index) => (
            <>
              {res === "A" && <Card style={{ marginTop: '10px' }}>
                <CardContent>
                  <MDBRow className="m-12">
                    <MDBCol lg="3">
                      <FormControl fullWidth >
                      <RemoveCircleOutlinedIcon onClick={() => removeCard(index)} style={{ color: 'red', alignItems: 'flex-end', position: "absolute", fontSize: 25, cursor: 'pointer', marginLeft: 930, marginTop: -15 }} />
                        <br></br>
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
                    </MDBCol>
                    <MDBCol lg="3">
                      <TextField
                        fullWidth
                        label={"Jumlah Produk"}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        type="number"
                        variant="outlined"
                        margin="normal"
                        onChange={handleChangeProduk(`product[${product[index]}]`,index)}
                        value={value[`product[${product[index]}]`]}
                      />
                    </MDBCol>
                    <MDBCol lg="3">
                      <TextField
                        fullWidth
                        id="Harga"
                        label = "Harga"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        InputProps={{
                          readOnly: true,
                        }}
                        variant="outlined"
                        margin="normal"
                        value= {price[index]}
                        // value={value.products[index].product.unit_price}
                      />
                    </MDBCol>
                    <MDBCol lg="3">
                      <TextField
                        fullWidth
                        label={"Total Harga"}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        InputProps={{
                          readOnly: true,
                        }}
                        variant="outlined"
                        margin="normal"
                       value= {subtotal[index]}
                      //  value={value.products[index].product.unit_price * value[`product[${product[index]}]`]}
                      />
                    </MDBCol>
                  </MDBRow>
                </CardContent>
              </Card>}
            </>
          ))}

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
                    defaultValue={value.ammount}
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
          </MDBRow>
        </MDBCardBody>
      </MDBCard>
    </div >
  );
};

export default withRouter(TransaksiMasukComponent);
