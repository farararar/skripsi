import React, { useState, useContext, useEffect } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { FormControl, Grid, InputLabel, LinearProgress, MenuItem, Select, TextField } from '@material-ui/core';
import { MDBCard, MDBCardBody, MDBRow, MDBCol, MDBBtn, MDBBox } from 'mdbreact';
import { MuiPickersUtilsProvider, KeyboardDatePicker} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import {Context as ProductContext} from '../../services/Context/ProductContext'
import {Context as StockOpnameContext} from '../../services/Context/StockOpnameContext'

const AddFormComponent = () => {
    const classes = useStyles();
    const {state:{listProduct}, ListProduct} = useContext(ProductContext)
    const {state, AddStockOpname, ListStockOpname} = useContext(StockOpnameContext)
    const [selectedDate, setSelectedDate] = React.useState(new Date());
    const [date, setDate] = useState('') 
    const [value, setValue] = useState({
        product_id:'',
        date:'',
        status:'',
        stock:''
    })

    useEffect(() => {
        ListProduct()
    }, []);

    const handleDateChange = (date) => {
        let formattedDate = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()
        setSelectedDate(date);
        setDate(formattedDate)
        setValue({
            ...value,
            date:formattedDate
        })
        // alert(formattedDate)
    };

    const handleChange = name => event => {
        setValue({
            ...value,
            [name]: event.target.value
        })
    }
    const handleReset = () => {
        setValue({
            product_id:'',
            date:'',
            status:'',
            stock:''
        })
        ListStockOpname()
    }

    const handleSave = () => {
        let data = {
            product_id  : value.product_id,
            date        : value.date,
            status      : value.status,
            stock       : value.stock 
        }
        AddStockOpname(data, () => handleReset())
    }


    return (
        <div>
            {/* {JSON.stringify(value)} */}
            {state.loading && ( <LinearProgress /> )}
            <MDBCard className='mb-2'> 
                <MDBCardBody className='p-1'>
                    <MDBRow className='m-3'>
                        <MDBCol lg="2">
                            <FormControl fullWidth className={classes.formControl} >
                                <InputLabel>Produk</InputLabel>
                                <Select onChange={handleChange('product_id')}>
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    {listProduct.map(item => (
                                        <MenuItem value={item.id}> {item.name} </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </MDBCol>
                        <MDBCol lg="2">
                            <FormControl fullWidth className={classes.formControl} >
                                <InputLabel>Status</InputLabel>
                                <Select onChange={handleChange('status')}>
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value='Stok Awal'>Stok Awal</MenuItem>
                                    <MenuItem value='Penjulan'>Penjualan</MenuItem>
                                    <MenuItem value='Sisa Dibuang'>Sisa Dibuang</MenuItem>
                                    <MenuItem value='Produksi'>Produksi</MenuItem>
                                    <MenuItem value='Hasil Produksi'>Hasil Produksi</MenuItem>
                                    <MenuItem value='Stock Akhir'>Stock Akhir</MenuItem>
                                </Select>
                            </FormControl>
                        </MDBCol>
                        <MDBCol lg="2">
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <Grid container justify="space-around">
                                    <KeyboardDatePicker
                                        margin="normal"
                                        id="date-picker-dialog"
                                        label="Tanggal"
                                        value={selectedDate}
                                        onChange={handleDateChange}
                                        format="dd/MM/yyyy"
                                        KeyboardButtonProps={{
                                            'aria-label': 'change date',
                                        }}
                                    />
                                </Grid>
                            </MuiPickersUtilsProvider>
                        </MDBCol>
                        <MDBCol lg="2">
                            <TextField fullWidth type='number' label="Stok" variant="outlined" margin="normal" onChange={handleChange('stock')} />
                        </MDBCol>

                        <MDBCol lg="3">
                            <MDBRow className='mt-3 mb-2'>
                                <MDBCol lg="12">
                                    <MDBBox justifyContent='between'>
                                        <MDBBtn color="dark-green" disabled={state.loading} onClick={handleSave}>  
                                            Tambah Stok
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

export default AddFormComponent;

const useStyles = makeStyles((theme) => ({
    formControl: {
        marginTop: theme.spacing(1),
        minWidth: 220,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));