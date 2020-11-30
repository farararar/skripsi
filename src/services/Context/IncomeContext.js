import CreateDataContext from "./CreateDataContext";
import axios from "axios";
import { API } from "../Api/AccountingApi";

const IncomeReducer = (state, action) => {
  switch (action.type) {
    case "LOADING":
      return {
        ...state,
        loading: true,
        message: action.payload,
      };
    case "NO-LOADING":
      return {
        ...state,
        loading: false,
        message: "",
      };
    case "LIST-INCOME":
      return {
        ...state,
        listIncome: action.payload,
      };
    case "LIST-INCOME-NEXT":
      return {
        ...state,
        listIncome: state.listIncome.concat(action.payload),
      };
    case "PAGE-INFORMATION":
      return {
        ...state,
        currentPage: action.payload.current_page,
        totalData: action.payload.total,
      };
    case "DETAIL-INCOME":
      return {
        ...state,
        detailIncome: action.payload,
      };
    case "DETAIL-ACCOUNT":
      return {
        ...state,
        detailAccount: action.payload,
      };
    case "DETAIL-USER":
      return {
        ...state,
        detailUser: action.payload,
      };
    case "DETAIL-CUSTOMER":
      return {
        ...state,
        detailCustomer: action.payload,
      };
    case "DETAIL-REVIEWER":
      return {
        ...state,
        detailReviewer: action.payload,
      };

    case "INVOICE-INCOME":
      return {
        ...state,
        invoiceIncome: action.payload,
      };
    default:
      return state;
  }
};

const AddIncome = (dispatch) => (data, callback) => {
  dispatch({ type: "LOADING", payload: "Menyimpan Transaksi" });
  axios
    .post(`${API}/income/store`, data)
    .then((res) => {
      if (res.data.success) {
        dispatch({ type: "NO-LOADING" });
        callback();
        alert("Transaksi Berhasil Disimpan!");
      } else {
        alert(res.data.message);
        dispatch({ type: "NO-LOADING" });
      }
    })
    .catch((error) => {
      dispatch({ type: "NO-LOADING" });
      alert(error);
      // console.log(error)
    });
};

const UpdateIncome = (dispatch) => (id, data, callback) => {
  dispatch({ type: "LOADING", payload: "Menyimpan Transaksi" });
  axios
    .post(`${API}/income/${id}/update`, data, {
      headers: {
        "Content-Type": "text/plain",
      },
    })
    .then((res) => {
      if (res.data.success) {
        dispatch({ type: "NO-LOADING" });
        callback();
        alert("Transaksi Berhasil Diupdate!");
      } else {
        alert(res.data.message);
        dispatch({ type: "NO-LOADING" });
      }
    })
    .catch((error) => {
      dispatch({ type: "NO-LOADING" });
      alert(error);
      // console.log(error)
    });
};

const ValidateIncome = (dispatch) => (id, data, callback) => {
  dispatch({ type: "LOADING", payload: "Menyimpan Transaksi" });
  axios
    .put(`${API}/income/${id}/validate`, data, {
      headers: {
        "Content-Type": "text/plain",
      },
    })
    .then((res) => {
      if (res.data.success) {
        dispatch({ type: "NO-LOADING" });
        callback();
        alert("Transaksi Berhasil Diupdate!");
      } else {
        alert(res.data.message);
        dispatch({ type: "NO-LOADING" });
      }
    })
    .catch((error) => {
      dispatch({ type: "NO-LOADING" });
      alert(error);
      // console.log(error)
    });
};

const DeleteIncome = (dispatch) => (id, callback) => {
  dispatch({ type: "LOADING", payload: "Menghapus Transaksi..." });
  axios
    .delete(`${API}/income/${id}/delete`, {
      headers: {
        "Content-Type": "text/plain",
      },
    })
    .then((res) => {
      if (res.data.success) {
        dispatch({ type: "NO-LOADING" });
        callback();
        alert("Transaksi Berhasil Dihapus!");
      } else {
        alert(res.data.message);
        dispatch({ type: "NO-LOADING" });
      }
    })
    .catch((error) => {
      dispatch({ type: "NO-LOADING" });
      alert(error);
      // console.log(error)
    });
};

const ListIncome = (dispatch) => (keyword, callback) => {
  dispatch({ type: "LOADING", payload: "Menampilkan data transaksi...." });
  axios
    .get(`${API}/income?keyword=${keyword}`)
    .then((res) => {
      //   alert(JSON.stringify(res))
      if (res.data.success) {
        dispatch({ type: "NO-LOADING" });
        dispatch({ type: "LIST-INCOME", payload: res.data.data.data });
        dispatch({ type: "PAGE-INFORMATION", payload: res.data.data });
        if (callback) {
          callback();
        }
        return res.data.data.data;
      } else {
        alert(res.data.message);
        dispatch({ type: "NO-LOADING" });
      }
    })
    .catch((error) => {
      dispatch({ type: "NO-LOADING" });
      alert(error);
      // console.log(error)
    });
};

