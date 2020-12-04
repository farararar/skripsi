import React, { Fragment, useState, useContext, useEffect } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import { TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, LinearProgress, TextField, Button, FormControl, Select, MenuItem, InputLabel } from '@material-ui/core'
import { MDBRow, MDBCol, MDBBtn, MDBFormInline, MDBBox, MDBContainer } from 'mdbreact';
import { Context as RawMaterialContext } from '../../services/Context/RawMaterialContext'
import { useHistory } from 'react-router-dom';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
// import DetailProdukKomponent from './DetailProdukComponent';
const RiwayatProduksiComponent = ({ userId }) => {
    const classes = useStyles();
    const { state, ListStok, ListStatus, UpdateStok, ListRiwayatProduksi, StartProduksi, StopProduksi, DetailPorduksi } = useContext(RawMaterialContext)
    const [open, setOpen] = React.useState(false);
    const [openDetail, setOpenDetail] = React.useState(false);

    const filterredDate = (date) => {
        return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
    }
    const [detail, setDetail] = useState(false);
    const [filter, setFilter] = useState({
        since: new Date,
        until: new Date
    })

    const handleClickOpen = (data) => {
        // setTempData(data);
        setOpen(true);

    };

    const handleClickOpenDetail = (data) => {
        DetailPorduksi(data.id,()=>setOpenDetail(true));
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleCloseDetail = () => {
        setOpenDetail(false);
    };

    const history = useHistory();
    useEffect(() => {
    }, [filter]);

    useEffect(() => {
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
        const data = {
            "product_id": userId,
            "production_code": production_code,
            "information": "Pembuatan Roti Sobek"
        }

        StartProduksi(data, () => ListRiwayatProduksi(userId))
        setOpen(false);

    }

    const fetchStop = () => {
        const date = new Date;
        // const data = {
        //     date: date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate(),
        //     material_id: tempData.raw_material_id,
        //     status: status,
        //     stock: stok[`stok${tempData.id}`] || tempData.stock,
        // }
        StopProduksi(userId, () => ListRiwayatProduksi(userId))
    }

    const changeStatus = (event) => {
        console.log(event);
        setStatus(event.target.value)
    }
    const [production_code, setProduction] = useState('');
    const [temp, setTemp] = useState([]);
    const handeDetail = (data) => {
        setDetail(true);
        setTemp(data);
    }
    // if (!detail)
    return (
        <Fragment>
            <MDBContainer fluid>
            </MDBContainer>
            {state.loading && (
                <LinearProgress />
            )}
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" fullWidth>
                <DialogTitle id="form-dialog-title">Update Stok {tempData.material_name}</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="production_code"
                        label="Kode Produksi"
                        // type="number"
                        fullWidth
                        value={production_code}
                        onChange={(event) => setProduction(event.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
          </Button>
                    <Button onClick={() => fetchStart()} color="primary">
                        Tambah
          </Button>
                </DialogActions>
            </Dialog>

            <Dialog open={openDetail} onClose={handleCloseDetail} aria-labelledby="form-dialog-title" fullWidth>
                <DialogTitle id="form-dialog-title">Detail</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="normal"
                        id="production_code"
                        label="Kode Produksi"
                        disabled
                        style={{margin:'10px'}}
                        // fullWidth
                        value={state.report.production_code}
                    />
                    <TextField
                        autoFocus
                        margin="normal"
                        id="production_code"
                        label="Informasi"
                        style={{margin:'10px'}}
                        disabled
                        value={state.report.information}
                        // fullWidth
                    />
                    <TextField
                        autoFocus
                        margin="normal"
                        id="production_code"
                        label="Stok Awal"
                        style={{margin:'10px'}}
                        disabled
                        value={state.report.stok_awal}
                        // fullWidth
                    />
                    <TextField
                        autoFocus
                        margin="normal"
                        style={{margin:'10px'}}
                        id="production_code"
                        label="Penjualan"
                        disabled
                        value={state.report.penjualan}
                        // fullWidth
                    />
                    <TextField
                        autoFocus 
                        margin="normal"
                        id="production_code"
                        label="Sisa Dibuang"
                        style={{margin:'10px'}}
                        disabled
                        value={state.report.sisa_dibuang}
                        // fullWidth
                    />
                    <TextField
                        autoFocus
                        margin="normal"
                        id="production_code"
                        label="Produksi"
                        style={{margin:'10px'}}
                        disabled
                        value={state.report.produksi}
                        // fullWidth
                    />
                    <TextField
                        autoFocus
                        margin="normal"
                        id="production_code"
                        label="Stok Akhir"
                        style={{margin:'10px'}}
                        disabled
                        value={state.report.stock_akhir}
                        // fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDetail} color="primary">
                        Close
          </Button>
                </DialogActions>
            </Dialog>

            {state.listRiwayatProduksi.additional_data && state.listRiwayatProduksi.additional_data.is_started == 0 && <Button onClick={() => handleClickOpen()} color="primary">
                Start
            </Button>}
            {state.listRiwayatProduksi.additional_data && state.listRiwayatProduksi.additional_data.is_started == 1 && <Button onClick={fetchStop} color="primary">
                Stop
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
                            <StyledTableCell align="left">Tanggal Mulai</StyledTableCell>
                            <StyledTableCell align="left">Tanggal Selesai</StyledTableCell>
                            <StyledTableCell align="left">Detail</StyledTableCell>
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
                                    <StyledTableCell align="left">{row.start_date || '-'}</StyledTableCell>
                                    <StyledTableCell align="left">{row.complete_date || '-'}</StyledTableCell>
                                    {/* <StyledTableCell align="left">{row.stock || '-'}</StyledTableCell> */}
                                    {/* <TextField  type='number' margin="normal" variant="outlined" onChange={updateStok(`${row.id}`)} value={stok[`stok${row.id}`]||row.stock} /> */}
                                    <StyledTableCell align="left"><>
                                        <KeyboardArrowRightIcon
                                            color="dark-green"
                                            size="sm"
                                            style={{ color: "green", margin: "10px" }}
                                            onClick={() => handleClickOpenDetail(row)}
                                        />
                                    </></StyledTableCell>
                                </StyledTableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </Fragment>

    );
    // else
    //     return <DetailProdukKomponent />

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
