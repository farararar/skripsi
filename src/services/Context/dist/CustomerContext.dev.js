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

var CustomerContext = function CustomerContext(state, action) {
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

    case 'LIST-CUSTOMER':
      return _objectSpread({}, state, {
        listCustomer: action.payload
      });

    default:
      return state;
  }
};

var ListCustomer = function ListCustomer(dispatch) {
  return function () {
    dispatch({
      type: 'LOADING',
      payload: 'Menyimpan Transaksi'
    });

    _axios["default"].get("".concat(_AccountingApi.API, "/customer")).then(function (res) {
      if (res.data.success) {
        dispatch({
          type: 'NO-LOADING'
        });
        dispatch({
          type: 'LIST-CUSTOMER',
          payload: res.data.data.data
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

var _CreateDataContext = (0, _CreateDataContext2["default"])(CustomerContext, {
  ListCustomer: ListCustomer
}, {
  loading: false,
  message: '',
  listCustomer: []
}),
    Provider = _CreateDataContext.Provider,
    Context = _CreateDataContext.Context;

exports.Context = Context;
exports.Provider = Provider;