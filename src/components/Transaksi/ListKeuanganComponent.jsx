import React, { useState, useEffect, useContext } from "react";
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { Context as IncomeContext } from "../../services/Context/IncomeContext";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {
  Button,
  LinearProgress,
} from "@material-ui/core";
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardHeader, MDBBtn, MDBContainer, MDBRow, MDBCol, MDBBox } from "mdbreact";
import { useHistory, withRouter } from "react-router-dom";


const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);


const ListKeuanganComponent = (props) => {
let list_data;
let belum_bayar;
const {state, ListKeuangan} = useContext(IncomeContext);
const [, setListData] = useState([]);
useEffect(() => {
    ListKeuangan("");
    setListData(state.ListKeuangan);
    return () => {};
  }, []);

function bb()  {
    let data = state.ListKeuangan;    
    if (data !=undefined){
        list_data = data.data
        console.log('listdata',list_data);
        // tablebody(list_data)
        belum_bayar = data.belum_dibayar
            return belum_bayar; 
    }
}

function datas()  {
    let data = state.ListKeuangan;    
    if (data !=undefined){
        list_data = data.data
            return list_data; 
    }
}

function bt()  {
    let data = state.ListKeuangan;    
    if (data !=undefined){
        let bln_terakhir = data.bulan_terakhir
            return bln_terakhir; 
    }
}
function pjt()  {
    let data = state.ListKeuangan;    
    if (data !=undefined){
        let pjt = data.jatuh_tempo
            return pjt; 
    }
}

function btn_bayar(status,id){
    console.log('id',id);
    if(status == 'Belum Lunas'){
        return (
            <Button variant="contained" color="primary">Bayar</Button>
        )
    }
    
}

function tablebody(){
    if(datas() != undefined){
        return (
            <TableBody>
            {datas().map((row) => (
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row">
                    {row.date}
                  </TableCell>
                  <TableCell align="center">{row.invoice_number}</TableCell>
                  <TableCell align="center">{row.customer}</TableCell>
                  <TableCell align="center">{row.repayment}</TableCell>
                  <TableCell align="center">{row.ammount}</TableCell>
                  <TableCell align="center">{row.due_date}</TableCell>
                  <TableCell align="center">{row.payment_status}</TableCell>
                
                </TableRow>
              ))}
            </TableBody>
        )
    }
    
}


const useStyles = makeStyles({
  table: {
    minWidth: 500,
  },
  tableContainer :{
    padding : 25
  }
});


const classes = useStyles();
  return (
    <div>
      <h4>List Keuangan Penjualan</h4>
      <hr className="" />
      {/* {JSON.stringify(state.ListKeuangan)} */}
      
      <MDBRow>
                <MDBCol lg='4' md='4' className='mb-lg-0 mb-4'>
                    <MDBBox display="flex" justifyContent="center" >
                        <MDBCard style={{ width: "22rem", marginTop: "1rem" }}>
                            <MDBCardBody>
                                <MDBCardTitle>{bb()}</MDBCardTitle>
                                <MDBCardText>
                                    Penjualan 30 Hari terakhir
                                    </MDBCardText>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBBox>
                </MDBCol>
                <MDBCol lg='4' md='4' className='mb-lg-0 mb-4'>
                    <MDBBox display="flex" justifyContent="center" >
                        <MDBCard style={{ width: "22rem", marginTop: "1rem" }}>
                            <MDBCardBody>
                                <MDBCardTitle>{pjt()}</MDBCardTitle>
                                <MDBCardText>
                                    Penjualan Jatuh tempo
                                    </MDBCardText>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBBox>
                </MDBCol>
                <MDBCol lg='4' md='4' className='mb-lg-0 mb-4'>
                    <MDBBox display="flex" justifyContent="center" >
                        <MDBCard style={{ width: "22rem", marginTop: "1rem" }}>
                            <MDBCardBody>
                                <MDBCardTitle>{bt()}</MDBCardTitle>
                                <MDBCardText>
                                    Penjualan Belum di bayar
                                    </MDBCardText>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBBox>
                </MDBCol>
        </MDBRow>
        <br></br>
        <MDBRow>
        <MDBCol lg='12' md='12'>
        <TableContainer component={Paper} className={classes.tableContainer}>
        <Table className={classes.table} aria-label="customized table">
            <TableHead>
            <TableRow>
                <StyledTableCell>Tanggal</StyledTableCell>
                <StyledTableCell align="center">Invoice</StyledTableCell>
                <StyledTableCell align="center">Customer</StyledTableCell>
                <StyledTableCell align="center">Sisa Tagihan</StyledTableCell>
                <StyledTableCell align="center">Total Tagihan</StyledTableCell>
                <StyledTableCell align="center">Jatuh Tempo</StyledTableCell>
                <StyledTableCell align="center">Status</StyledTableCell>
              
            </TableRow>
            </TableHead>
            {tablebody()}
        </Table>
        </TableContainer>

        </MDBCol>

      </MDBRow>
    </div>
  );
}
export default withRouter(ListKeuanganComponent);