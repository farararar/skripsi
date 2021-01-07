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
import Iframe from 'react-iframe'

import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from "@material-ui/pickers";
import Grid from "@material-ui/core/Grid";
const BukuBesarKeuanganComponent = () => {
    const classes = useStyles();
    const { state, ListLaporanKeuangan } = useContext(JournalContext)
    const [search, setSearch] = useState('')
    const filterredDate = (date) => {
        return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
    }

    const [filter, setFilter] = useState({
        since: new Date,
        until: new Date
    })
    const FilterRow = (data) => {
        return {
            since: filterredDate(filter.since),
            until: filterredDate(filter.until)
        }
    }

    const history = useHistory();
    useEffect(() => {
        ListLaporanKeuangan(FilterRow(filter))
    }, [filter]);

    useEffect(() => {
        ListLaporanKeuangan(FilterRow(filter));
    }, []);
    // const  fullYear = new Date().getFullYear();
    const [since, setSince] = useState(new Date());
    const [until, setUntil] = useState(new Date());
    const [externalUrl, setExternalUrl] = useState('https://newdemo.aplikasiskripsi.com/farah_accounting/public/account-report-pdf?since=2020-11-23&until=2020-11-26');
    // const handleDateChange = (date) => {
    //     console.log('year = ', date);
    //     setFilterYear(date);
    // };

    useEffect(()=>{
        console.log(`https://newdemo.aplikasiskripsi.com/farah_accounting/public/account-report-pdf?since=${moment(since).format('YYYY-MM-DD')}&until=${moment(until).format('YYYY-MM-DD')}`)
        setExternalUrl(`https://newdemo.aplikasiskripsi.com/farah_accounting/public/account-report-pdf?since=${moment(since).format('YYYY-MM-DD')}&until=${moment(until).format('YYYY-MM-DD')}`)
    },[since, until])
    
    return (
        <Fragment>
            <MDBContainer fluid>
                <MDBBox display='flex' style={{marginBottom: 20}} alignContent='between'>
                    <MDBCol size="9">
                        <MDBBox display="flex" justifyContent="start">
                            <MDBCol md="6">
                                <InputLabel>Filter</InputLabel>
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    {/* <Grid container justify="space-around"> */}
                                    <div style={{ display: "flex", width:'120%', justifyContent:"space-between" }}>
                                    <KeyboardDatePicker value={since} label={'Since'} onChange={(value)=>setSince(value)}  />
                                    <KeyboardDatePicker value={until} label={'Until'} onChange={(value)=>setUntil(value)}  />
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
            <div style={{textAlign:"center"}}>
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