const ListIncomeNext = (dispatch) => (page) => {
  axios
    .get(`${API}/income?page=${page}`)
    .then((res) => {
      if (res.data.success) {
        dispatch({ type: "NO-LOADING" });
        dispatch({ type: "LIST-INCOME-NEXT", payload: res.data.data.data });
      } else {
        alert(res.data.message);
        dispatch({ type: "NO-LOADING" });
      }
    })
    .catch((error) => {
      dispatch({ type: "NO-LOADING" });
      alert(error);
      // console.log(error)
    });
};

const GetDetailIncome = (dispatch) => (id) => {
  dispatch({ type: "LOADING", payload: "Menampilkan Detail Transaksi...." });
  // axios.get(`${API}/invoice-income/${id}`)
  axios
    .get(`${API}/income/${id}`)
    .then((res) => {
      //   alert(JSON.stringify(res))
      if (res.data.success) {
        dispatch({ type: "NO-LOADING" });
        dispatch({ type: "DETAIL-INCOME", payload: res.data.data });
        dispatch({ type: "DETAIL-ACCOUNT", payload: res.data.data.account });
        dispatch({ type: "DETAIL-USER", payload: res.data.data.user });
        dispatch({ type: "DETAIL-CUSTOMER", payload: res.data.data.customer });
        dispatch({
          type: "DETAIL-REVIEWER",
          payload: res.data.data.reviewed_by,
        });
      } else {
        alert(res.data.message);
        dispatch({ type: "NO-LOADING" });
      }
    })
    .catch((error) => {
      dispatch({ type: "NO-LOADING" });
      alert(error);
      // console.log(error)
    });
};

const InvoiceIncome = (dispatch) => (id) => {
  dispatch({ type: "LOADING", payload: "Menampilkan Detail Transaksi...." });
  axios
    .get(`${API}/invoice-income/${id}`)
    // axios.get(`${API}/income/${id}`)
    .then((res) => {
    //   console.log(JSON.stringify(res.data));
      if (res.data.success) {
        const tamp = res.data.data;
        const param = {
          id: "5df3180a09ea16dc4b95f910",
          invoice_no: tamp.invoice_number,
          balance: "null",
          company: "TOKO ROTI AMAYA",
          email: "tes@amaya-cake.com",
          phone: "+1 (872) 588-3809",
          address: "",
          trans_date: tamp.date,
          due_date: "-",
          grand_total: tamp.grand_total.replace(/[^0-9]/g, ""),
          items: tamp.products,
        };
        dispatch({ type: "INVOICE-INCOME", payload: param });
        dispatch({ type: "NO-LOADING" });
      } else {
        alert(res.data.message);
        dispatch({ type: "NO-LOADING" });
      }
    })
    .catch((error) => {
      dispatch({ type: "NO-LOADING" });
      alert(error);
      // console.log(error)
    });
};

const ReviewIncome = (dispatch) => (id, data) => {
  dispatch({ type: "LOADING", payload: "Mengirim..." });
  axios
    .put(`${API}/income/${id}/review`, data)
    .then((res) => {
      //   alert(JSON.stringify(res))
      if (res.data.success) {
        dispatch({ type: "NO-LOADING" });
        window.location.reload();
      } else {
        alert(res.data.message);
        dispatch({ type: "NO-LOADING" });
      }
    })
    .catch((error) => {
      dispatch({ type: "NO-LOADING" });
      alert(error);
      // console.log(error)
    });
};

// const GetDetailIncome = dispatch => async (id) => {
//     dispatch({type: 'LOADING', payload: 'Menampilkan Data . . .'})
//     try {
//         let response = await fetch(`${API}/income/${id}`, {
//             method: 'GET',
//             headers: {
//                 'Accept' : 'application/json',
//                 'Content-Type': 'application/json',
//             },
//         })
//         let responseJson = await response.json()
//         // alert(JSON.stringify(responseJson))
//         if(responseJson.success){
//             dispatch({type: 'NO-LOADING'})
//             dispatch({type: 'DETAIL-INCOME', payload:responseJson.data.account})
//         }else{
//             alert(responseJson.message)
//             dispatch({type: 'NO-LOADING'})
//         }
//     } catch (err) {
//         dispatch({type: 'NO-LOADING'})
//         alert(err)
//         // console.log(err)
//     }
// }

export const { Provider, Context } = CreateDataContext(
  IncomeReducer,
  {
    AddIncome,
    InvoiceIncome,
    ListIncome,
    GetDetailIncome,
    ReviewIncome,
    ListIncomeNext,
    UpdateIncome,
    DeleteIncome,
    ValidateIncome,
  },
  {
    loading: false,
    invoiceIncome: [],
    message: "",
    listIncome: [],
    detailIncome: "",
    detailAccount: "",
    detailUser: "",
    detailCustomer: "",
    detailReviewer: "",
    currentPage: "",
    totalData: "",
  }
);
