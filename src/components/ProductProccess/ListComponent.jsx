import React, { Fragment, useState } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import { TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core'
import { MDBRow, MDBCol, MDBBtn, MDBIcon, MDBBox, MDBFormInline } from 'mdbreact';


const ListComponent = () => {
    const classes = useStyles();
    const [search, setSearch] = useState('')

    const handleSearch = () => {
        if(search === ''){
            alert('Ketikan yg ingin dicari!')
        }else{
            return null
        }
    }
    const handleResetSearch = () => {
        setSearch('')
    }
    return (
        <Fragment>
            <MDBRow>
                <MDBCol lg='8'>
                    <MDBBox display="flex" justifyContent="start">
                        <MDBBtn color="unique" size="sm"><MDBIcon icon="plus-circle" className="ml-1" /> Tambah Proses</MDBBtn>
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
            </MDBRow>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Tanggal Produksi</StyledTableCell>
                            <StyledTableCell align="center">Estimasi Selesai</StyledTableCell>
                            <StyledTableCell align="center">Kode Produksi</StyledTableCell>
                            <StyledTableCell align="center">Nama Produk</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <StyledTableRow key={row.name}>
                                <StyledTableCell component="th" scope="row">
                                    {row.name}
                                </StyledTableCell>
                                <StyledTableCell align="center">{row.calories}</StyledTableCell>
                                <StyledTableCell align="center">{row.fat}</StyledTableCell>
                                <StyledTableCell align="center">{row.carbs}</StyledTableCell>
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

function createData(name, calories, fat, carbs) {
    return { name, calories, fat, carbs };
}

const rows = [
    createData('11/10/2020', '13/10/2020', 'PRODUKSI/010/11/10', 'Roti Strawbery'),
    createData('11/10/2020', '13/10/2020', 'PRODUKSI/010/11/10', 'Lemper'),
    createData('11/10/2020', '13/10/2020', 'PRODUKSI/010/11/10', 'Lemper'),
    createData('11/10/2020', '13/10/2020', 'PRODUKSI/010/11/10', 'Lemper'),
];

const useStyles = makeStyles({
    table: {
        minWidth: 700,
    },
});
