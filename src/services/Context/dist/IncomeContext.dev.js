"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Context = exports.Provider = void 0;

var _CreateDataContext2 = _interopRequireDefault(require("./CreateDataContext"));

var _axios = _interopRequireDefault(require("axios"));

var _AccountingApi = require("../Api/AccountingApi");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var IncomeReducer = function IncomeReducer(state, action) {
  switch (action.type) {
    case 'LOADING':
      return _objectSpread({}, state, {
        loading: true,
        message: action.payload
      });

    case 'NO-LOADING':
      return _objectSpread({}, state, {
        loading: false,
        message: ''
      });

    case 'LIST-INCOME':
      return _objectSpread({}, state, {
        listIncome: action.payload
      });

    case 'DETAIL-INCOME':
      return _objectSpread({}, state, {
        detailIncome: action.payload
      });

    case 'DETAIL-ACCOUNT':
      return _objectSpread({}, state, {
        detailAccount: action.payload
      });

    case 'DETAIL-USER':
      return _objectSpread({}, state, {
        detailUser: action.payload
      });

    case 'DETAIL-CUSTOMER':
      return _objectSpread({}, state, {
        detailCustomer: action.payload
      });

    case 'DETAIL-REVIEWER':
      return _objectSpread({}, state, {
        detailReviewer: action.payload
      });

    default:
      return state;
  }
};

var AddIncome = function AddIncome(dispatch) {
  return function (data, callback) {
    dispatch({
      type: 'LOADING',
      payload: 'Menyimpan Transaksi'
    });

    _axios["default"].post("".concat(_AccountingApi.API, "/income/store"), data).then(function (res) {
      if (res.data.success) {
        dispatch({
          type: 'NO-LOADING'
        });
        callback();
        alert('Transaksi Berhasil Disimpan!');
      } else {
        alert(res.data.message);
        dispatch({
          type: 'NO-LOADING'
        });
      }
    })["catch"](function (error) {
      dispatch({
        type: 'NO-LOADING'
      });
      alert(error); // console.log(error)
    });
  };
};

var ListIncome = function ListIncome(dispatch) {
  return function (callback) {
    dispatch({
      type: 'LOADING',
      payload: 'Menampilkan data transaksi....'
    });

    _axios["default"].get("".concat(_AccountingApi.API, "/income")).then(function (res) {
      //   alert(JSON.stringify(res))
      if (res.data.success) {
        dispatch({
          type: 'NO-LOADING'
        });
        dispatch({
          type: 'LIST-INCOME',
          payload: res.data.data.data
        });

        if (callback) {
          callback();
        }
      } else {
        alert(res.data.message);
        dispatch({
          type: 'NO-LOADING'
        });
      }
    })["catch"](function (error) {
      dispatch({
        type: 'NO-LOADING'
      });
      alert(error); // console.log(error)
    });
  };
};

var GetDetailIncome = function GetDetailIncome(dispatch) {
  return function (id) {
    dispatch({
      type: 'LOADING',
      payload: 'Menampilkan Detail Transaksi....'
    });

    _axios["default"].get("".concat(_AccountingApi.API, "/income/").concat(id)).then(function (res) {
      //   alert(JSON.stringify(res))
      if (res.data.success) {
        dispatch({
          type: 'NO-LOADING'
        });
        dispatch({
          type: 'DETAIL-INCOME',
          payload: res.data.data
        });
        dispatch({
          type: 'DETAIL-ACCOUNT',
          payload: res.data.data.account
        });
        dispatch({
          type: 'DETAIL-USER',
          payload: res.data.data.user
        });
        dispatch({
          type: 'DETAIL-CUSTOMER',
          payload: res.data.data.customer
        });
        dispatch({
          type: 'DETAIL-REVIEWER',
          payload: res.data.data.reviewed_by
        });
      } else {
        alert(res.data.message);
        dispatch({
          type: 'NO-LOADING'
        });
      }
    })["catch"](function (error) {
      dispatch({
        type: 'NO-LOADING'
      });
      alert(error); // console.log(error)
    });
  };
};

var ReviewIncome = function ReviewIncome(dispatch) {
  return function (id) {
    dispatch({
      type: 'LOADING',
      payload: 'Mengirim...'
    });

    _axios["default"].get("".concat(_AccountingApi.API, "/income/").concat(id)).then(function (res) {
      //   alert(JSON.stringify(res))
      if (res.data.success) {
        dispatch({
          type: 'NO-LOADING'
        });
        dispatch({
          type: 'DETAIL-INCOME',
          payload: res.data.data
        });
        dispatch({
          type: 'DETAIL-ACCOUNT',
          payload: res.data.data.account
        });
        dispatch({
          type: 'DETAIL-USER',
          payload: res.data.data.user
        });
        dispatch({
          type: 'DETAIL-CUSTOMER',
          payload: res.data.data.customer
        });
        dispatch({
          type: 'DETAIL-REVIEWER',
          payload: res.data.data.reviewed_by
        });
      } else {
        alert(res.data.message);
        dispatch({
          type: 'NO-LOADING'
        });
      }
    })["catch"](function (error) {
      dispatch({
        type: 'NO-LOADING'
      });
      alert(error); // console.log(error)
    });
  };
}; // const GetDetailIncome = dispatch => async (id) => {
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


var _CreateDataContext = (0, _CreateDataContext2["default"])(IncomeReducer, {
  AddIncome: AddIncome,
  ListIncome: ListIncome,
  GetDetailIncome: GetDetailIncome
}, {
  loading: false,
  message: '',
  listIncome: [],
  detailIncome: '',
  detailAccount: '',
  detailUser: '',
  detailCustomer: '',
  detailReviewer: ''
}),
    Provider = _CreateDataContext.Provider,
    Context = _CreateDataContext.Context;

exports.Context = Context;
exports.Provider = Provider;