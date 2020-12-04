import React, { Fragment, useState, useContext, useEffect } from "react";
import { Context as AuthContext } from "../../services/Context/AuthContext";
import { Context as JournalContext } from "../../services/Context/JournalContext";
import {
  MDBCard,
  MDBCardBody,
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBBox,
  MDBTable,
  MDBTableBody,
  MDBTableHead,
} from "mdbreact";
import { LinearProgress, TextField } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import NumberFormat from "react-number-format";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
var d = new Date();
const JurnalPerhariComponent = ({ props, params, Change, Next, userData }) => {
  const { isAuthenticated } = useContext(AuthContext);
  const { state, GetDailyJournal, PostingJournal, DeleteJournal } = useContext(JournalContext);
  const [review, setReview] = useState(false);
  const [memo, setMemo] = useState("");
  const [save, setSave] = useState(false);
  const [posting, setPosting] = useState(false);
  const [selectedDate, setSelectedDate] = React.useState(
    new Date(params.tanggal)
  );
  const [date, setDate] = useState(params.tanggal);

  const handleDateChange = (date) => {
    let formattedDate =
      date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
    setSelectedDate(date);
    setDate(formattedDate);
    props.history.push(`/jurnal-perhari/${formattedDate}`);
    setReview(false);
    // alert(formattedDate)
  };

  useEffect(() => {
    GetDailyJournal(date);
  }, [date]);

  const reviewStatus = () => {
    // {!review && (
    //     <small style={{ color: 'red' }}>Not Review</small>
    // )}
    // {review && !save && (
    //     <small style={{ color: 'red' }}>Not Review</small>
    // )}
    if (!review) {
      return (
        <small style={{ color: "black" }}>
          ...............................
        </small>
      );
    } else if (review && !save) {
      if (state.additionalData.review_status === "Not Reviewed") {
        return <small style={{ color: "orange" }}>In Review</small>;
      } else {
        return (
          <small style={{ color: "green", fontWeight: "bold" }}>
            {state.additionalData.status}
          </small>
        );
      }
    } else if (review && save && !posting) {
      if (state.additionalData.review_status === "Not Reviewed") {
        return (
          <small style={{ color: "orange" }}>
            {state.additionalData.status}
          </small>
        );
      } else {
        return (
          <small style={{ color: "green", fontWeight: "bold" }}>
            Siap Posting
          </small>
        );
      }
    } else {
      return (
        <small style={{ color: "green" }}>
          <b>Direview & Diposting</b>
        </small>
      );
    }
  };

  const memoComponent = () => {
    // if(state.additionalData.review_status === 'Not Reviewed'){
    return (
      <Fragment>
        <TextField
          fullWidth
          label="Memo"
          variant="outlined"
          margin="normal"
          multiline
          rows={3}
          rowsMax={4}
          onChange={(e) => setMemo(e.target.value)}
        />

        <MDBBtn
          color="dark-green"
          gradient="blue"
          onClick={handleSave}
          disabled={posting}
        >
          Simpan
        </MDBBtn>
      </Fragment>
    );
    // }else{
    //     return(
    //         <TextField fullWidth label="Memo" variant="outlined" margin="normal" multiline rows={3} rowsMax={4} defaultValue={state.additionalData.memo} />
    //     )
    // }
  };

  const handleReview = () => {
    GetDailyJournal(date);
    setReview(true);
  };

  const handleSave = () => {
    if (state.listJournalDaily.length > 0) {
      setSave(true);
      // alert('Silahkan untuk melanjutkan posting!')
    } else {
      alert("Tidak tersedia data jurnal untuk tanggal yang dipilih!");
    }
  };

  const handlePosting = () => {
    setPosting(true);
    let data = {
      reviewer_id: isAuthenticated().data.id,
      memo: memo,
      date: date,
    };
    PostingJournal(data, 'daily');
    // alert(JSON.stringify(data))
  };

  const handleDelete=(id)=>{
    DeleteJournal(id, ()=>GetDailyJournal(date))
  }
  const handleEdit=(data)=>{
    Next()
    userData(data)
  }
  return (
    <div>
      {/* {JSON.stringify(state.additionalData)} */}
      <MDBRow>
        <MDBCol lg="9">
          <h4>Jurnal Umum | Perhari</h4>
        </MDBCol>
        <MDBCol lg="3">
          <MDBBox display="flex" justifyContent="center">
            {save && (
              <MDBBtn
                color="dark-green"
                size="sm"
                gradient="green"
                onClick={handlePosting}
                disabled={posting}
              >
                Posting Jurnal
              </MDBBtn>
            )}
            {!save && (
              <MDBBtn
                color="dark-green"
                size="sm"
                gradient="blue"
                onClick={handleReview}
                disabled={review}
              >
                Review Jurnal
              </MDBBtn>
            )}

            <MDBBtn
              color="dark-green"
              size="sm"
              gradient="blue"
              onClick={Change}
            >
              Tambah Jurnal Manual
            </MDBBtn>
          </MDBBox>
        </MDBCol>
      </MDBRow>
      <hr className="" />
      <MDBCard className="mb-2">
        <MDBCardBody className="p-1">
          <MDBRow>
            <MDBCol lg="3">
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container justify="space-around">
                  <KeyboardDatePicker
                    margin="normal"
                    id="date-picker-dialog"
                    label="Filter Tanggal"
                    format="dd/MM/yyyy"
                    value={selectedDate}
                    onChange={handleDateChange}
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                  />
                </Grid>
              </MuiPickersUtilsProvider>
            </MDBCol>
            <MDBCol lg="3">
              <h5 className="pt-2 mx-2">
                Tanggal Transaksi<br></br>
                <span>{`${selectedDate.getDate()}/${
                  selectedDate.getMonth() + 1
                }/${selectedDate.getFullYear()}`}</span>
              </h5>
            </MDBCol>
            <MDBCol lg="3">
              <h5 className="pt-2 mx-2">
                Status<br></br>
                {reviewStatus()}
              </h5>
            </MDBCol>
            <MDBCol lg="3">
              <h5 className="pt-2 mx-2">
                Diperiksa Oleh<br></br>
                {review && (
                  <small>
                    <b>Accountant</b>
                  </small>
                )}
                {!review && <small>...............................</small>}
              </h5>
            </MDBCol>
          </MDBRow>
        </MDBCardBody>
        {state.loading && <LinearProgress />}
      </MDBCard>
      {review && (
        <MDBCard className="mb-2">
          {state && (
            <MDBCardBody className="p-1">
              <MDBTable>
                <MDBTableHead color="primary-color" textWhite>
                  <tr>
                    <th>#</th>
                    <th>NO. REFERENSI</th>
                    <th>AKUN</th>
                    <th>DESKRIPSI</th>
                    <th>DEBIT(Rp.)</th>
                    <th>KREDIT(Rp.)</th>
                    <th>ACTION</th>
                  </tr>
                </MDBTableHead>
                <MDBTableBody>
                  {state.listJournalDaily.map((item, i) => (
                    <tr>
                      <td>{i + 1}</td>
                      <td>
                        <b>{item.reference_number}</b>
                      </td>
                      <td>
                        <b>{item.name}</b>
                      </td>
                      <td>{item.information}</td>
                      <td>
                        <NumberFormat
                          displayType={"text"}
                          thousandSeparator={true}
                          prefix={"Rp. "}
                          value={item.debit}
                        />
                      </td>
                      <td>
                        <NumberFormat
                          displayType={"text"}
                          thousandSeparator={true}
                          prefix={"Rp. "}
                          value={item.credit}
                        />
                      </td>
                      {
                          item.review_harian==0&&
                        <>
                          {/* res.review_bulanan==0&& */}
                          <EditIcon
                            color="dark-green"
                            size="sm"
                            style={{ color: "green", margin: "10px" }}
                            onClick={() => handleEdit(item)}
                          />
                          <DeleteIcon
                            color="red"
                            // size="sm"
                            style={{ color: "red", margin: "10px" }}
                            onClick={() => handleDelete(item.id)}
                          />
                        </>
                      }
                    </tr>
                  ))}

                  {/* <tr color="primary-color">
                                        <th colspan="6">No. Transaksi : <b>PUSAT/IN/PEN/001/10-2020</b></th>
                                    </tr> */}
                </MDBTableBody>
              </MDBTable>
              <hr></hr>
              <MDBRow className="mx-3">
                <MDBCol lg="9">
                  <h5 className="pt-2 mx-2">
                    <small>TOTAL DEBIT</small>
                    <br></br>
                    <small>TOTAL KREDIT</small>
                  </h5>
                </MDBCol>
                <MDBCol lg="3">
                  <MDBBox display="flex" justifyContent="start">
                    <h5 className="pt-2 mx-2">
                      <small>
                        <b>
                          <NumberFormat
                            displayType={"text"}
                            thousandSeparator={true}
                            prefix={"Rp. "}
                            value={state.additionalData.total_debit}
                          />
                        </b>
                      </small>
                      <br></br>
                      <small>
                        <b>
                          <NumberFormat
                            displayType={"text"}
                            thousandSeparator={true}
                            prefix={"Rp. "}
                            value={state.additionalData.total_credit}
                          />
                        </b>
                      </small>
                    </h5>
                  </MDBBox>
                </MDBCol>
              </MDBRow>
              <hr></hr>
              <MDBRow className="mx-3">
                <MDBCol lg="6">{memoComponent()}</MDBCol>
              </MDBRow>
            </MDBCardBody>
          )}
          {state.listJournalDaily.length === 0 && (
            <MDBBox display="flex" justifyContent="center">
              <h4 style={{ color: "red" }}>
                Data Tidak Tersedia, Silahkan Pilih Tanggal Lain!
              </h4>
            </MDBBox>
          )}
        </MDBCard>
      )}
    </div>
  );
};

export default JurnalPerhariComponent;
