import React, { useState, useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Select, MenuItem, InputLabel, FormControl, LinearProgress } from '@material-ui/core';
import { MDBCard, MDBCardBody, MDBRow, MDBCol, MDBBtn, MDBBox } from 'mdbreact';
import {Context as MaterialCategoryContext} from '../../services/Context/MaterialCategoryContext'
import {Context as RawMaterialContext} from '../../services/Context/RawMaterialContext'

const FormComponent = () => {
    const classes = useStyles();
    const {state:{listMaterialCategory}, ListMaterialCategory} = useContext(MaterialCategoryContext)
    const {state, AddRawMaterial} = useContext(RawMaterialContext)
    const [value, setValue] = useState({
        raw_material_category_id: '',
        name : '',
        code : '',
        type : '', 
        unit_buy : '',
        unit_use : '',
    })

    useEffect(() => {
        ListMaterialCategory()
    }, []);

    const handleChange = name => event => {
        setValue({
            ...value,
            [name]: event.target.value
        })
    }

    const handleReset = () => {
        setValue({
            raw_material_category_id: '',
            name : '',
            code : '',
            type : '', 
            unit_buy : '',
            unit_use : '',
        })
    }

    const handleSave = () => {
        let data = {
            raw_material_category_id: value.raw_material_category_id,
            name : value.name,
            code : value.code,
            type : value.type, 
            unit_buy : value.unit_buy,
            unit_use : value.unit_buy,
        }
        AddRawMaterial(data, () => handleReset())
    }

    return (
        <div>
            <h4>Tambah Data Bahan Baku</h4>
            <hr className="" />
            {/* {JSON.stringify(value)} */}
            {state.loading && (
                <LinearProgress />
            )}
            <MDBCard className='mb-2'>
                <MDBCardBody className='p-1'>
                    <MDBRow className='m-3'>
                        <MDBCol lg="7">
                            <TextField fullWidth label="Nama Bahan Baku" variant="outlined" margin="normal" value={value.name} onChange={handleChange('name')} />
                            <TextField fullWidth label="Kode Bahan Baku" variant="outlined" margin="normal" value={value.code} onChange={handleChange('code')}/>
                            <FormControl fullWidth className={classes.formControl}>
                                <InputLabel>Kategori Bahan Baku</InputLabel>
                                <Select onChange={handleChange('raw_material_category_id')}>
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    {listMaterialCategory.map(item => (
                                        <MenuItem value={item.id}>{item.name}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            {/* <TextField fullWidth label="Unit Konversi(x)" variant="outlined" margin="normal" type='number' /> */}
                        </MDBCol>
                        <MDBCol lg="5">
                            <FormControl fullWidth className={classes.formControl}>
                                <InputLabel>Jenis</InputLabel>
                                <Select onChange={handleChange('type')}>
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={1}>Bahan Baku Langsung</MenuItem>
                                    <MenuItem value={2}>Bahan Baku Tidak Langsung</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl fullWidth className={classes.formControl}>
                                <InputLabel>Satuan Beli</InputLabel>
                                <Select onChange={handleChange('unit_buy')}>
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value='Kilogram'>Kilogram</MenuItem>
                                    <MenuItem value='Pcs'>Pcs</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl fullWidth className={classes.formControl}>
                                <InputLabel>Satuan Guna</InputLabel>
                                <Select onChange={handleChange('unit_use')}>
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value='Gram'>Gram</MenuItem>
                                    <MenuItem value='Butir'>Butir</MenuItem>
                                </Select>
                            </FormControl>
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
                                        <MDBBtn color="dark-green" onClick={handleSave}>
                                            Simpan Bahan Baku
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
}

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