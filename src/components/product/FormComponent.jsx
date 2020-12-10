import React, { useState, useContext, useRef, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  LinearProgress,
  IconButton,
} from "@material-ui/core";
import { MDBCard, MDBCardBody, MDBRow, MDBCol, MDBBtn, MDBBox } from "mdbreact";
import { DropzoneArea } from "material-ui-dropzone";
import { Context as ProductContext } from "../../services/Context/ProductContext";
import { Context as RawMaterialContext } from "../../services/Context/RawMaterialContext";
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Card from '@material-ui/core/Card';

import CardContent from '@material-ui/core/CardContent'
console.disableYellowBox = true;
const FormComponent = () => {
  const classes = useStyles();
  const { state, AddProduct } = useContext(ProductContext);
  const { state: { listMaterialRaw }, ListRawMaterial } = useContext(RawMaterialContext);
  const [file, setFile] = useState("");
  const [value, setValue] = useState({
    product_category_id: "",
    name: "",
    code: "",
    unit_product: "",
    stok: "",
    image: "",
    information: "",
  });
  const form = useRef(null);

  useEffect(() => {
    ListRawMaterial('');
  }, [])

  const [material, setMaterial] = useState([]);
  const handleChange = (name, index) => (event) => {
    console.group('name', name);
    console.log('event = ', event.target.value);

    if (name === 'raw_material') {
      setValue({
        ...value,
        [`${name}[${event.target.value.raw_material_category_id}]`]: '0',
      });
      setMaterial({
        ...material,
        [index]: event.target.value.raw_material_category_id
      })
    }
    else if (name === "stok" || name === "harga_produk")
      setValue({
        ...value,
        [name]: event.target.value.replace(/[^0-9]/g, ""),
      });
    else
      setValue({
        ...value,
        [name]: event.target.value,
      });
  };

  useEffect(() => {
    console.log(value)
  }, [value])
  const handleReset = () => {
    setValue({
      product_category_id: "",
      name: "",
      code: "",
      unit_product: "",
      stok: "",
      image: "",
      information: "",
    });
  };


  const submit = (e) => {
    e.preventDefault();
    let formData = new FormData();
    Object.keys(value).map((res) => {
      formData.append(res, value[res]);
    })
    formData.append("image", file);
    AddProduct(formData, () => handleReset());
  };
  const [count1, setCount] = useState([]);
  useEffect(() => {
    try {
      // console.log(Object.keys(material))
      console.log('material = ', material);
    } catch (error) {
      console.log('err  ', error)
    }

  }, [material])
  return (
    <div>
      <h4>Tambah Data Produk</h4>
      <hr className="" />
      {/* {JSON.stringify(file)} */}
      <MDBCard className="mb-2">
        {state.loading && <LinearProgress />}
        <MDBCardBody className="p-1">
          <form ref={form} onSubmit={submit}>
            <MDBRow className="m-3">
              <MDBCol lg="7">
                <TextField
                  fullWidth
                  type="text"
                  label="Nama Produk"
                  variant="outlined"
                  margin="normal"
                  onChange={handleChange("name")}
                  value={value.name}
                  name="value[name]"
                />
                <TextField
                  fullWidth
                  type="text"
                  label="Kode Produk"
                  variant="outlined"
                  margin="normal"
                  onChange={handleChange("code")}
                  value={value.code}
                  name="value[code]"
                />
                <FormControl fullWidth className={classes.formControl}>
                  <InputLabel>Kategori Produk</InputLabel>
                  <Select
                    value={value.product_category_id}
                    onChange={handleChange("product_category_id")}>
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={1}>Roti Sobek</MenuItem>
                    <MenuItem value={2}>Roti Tawar</MenuItem>
                  </Select>
                </FormControl>
                <FormControl fullWidth className={classes.formControl}>
                  <InputLabel>Satuan Produk</InputLabel>
                  <Select
                    value={value.unit_product}
                    onChange={handleChange("unit_product")}>
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value="Unit">Unit</MenuItem>
                    <MenuItem value="Lusin">Lusin</MenuItem>
                    <MenuItem value="Item">Item</MenuItem>
                  </Select>
                </FormControl>
                <div style={{ display: 'flex', alignItems: "center", justifyContent: "space-between" }}>
                  <p style={{ marginTop: '20px' }}>Tambah Material</p>
                  <AddCircleIcon onClick={() => setCount([...count1, 'A'])} />
                </div>

                {count1.map((res, index) => (
                  <Card style={{ marginTop: '10px' }}>
                    <CardContent>
                      <FormControl fullWidth className={classes.formControl}>
                        <InputLabel>Material</InputLabel>
                        <Select
                          value={value.raw_material_category_id}
                          onChange={handleChange(`raw_material`, index)}>
                          <MenuItem value="">
                            <em>None</em>
                          </MenuItem>
                          {listMaterialRaw.map((res) => (
                            <MenuItem value={res}>{res.name}</MenuItem>
                          ))}
                        </Select>
                      </FormControl>

                      <TextField
                        fullWidth
                        label="Material 1"
                        variant="outlined"
                        margin="normal"
                        onChange={handleChange(`raw_material[${material[index]}]`)}
                        value={value[`raw_material[${material[index]}]`]}
                      />
                    </CardContent>
                  </Card>

                ))}


                <TextField
                  fullWidth
                  label="Harga Produk"
                  variant="outlined"
                  margin="normal"
                  onChange={handleChange("harga_produk")}
                  value={value.harga_produk}
                />

                <TextField
                  fullWidth
                  label="Menu Produk"
                  variant="outlined"
                  margin="normal"
                  onChange={handleChange("menu_produk")}
                  value={value.menu_produk}
                />
              </MDBCol>
              <MDBCol lg="5">
                <DropzoneArea
                  acceptedFiles={["image/jpeg", "image/png", "image/bmp"]}
                  filesLimit={1}
                  onChange={(file) => setFile(file[0])}
                  maxFileSize={5000000}
                />
                <TextField
                  fullWidth
                  label="Keterangan"
                  variant="outlined"
                  margin="normal"
                  multiline
                  rows={3}
                  rowsMax={5}
                  onChange={handleChange("information")}
                />
                <MDBRow className="mt-3 mb-2">
                  <MDBCol lg="6">
                    <MDBBox display="flex" justifyContent="start">
                      <MDBBtn color="danger" onClick={handleReset}>
                        Reset
                      </MDBBtn>
                    </MDBBox>
                  </MDBCol>
                  <MDBCol lg="6">
                    <MDBBox display="flex" justifyContent="end">
                      <MDBBtn
                        color="dark-green"
                        type="submit"
                        disabled={state.loading}
                      >
                        Simpan Produk
                      </MDBBtn>
                    </MDBBox>
                  </MDBCol>
                </MDBRow>
              </MDBCol>
            </MDBRow>
          </form>
        </MDBCardBody>
      </MDBCard>
    </div>
  );
};

export default FormComponent;

const useStyles = makeStyles((theme) => ({
  formControl: {
    marginTop: theme.spacing(1),
    minWidth: 220,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));
