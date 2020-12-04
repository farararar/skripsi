import React, { Fragment, useState, useContext, useEffect } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import { TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, LinearProgress, InputLabel, Select, MenuItem } from '@material-ui/core'
import { MDBRow, MDBCol, MDBBtn, MDBFormInline, MDBBox, MDBContainer } from 'mdbreact';
import { Context as RawMaterialContext } from '../../services/Context/RawMaterialContext'


const ListComponent = () => {
    const classes = useStyles();
    const { state, ListRawMaterial } = useContext(RawMaterialContext)
    const [search, setSearch] = useState('')
    const [filter, setFilter] = useState('')

    // useEffect(() => {
    //     ListRawMaterial(filter)
    // }, [filter]);

    useEffect(() => {
        ListRawMaterial(filter)
    }, []);

    const handleFilter = (value) => {
        setFilter(value)
        ListRawMaterial(value)
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
    return (
        <Fragment>
            <MDBContainer fluid>
                <MDBBox display='flex' alignContent='between'>
                    <MDBCol size="9">
                        <MDBBox display="flex" justifyContent="start">
                            <MDBCol md="6">
                                <InputLabel>Filter Bahan Baku</InputLabel>
                                <Select fullWidth value={filter} onChange={(event) => handleFilter(event.target.value)}>
                                    <MenuItem value="">
                                        <em>Pilih Jenis </em>
                                    </MenuItem>
                                    <MenuItem value={1}>Bahan Baku Langsung</MenuItem>
                                    <MenuItem value={2}>Bahan Baku Tidak Langsung</MenuItem>
                                </Select>
                            </MDBCol>
                        </MDBBox>
                    </MDBCol>
                    <MDBCol size="9">
                        <MDBBox display="flex" justifyContent='end'>
                            <MDBCol md="12">
                                <MDBFormInline className="md-form mr-auto mb-2">
                                    <input className="form-control mr-sm-2" type="text" placeholder="Cari Transaksi" aria-label="Search" />
                                    <MDBBtn gradient="aqua" rounded size="sm" type="submit" className="mr-auto">
                                        Cari
                                </MDBBtn>
                                </MDBFormInline>
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
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {state.listMaterialRaw.map((row) => (
                            <StyledTableRow key={row.name}>
                                <StyledTableCell component="th" scope="row">
                                    {row.name}
                                </StyledTableCell>
                                <StyledTableCell align="left">{row.code}</StyledTableCell>
                                <StyledTableCell align="left">{row.type == 1 ? 'Bahan Baku Langsung' : 'Bahan Baku Tidak Langsung'}</StyledTableCell>
                                <StyledTableCell align="left">{row.unit_buy}</StyledTableCell>
                                <StyledTableCell align="left">{row.unit_use}</StyledTableCell>
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


const useStyles = makeStyles({
    table: {
        minWidth: 700,
    },
});
