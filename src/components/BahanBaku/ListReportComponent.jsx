import React, { Fragment, useState, useContext, useEffect } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import { TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, LinearProgress, InputLabel, Select, MenuItem } from '@material-ui/core'
import { MDBRow, MDBCol, MDBBtn, MDBFormInline, MDBBox, MDBContainer } from 'mdbreact';
import { Context as RawMaterialContext } from '../../services/Context/RawMaterialContext'
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { useHistory } from 'react-router-dom';
import DateFnsUtils from "@date-io/date-fns";
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from "@material-ui/pickers";
import Grid from "@material-ui/core/Grid";
const ListReportComponent = () => {
    const classes = useStyles();
    const { state, ListReportMaterial, DeleteBahanBaku } = useContext(RawMaterialContext)
    const [search, setSearch] = useState('')
    
    const filterredDate=(date)=>{
        return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
    }
    
    const [filter, setFilter] = useState({
        since: new Date,
        until: new Date
    })

    const FilterRow=(data)=>{
        return {
            since: filterredDate(filter.since),
            until: filterredDate(filter.until)
        }
    }

    const history = useHistory();
    useEffect(() => {
        ListReportMaterial(FilterRow(filter))
    }, [filter]);

    useEffect(() => {
        ListReportMaterial(FilterRow(filter))
    }, []);

    const handleFilter = (value) => {
        setFilter(value)
        ListReportMaterial(value)
    }

    const handleSearch = () => {
        if (search === '') {
            alert('Ketikan yg ingin dicari!')
        } else {
            return null
        }
    }
    const handleResetSearch = () => {
        setSearch('')
    }

    const handleDelete = (id) => {
        // DeleteBahanBaku(id, () => ListRawMaterial(filter));
    }

    const handleEdit = (data) => {
        history.push('/AddRawMaterial', { data: data });
    }

    const [selectedDate, setSelectedDate] = React.useState(
        new Date()
    );
    const [date, setDate] = useState('');

    const handleDateChange = (ket,date) => {
        console.log(filter);
        let formattedDate =
            date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
        setFilter({
            ...filter,
            [ket]: date
        })
            // setSelectedDate(date);
        // setDate(formattedDate);
    };

    return (
        <Fragment>
            <MDBContainer fluid>
                <MDBBox display='flex' alignContent='between'>
                    <MDBCol size="9">
                        <MDBBox display="flex" justifyContent="start">
                            <MDBCol md="6">
                                <InputLabel>Filter Bahan Baku</InputLabel>
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    {/* <Grid container justify="space-around"> */}
                                    <div style={{display:"flex"}}>
                                        <KeyboardDatePicker
                                            margin="normal"
                                            id="date-picker-dialog"
                                            label="Since"
                                            format="dd/MM/yyyy"
                                            value={filter.since}
                                            onChange={(value)=>handleDateChange('since', value)}
                                            KeyboardButtonProps={{
                                                "aria-label": "change date",
                                            }}
                                        />
                                        <KeyboardDatePicker
                                            margin="normal"
                                            id="date-picker-dialog"
                                            label="Until"
                                            style={{marginLeft: '20px'}}
                                            format="dd/MM/yyyy"
                                            value={filter.until}
                                            onChange={(value)=>handleDateChange('until', value)}
                                            KeyboardButtonProps={{
                                                "aria-label": "change date",
                                            }}
                                        />
                                        </div>
                                    {/* </Grid> */}
                                    
                                </MuiPickersUtilsProvider>
                            </MDBCol>
                        </MDBBox>
                    </MDBCol>
                
                </MDBBox>


            </MDBContainer>
            {state.loading && (
                <LinearProgress />
            )}
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Nama Bahan</StyledTableCell>
                            <StyledTableCell align="left">Kode Bahan</StyledTableCell>
                            <StyledTableCell align="left">Jenis Bahan Baku</StyledTableCell>
                            <StyledTableCell align="left">Satuan Beli</StyledTableCell>
                            <StyledTableCell align="left">Satuan Guna</StyledTableCell>
                            <StyledTableCell align="left">Unit Konversi</StyledTableCell>
                            {/* <StyledTableCell align="left">Actions</StyledTableCell> */}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {state.listReportMaterial.map((row) => {
                            console.log("roooww = ",row)
                            return(
                            <StyledTableRow key={row.name}>
                                <StyledTableCell component="th" scope="row">
                                    {row.name}
                                </StyledTableCell>
                                <StyledTableCell align="left">{row.code}</StyledTableCell>
                                <StyledTableCell align="left">{row.type == 1 ? 'Bahan Baku Langsung' : 'Bahan Baku Tidak Langsung'}</StyledTableCell>
                                <StyledTableCell align="left">{row.unit_buy}</StyledTableCell>
                                <StyledTableCell align="left">{row.unit_use}</StyledTableCell>
                                <StyledTableCell align="left">{row.unit_conversion}</StyledTableCell>
                                {/* <StyledTableCell align="left"><>
                                    <EditIcon
                                        color="dark-green"
                                        size="sm"
                                        style={{ color: "green", margin: "10px" }}
                                        onClick={() => handleEdit(row)}
                                    />
                                    <DeleteIcon
                                        color="red"
                                        // size="sm"
                                        style={{ color: "red", margin: "10px" }}
                                        onClick={() => handleDelete(row.raw_material_category_id)}
                                    /></></StyledTableCell> */}
                            </StyledTableRow>
                        )})}
                    </TableBody>
                </Table>
            </TableContainer>
        </Fragment>
    );
}

export default ListReportComponent


const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}


const useStyles = makeStyles({
    table: {
        minWidth: 700,
    },
});
