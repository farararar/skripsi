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

const StokComponent = () => {
    const classes = useStyles();
    const { state, ListStok, ListStatus, UpdateStok, ListRawMaterial } = useContext(RawMaterialContext)
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
        ListRawMaterial("");
        ListStatus();
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

    const [stok, setStok] = useState(null);

    const updateStok = event => {
        setStok(event.target.value);
    }

    useEffect(() => {
        console.log('stok = ', stok);
    }, [stok]);

    const [tempData, setTempData] = useState([]);

    const [status, setStatus] = useState('');

    const fetchUpdateStok = () => {
        const date = new Date;
        const data = {
            date: date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate(),
            material_id: material.id,
            status: status,
            stock: stok,
        }
        UpdateStok(data, () => {
            ListStok()
            setOpen(false)
        })
    }
    const [material, setMaterial] = useState(null);
    const changeStatus = (event) => {
        console.log(event);
        if (event.target.name) {
            setMaterial(event.target.value)
        } else
            setStatus(event.target.value)
    }
    return (
        <Fragment>
            <MDBContainer fluid>
            </MDBContainer>
            {state.loading && (
                <LinearProgress />
            )}
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" fullWidth>
                <DialogTitle id="form-dialog-title">Tambah Stok</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Stok"
                        type="number"
                        fullWidth
                        value={stok}
                        onChange={updateStok}
                    />
                    <FormControl fullWidth className={classes.formControl}>
                        <InputLabel>Jenis</InputLabel>
                        <Select onChange={changeStatus} value={status} >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            {state.listStatus.map((res) => (
                                <MenuItem value={res}>{res}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <FormControl fullWidth className={classes.formControl}>
                        <InputLabel>Material</InputLabel>
                        <Select onChange={changeStatus} name={'material'} value={material} >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            {state.listMaterialRaw.map((res) => (
                                <MenuItem value={res}>{res?res.name:"-"}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
          </Button>
                    <Button onClick={fetchUpdateStok} color="primary" disabled={!(Boolean(stok)&&Boolean(status)&&Boolean(material))} >
                        Tambah
          </Button>
                </DialogActions>
            </Dialog>
            <MDBBtn onClick={() => handleClickOpen([])}>Tambah Stok</MDBBtn>
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
                            <StyledTableCell align="left">Stok</StyledTableCell>
                            {/* <StyledTableCell align="left">Tambah Stok</StyledTableCell> */}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {state.listStok.map((row) => {
                            // console.log("roooww = ",row)
                            return (
                                <StyledTableRow key={row.name||"-"}>
                                    <StyledTableCell component="th" scope="row">
                                    {row.material?row.material.name:"-"}
                                    </StyledTableCell>
                                    <StyledTableCell align="left">{row.material?row.material.code: "-"}</StyledTableCell>
                                    <StyledTableCell align="left">{row.material?row.material.type == 1 ? 'Bahan Baku Langsung' : 'Bahan Baku Tidak Langsung':'-'}</StyledTableCell>
                                    <StyledTableCell align="left">{row.material?row.material.unit_buy : '-'}</StyledTableCell>
                                    <StyledTableCell align="left">{row.material?row.material.unit_use : '-'}</StyledTableCell>
                                    <StyledTableCell align="left">{row.material?row.material.unit_conversion : '-'}</StyledTableCell>
                                    <StyledTableCell align="left">{row.stock || '-'}</StyledTableCell>
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

export default StokComponent;


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
