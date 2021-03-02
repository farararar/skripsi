import React, { Fragment, useState, useContext, useEffect } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import { TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, LinearProgress, InputLabel, Select, MenuItem } from '@material-ui/core'
import { MDBRow, MDBCol, MDBBtn, MDBFormInline, MDBBox, MDBContainer } from 'mdbreact';
import { Context as JournalContext } from '../../services/Context/JournalContext'
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { useHistory } from 'react-router-dom';
import DateFnsUtils from "@date-io/date-fns";
import moment from 'moment';
import { ExternalLink } from 'react-external-link';
import Iframe from 'react-iframe';

import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from "@material-ui/pickers";
import Grid from "@material-ui/core/Grid";
var d = new Date();
const BukuBesarKeuanganComponent = () => {
    const classes = useStyles();
    const { state, ListLaporanKeuangan } = useContext(JournalContext)
    const [search, setSearch] = useState('')
    const [selectedDate2, setSelectedDate2] = useState();
    const [value, setValue] = useState({
        account_id: '',
        start_date: '',
        end_date: ''
    })
    const filterredDate = (date) => {
        return date.getFullYear();
    }

    const [filter, setFilter] = useState({
        tahun: new Date
    })
    const FilterRow = (data) => {
        return {
            tahun: filterredDate(filter.tahun)
        }
    }
    const [tahun, setTahun] = useState(d.getFullYear());

    const [years, setYears] = useState([]);


    const handleDateChange2 = (date) => {
        let tahun = date.getFullYear()
<<<<<<< HEAD
        setSelectedDate2(date); 
=======
        setSelectedDate2(date);
>>>>>>> 7bcb6f993b11653d0e16f6f6cced064d552663a3
        // state.loading = true
        setValue({
            ...value,
            end_date: date
<<<<<<< HEAD
        }) 
=======
        })
>>>>>>> 7bcb6f993b11653d0e16f6f6cced064d552663a3
        handleChangeValue(tahun)
        // setTimeout(() => {  state.loading = false }, 2000);
    }
    useEffect(() => {
<<<<<<< HEAD
      const now = new Date().getUTCFullYear();
      const years = Array(now - (now - 20))
        .fill("")
        .map((v, idx) => now - idx);
      setYears(years);
=======
        const now = new Date().getUTCFullYear();
        const years = Array(now - (now - 20))
            .fill("")
            .map((v, idx) => now - idx);
        setYears(years);
>>>>>>> 7bcb6f993b11653d0e16f6f6cced064d552663a3
    }, []);

    const history = useHistory();
    useEffect(() => {
        ListLaporanKeuangan(FilterRow(filter))
    }, [filter]);

    useEffect(() => {
        ListLaporanKeuangan(FilterRow(filter));
    }, []);
    // const  fullYear = new Date().getFullYear();
    const [externalUrl, setExternalUrl] = useState(`https://newdemo.aplikasiskripsi.com/farah_accounting/public/laporan-keuangan-pdf/${moment().format('YYYY')}`);

    const handleChangeValue = (tahun) => {
        console.log(`https://newdemo.aplikasiskripsi.com/farah_accounting/public/laporan-keuangan-pdf/${tahun}`)
        setExternalUrl(`https://newdemo.aplikasiskripsi.com/farah_accounting/public/laporan-keuangan-pdf/${tahun}`)
    };
<<<<<<< HEAD
    
=======

>>>>>>> 7bcb6f993b11653d0e16f6f6cced064d552663a3
    return (
        <Fragment>
            <MDBContainer fluid>
                <MDBBox display='flex' style={{ marginBottom: 20 }} alignContent='between'>
                    <MDBCol size="9">
                        <MDBBox display="flex" justifyContent="start">
                            <MDBCol lg="6">
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <Grid container justify="space-around">
                                        <KeyboardDatePicker
                                            margin="normal"
                                            id="date-picker-dialog"
                                            label="Pilih tahun"
                                            // format="dd/MM/yyyy"
                                            views={["year"]}
                                            value={selectedDate2}
                                            onChange={handleDateChange2}
                                            KeyboardButtonProps={{
                                                'aria-label': 'change date',
                                            }}
                                        />
                                    </Grid>
                                </MuiPickersUtilsProvider>
                            </MDBCol>

                        </MDBBox>
                    </MDBCol>

                </MDBBox>


            </MDBContainer>
            {state.loading && (
                <LinearProgress />
            )}
            <div style={{ textAlign: "center" }}>
                <Iframe url={externalUrl}
                    width="1000px"
                    height="1000px"
                    id="myId"
                    className="m-20"
                    display="initial"
                    position="relative" />
            </div>
            {/* <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Nama</StyledTableCell>
                            <StyledTableCell align="left">Nomor referensi</StyledTableCell>
                            <StyledTableCell align="left">Debit</StyledTableCell>
                            <StyledTableCell align="left">Kredit</StyledTableCell>
                            <StyledTableCell align="left">Informasi</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {state.listLaporanKeuangan.map((row) => {
                            console.log("roooww = ",row)
                            return(
                            <StyledTableRow key={row.name}>
                                <StyledTableCell component="th" scope="row">
                                    {row.name}
                                </StyledTableCell>
                                <StyledTableCell align="left">{row.reference_number}</StyledTableCell>
                                <StyledTableCell align="left">{row.debit}</StyledTableCell>
                                <StyledTableCell align="left">{row.credit}</StyledTableCell>
                                <StyledTableCell align="left">{row.information}</StyledTableCell>
                            </StyledTableRow>
                        )})}
                    </TableBody>
                </Table>
            </TableContainer>
         */}
        </Fragment>
    );
}

export default BukuBesarKeuanganComponent


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
