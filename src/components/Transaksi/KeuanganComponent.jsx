import React, { useState, useEffect, useContext } from "react";
import { Context as AuthContext } from "../../services/Context/AuthContext";
import { Context as CustomerContext } from "../../services/Context/CustomerContext";
import { Context as AccountContext } from "../../services/Context/AccountContext";
import { Context as IncomeContext } from "../../services/Context/IncomeContext";
import { Context as ProductContext } from "../../services/Context/ProductContext";
import Autocomplete from '@material-ui/lab/Autocomplete';
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
import { MDBCard, MDBCardBody, MDBRow, MDBCol, MDBBtn, MDBBox,MDBCardTitle } from "mdbreact";
import NumberFormat from "react-number-format";
import { useHistory, withRouter } from "react-router-dom";
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent'
import RemoveCircleOutlinedIcon from '@material-ui/icons/RemoveCircleOutlined';
const KeuanganComponent = (props) => {
  const defaultData = {
    invoice_number: "",
    repayment: "",
    type: ""
  };
  const [value, setValue] = useState(defaultData);
  const [openAlertLimit, setOpenAlertLimit] = useState(false);
  const [openDialogApprove, setOpenDialogApprove] = useState(false);
  const {state, ListIncomeBl,GetDetailIncome,AddPelunasan} = useContext(IncomeContext);
  const [dataTanggal, setDataTanggal] = useState([]);
  const [tanggal, setTanggal] = useState("");
  const [bulan, setBulan] = useState("");
  const [image, setImage] = useState([]);
  const [, setListData] = useState([]);
  const [form, setForm] = useState([]);
  useEffect(() => {
      ListIncomeBl("");
      setListData(state.ListIncomeBl);
      return () => {};
    }, []);
  
    useEffect(()=>{
      const obj = {
        remaining_payment: Math.abs(state.detailIncome.remaining_payment),
      }
      setForm(obj);
  },[state])

  const onTagsChange = (event, values) => {
    if(values){
      console.log(`value`, values.id);
    GetDetailIncome(values.id)
    console.log('CONTENT',state.detailIncome);
    }
  }

  const handleChange = (name, ket, stok) => (event) => {
    if(name == 'bulanan'){
      setForm({remaining_payment: event.target.value});
      setValue({
        repayment: event.target.value,
        type: 0,
        invoice_number: state.detailIncome.invoice_number,
      });
      if(event.target.value > Math.abs(state.detailIncome.remaining_payment)){
        // alert('Nominal melebihi sisa pembayaran')
        setOpenAlertLimit(true);
        setForm({remaining_payment:Math.abs(state.detailIncome.remaining_payment)});
      }
    }
    if(name == 'uangmuka'){
      setForm({remaining_payment: event.target.value});
      setValue({
        repayment: event.target.value,
        type: 1,
        invoice_number: state.detailIncome.invoice_number,
      });
      if(event.target.value > Math.abs(state.detailIncome.remaining_payment)){
        // alert('Nominal melebihi sisa pembayaran')
        setOpenAlertLimit(true);
        setForm({remaining_payment:Math.abs(state.detailIncome.remaining_payment)});
      }
    }
  }
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

  const handleApproveDialog = () => {
    setOpenDialogApprove(true);
  };

  const handleApproveCancle = () => {
    setOpenDialogApprove(false);
  };

  const AlertCencel = ()=>{
    setOpenAlertLimit(false)
  }
  const handleApproveProccess = () => {
    datas()
    handleValue(state.detailIncome)
  };

  const submit = async () => {
    let formdata = new FormData();
    const tamp = await Object.keys(value).map((res) => {
      console.log("tamp",res);
      formdata.append(res, value[res]);
    });

    Promise.all(tamp).then(() => {
      console.log(value);
      console.log(formdata);
      AddPelunasan(formdata, () => window.location.reload());
      setOpenDialogApprove(false);
    });
  }

  function handleValue(data){
    console.log('method',data);
    if(data.payment_method == 'Pembayaran Bulanan'){
      setValueBulanan()
      if(value.repayment == ''){
       setValueBulanan()
      }else{
        submit()
      }
      setTimeout(() => {
        console.log("VALUES BULANAN",value);
      }, 500);
      
    }
    if(data.payment_method == 'Pembayaran Uang Muka'){
      setValueUM()
      if(value.repayment == ''){
        setValueUM()
      }else{
          submit()
        }
      
      setTimeout(() => {
        console.log("VALUES",value);
      }, 500);
    
    }
  }
  function setValueBulanan(){
    setValue({
      repayment: Math.abs(state.detailIncome.remaining_payment),
      type: 0,
      invoice_number: state.detailIncome.invoice_number,
    });
  }
  function setValueUM(){
    setValue({
      repayment:Math.abs(state.detailIncome.remaining_payment),
      type:1,
      invoice_number:state.detailIncome.invoice_number,
    });
  }

  const alertLimit = () => (
    <Dialog
      open={openAlertLimit}
      onClose={AlertCencel}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{"Informasi !"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Nominal yang anda masukan Melebihi Sisa Pembayaran
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button color="secondary" onClick={AlertCencel}>
          OK
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
      <DialogTitle id="alert-dialog-title">{"Bayar?"}</DialogTitle>
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
          {state.loading ? state.message : "Bayar"}
        </Button>
      </DialogActions>
    </Dialog>
  );

  function payment(){
    if(state.detailIncome.payment_method == "Pembayaran Uang Muka"){
     return(
       <div>
        <TextField
      
      fullWidth
      label="Metode Pembayaran"
      variant="outlined"
      margin="normal"
      value="Pelunasan Uang Muka"
      
    />
                  <TextField
                      fullWidth
                      disabled
                      label="Sisa Pembayaran"
                      variant="outlined"
                      margin="normal"
                      value={form.remaining_payment}
                      onChange={handleChange("uangmuka")}
                    />   
       </div>
      
    
     ) 
    }else{
      return(
        <div>
        <TextField
        fullWidth
        label="Metode Pembayaran"
        variant="outlined"
        margin="normal"
        value="Pembayaran sisa bulanan"
        disabled
      />
          <TextField
                      fullWidth
                      label="Sisa Pembayaran"
                      variant="outlined"
                      margin="normal"
                      value={form.remaining_payment}
                      onChange={handleChange("bulanan")}
                    />   
        </div>
        
      )
    }
  }

  


  function showdatas(){
    if(state.detailIncome){
        return(
          <MDBRow className="m-3">
                <MDBCol lg="7">
                {alertLimit()}
                {dialogApprove()}
                  <form>
                    <TextField
                      fullWidth
                      label="Nama Pelanggan"
                      variant="outlined"
                      margin="normal"
                      multiline
                      rowsMax={4}
                      value={state.detailIncome.customer}
                      // onChange={handleChange("name")}
                    />
                    <br></br>
                    <br></br>
                    <TextField
                      fullWidth
                      label="Tanggal Jatuh Tempo"
                      variant="outlined"
                      margin="normal"
                      multiline
                      rowsMax={4}
                      value={state.detailIncome.due_date}
                      // onChange={handleChange("name")}
                    />
                    
                    <br></br>
            
                    {payment(state.detailIncome)}
                    
                  </form>
                </MDBCol>
                <MDBCol lg="5">
                <FormControl variant="outlined" margin="normal" fullWidth>
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
   
                  <MDBRow className="mt-3 mb-2">
                    <MDBCol lg="12">
                      <MDBBox display="flex" justifyContent="end">
                        <MDBBtn
                          color="dark-green"
                          onClick={() => handleApproveDialog("approve")}
                          disabled={state.loading}>
                          Simpan 
                        </MDBBtn>
                      </MDBBox>
                    </MDBCol>
    
                  </MDBRow>
                </MDBCol>
              </MDBRow>
        )}
        else{
          return false
        }
    
  }
  const datas_content = ()=>{
    let data = state.detailIncome
    if(data != undefined){
      return data
    }
  }
  function datas()  {
    let data = state.ListIncomeBl; 
    if (data !=undefined){
        let list_data = data
        // console.log('listdata',list_data);
        return list_data; 
    }
}


  var comboBox = () => {
    return (
      <Autocomplete
        id="combo-box-demo"
        options={top100Films}
        getOptionLabel={(option) => option.invoice_number}
        style={{ width: 600 ,marginLeft : 30}}
        onChange={onTagsChange}
        renderInput={(params) => <TextField {...params} label="Pilih Invoice" variant="outlined" />}
      />
    );
    }

    const top100Films = datas();
    // const top100Films = [
    //   { title: 'The Shawshank Redemption', year: 1994 },
    //   { title: 'The Godfather', year: 1972 },
    //   { title: 'The Godfather: Part II', year: 1974 },
    //   { title: 'The Dark Knight', year: 2008 },
    // ];
   
  return (
    <div>
      <h4>Transaksi Keuangan Penjualan</h4>
      <hr className="" />
      <MDBCard className="mb-2">
        <MDBCardBody className="p-1">
          <MDBRow className="m-3">
            <MDBCol lg="7">
            {comboBox()}
            </MDBCol>
            <MDBCol lg="3">
            </MDBCol>
          </MDBRow>
          <MDBRow className="m-3">
            <MDBCol lg="12">
            {showdatas()}
            </MDBCol>
          </MDBRow>
        </MDBCardBody>
      </MDBCard>
    </div>
  );
}
export default withRouter(KeuanganComponent);