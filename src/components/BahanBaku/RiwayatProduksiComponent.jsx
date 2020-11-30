import React, { Fragment, useState, useContext, useEffect } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import { TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, LinearProgress, TextField, Button, FormControl, Select, MenuItem, InputLabel } from '@material-ui/core'
import { MDBRow, MDBCol, MDBBtn, MDBFormInline, MDBBox, MDBContainer } from 'mdbreact';
import { Context as RawMaterialContext } from '../../services/Context/RawMaterialContext'
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { useHistory } from 'react-router-dom';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const RiwayatProduksiComponent = ({ userId }) => {
    const classes = useStyles();
    const { state, ListStok, ListStatus, UpdateStok, ListRiwayatProduksi, StartProduksi, StopProduksi } = useContext(RawMaterialContext)
    const [open, setOpen] = React.useState(false);

    const filterredDate = (date) => {
        return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
    }

    const [filter, setFilter] = useState({
        since: new Date,
        until: new Date
    })

    const handleClickOpen = (data) => {
        setTempData(data);
        setOpen(true);

    };

    const handleClose = () => {
        setOpen(false);
    };

    const history = useHistory();
    useEffect(() => {
        // ListReportMaterial(FilterRow(filter))
    }, [filter]);

    useEffect(() => {
        ListStok();
        ListStatus();
        ListRiwayatProduksi(userId);
    }, []);

    const handleDateChange = (ket, date) => {
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

    const [stok, setStok] = useState([]);

    const updateStok = (id) => event => {
        setStok({
            ...stok,
            [`stok${id}`]: event.target.value
        })
    }

    const tambahStok = () => {

    }

    useEffect(() => {
        console.log('stok = ', stok);
    }, [stok]);

    const [tempData, setTempData] = useState([]);

    const [status, setStatus] = useState('');

    const fetchStart = () => {
        const date = new Date;
        const data = {
            "product_id": 1,
            "production_code": "R-001",
            "information": "Pembuatan Roti Sobek"
        }
        StartProduksi(data, () => ListRiwayatProduksi(userId))
    }

    const fetchStop = () => {
        const date = new Date;
        const data = {
            date: date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate(),
            material_id: tempData.raw_material_id,
            status: status,
            stock: stok[`stok${tempData.id}`] || tempData.stock,
        }
        StopProduksi(data, () => ListRiwayatProduksi(userId))
    }

    const changeStatus = (event) => {
        console.log(event);
        setStatus(event.target.value)
    }
    return (
        <Fragment>
            <MDBContainer fluid>
            </MDBContainer>
            {state.loading && (
                <LinearProgress />
            )}

            {state.listRiwayatProduksi.additional_data && state.listRiwayatProduksi.additional_data.is_started == 0 && <Button onClick={fetchStart} color="primary">
                Start
            </Button>}
            {state.listRiwayatProduksi.additional_data && state.listRiwayatProduksi.additional_data.is_started == 1 && <Button onClick={fetchStop} color="primary">
                Start
            </Button>}
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Nama Produk</StyledTableCell>
                            <StyledTableCell align="left">Kode Produk</StyledTableCell>
                            <StyledTableCell align="left">Unit Produk</StyledTableCell>
                            <StyledTableCell align="left">Harga Produk</StyledTableCell>
                            <StyledTableCell align="left">informasi</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {state.listRiwayatProduksi.data && state.listRiwayatProduksi.data.map((row) => {
                            // console.log("roooww = ",row)
                            return (
                                <StyledTableRow key={row.name}>
                                    <StyledTableCell component="th" scope="row">
                                        {row.product.name || '-'}
                                    </StyledTableCell>
                                    <StyledTableCell align="left">{row.product.code || "-"}</StyledTableCell>
                                    <StyledTableCell align="left">{row.product.unit_product || '-'}</StyledTableCell>
                                    <StyledTableCell align="left">{row.product.unit_price || '-'}</StyledTableCell>
                                    <StyledTableCell align="left">{row.product.information || '-'}</StyledTableCell>
                                    {/* <StyledTableCell align="left">{row.stock || '-'}</StyledTableCell> */}
                                    {/* <TextField  type='number' margin="normal" variant="outlined" onChange={updateStok(`${row.id}`)} value={stok[`stok${row.id}`]||row.stock} /> */}
                                    {/* <StyledTableCell align="left"><>
                                        <EditIcon
                                            color="dark-green"
                                            size="sm"
                                            style={{ color: "green", margin: "10px" }}
                                            onClick={()=>handleClickOpen(row)}
                                        />
                                    </></StyledTableCell> */}
                                </StyledTableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </Fragment>
    );
}

export default RiwayatProduksiComponent;


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
