import React, {useState, useContext, useRef} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Select, MenuItem, InputLabel, FormControl, LinearProgress } from '@material-ui/core';
import { MDBCard, MDBCardBody, MDBRow, MDBCol, MDBBtn, MDBBox } from 'mdbreact';
import {DropzoneArea} from 'material-ui-dropzone'
import {Context as ProductContext} from '../../services/Context/ProductContext'

const FormEditComponent = () => {
    const classes = useStyles();
    const {state, AddProduct} = useContext(ProductContext)
    const [file, setFile] = useState('')
    const [value, setValue] = useState({
        product_category_id: '',
        name: '',
        code: '',
        unit_product: '',
        stok: '',
        image: '',
        information: ''
    })
    const form = useRef(null)


    const handleChange = name => event => {
        setValue({
            ...value,
            [name]: event.target.value
        })
    }
    const handleReset = () => {
        setValue({
            product_category_id: '',
            name: '',
            code: '',
            unit_product: '',
            stok: '',
            image: '',
            information: ''
        })
    }


    const submit = e => {
        e.preventDefault()
        let formData = new FormData();
        formData.append('product_category_id', value.product_category_id)
        formData.append('name', value.name)
        formData.append('code', value.code)
        formData.append('unit_product', value.unit_product)
        formData.append('stok', value.stok)
        formData.append('image', file)
        formData.append('information', value.information)
        AddProduct(formData, () => handleReset())
    }
    
    return (
        <div>
            <h4>Tambah Data Produk</h4>
            <hr className="" />
            {/* {JSON.stringify(file)} */}
            <MDBCard className='mb-2'>
                {state.loading && ( <LinearProgress /> )}
                <MDBCardBody className='p-1'>
                    <form ref={form} onSubmit={submit}>
                        <MDBRow className='m-3'>
                            <MDBCol lg="7">
                                <TextField fullWidth type='text' label="Nama Produk" variant="outlined" margin="normal" onChange={handleChange('name')} value={value.name} name="value[name]"  />
                                <TextField fullWidth type='text' label="Kode Produk" variant="outlined" margin="normal" onChange={handleChange('code')} value={value.code} name="value[code]" />
                                <FormControl fullWidth className={classes.formControl}>
                                    <InputLabel>Kategori Produk</InputLabel>
                                    <Select onChange={handleChange('product_category_id')}>
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={1}>Roti Sobek</MenuItem>
                                    <MenuItem value={2}>Roti Tawar</MenuItem>
                                    </Select>
                                </FormControl>
                                <FormControl fullWidth className={classes.formControl} >
                                    <InputLabel>Satuan Produk</InputLabel>
                                    <Select onChange={handleChange('unit_product')}>
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value='Unit'>Unit</MenuItem>
                                    <MenuItem value='Lusin'>Lusin</MenuItem>
                                    <MenuItem value='Item'>Item</MenuItem>
                                    </Select>
                                </FormControl>
                                <TextField fullWidth label="Stok Produk" variant="outlined" margin="normal" type='number' onChange={handleChange('stok')} value={value.stok} />
                            </MDBCol>
                            <MDBCol lg="5">
                                <DropzoneArea acceptedFiles={['image/jpeg', 'image/png', 'image/bmp']} filesLimit={1} onChange={(file) => setFile(file[0])} maxFileSize={5000000}/>
                                <TextField fullWidth label="Keterangan" variant="outlined" margin="normal" multiline rows={3} rowsMax={5} onChange={handleChange('information')} />
                                <MDBRow className='mt-3 mb-2'>
                                    <MDBCol lg="6">
                                        <MDBBox display="flex" justifyContent="start">
                                            <MDBBtn color="danger" onClick={handleReset}>
                                                Reset
                                            </MDBBtn>
                                        </MDBBox>
                                    </MDBCol>
                                    <MDBCol lg="6" >
                                        <MDBBox display="flex" justifyContent="end">
                                            <MDBBtn color="dark-green" type='submit' disabled={state.loading}>
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
}

export default FormEditComponent;

const useStyles = makeStyles((theme) => ({
    formControl: {
        marginTop: theme.spacing(1),
        minWidth: 220,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));