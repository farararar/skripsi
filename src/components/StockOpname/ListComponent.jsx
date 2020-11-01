import React, { Fragment, useState, useContext, useEffect } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import { TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core'
import { MDBRow, MDBCol, MDBBtn, MDBIcon, MDBBox, MDBFormInline } from 'mdbreact';
import AddFormComponent from './AddFormComponent';
import {Context as StockOpnameContext} from '../../services/Context/StockOpnameContext'


const ListComponent = () => {
    const classes = useStyles();
    const {state, ListStockOpname} = useContext(StockOpnameContext)
    const [search, setSearch] = useState('')
   
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

    useEffect(() => {
        ListStockOpname()
    }, []);

    return (
        <Fragment>
            {/* <MDBRow>
                <MDBCol lg='8'>
                    <MDBBox display="flex" justifyContent="start">
                        <MDBBtn color="unique" size="sm"><MDBIcon icon="plus-circle" className="ml-1" /> Tambah Stok</MDBBtn>
                    </MDBBox>
                </MDBCol>
                <MDBCol lg='4'>
                    <MDBFormInline className="md-form mr-auto mb-0">
                        <input className="form-control mr-sm-2" type="text" placeholder="Cari Transaksi" aria-label="Search" value={search} onChange={(e) => setSearch(e.target.value)} />
                        <MDBBtn gradient="aqua" rounded size="sm" className="mr-auto" onClick={handleSearch}>
                            Cari
                            </MDBBtn>
                        {search !== '' && (
                            <MDBBtn color="red" rounded size="sm" className="mr-auto" onClick={handleResetSearch}>
                                Reset
                            </MDBBtn>
                        )}
                    </MDBFormInline>
                </MDBCol>
            </MDBRow> */}
            <AddFormComponent />
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Produk</StyledTableCell>
                            <StyledTableCell align="center">Tanggal</StyledTableCell>
                            <StyledTableCell align="center">Status</StyledTableCell>
                            <StyledTableCell align="center">Stock</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {state.listStockOpname.map((row) => (
                            <StyledTableRow key={row.name}>
                                <StyledTableCell component="th" scope="row">
                                    {row.product_name}
                                </StyledTableCell>
                                <StyledTableCell align="center">{row.date}</StyledTableCell>
                                <StyledTableCell align="center">{row.status}</StyledTableCell>
                                <StyledTableCell align="center">{row.stock}</StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Fragment>
    );
}

export default ListComponent


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

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
];

const useStyles = makeStyles({
    table: {
        minWidth: 700,
    },
});
