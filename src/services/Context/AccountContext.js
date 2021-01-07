import CreateDataContext from './CreateDataContext'
import axios from 'axios'
import { API } from '../Api/AccountingApi'

const AccountReducer = (state, action) => {
    switch (action.type) {
        case 'LOADING':
            return {
                ...state,
                loading: true,
                message: action.payload,
            }
        case 'NO-LOADING':
            return {
                ...state,
                loading: false,
                message: '',
            }
        case 'LIST-ACCOUNT':
            return {
                ...state,
                listAccount: action.payload
            }
        case 'MENU':
            return {
                ...state,
                menu: action.payload
            }
        default:
            return state
    }
}

const ListAccount = dispatch => () => {
    dispatch({ type: 'LOADING', payload: 'Menyimpan Transaksi' })
    axios.get(`${API}/account`)
        .then(res => {
            if (res.data.success) {
                dispatch({ type: 'NO-LOADING' })
                dispatch({ type: 'LIST-ACCOUNT', payload: res.data.data })
            } else {
                alert(res.data.message)
                dispatch({ type: 'NO-LOADING' })
            }
        }).catch(error => {
            dispatch({ type: 'NO-LOADING' })
            alert(error)
            // console.log(error)
        })
}


const Menu = dispatch => () => {
    dispatch({ type: 'LOADING', payload: 'Menyimpan Transaksi' })
    axios.get(`${API}/dashboard`)
        .then(res => {
            console.log('menu = ', res.data.data);
            if (res.data.success) {
                dispatch({ type: 'NO-LOADING' })
                dispatch({ type: 'MENU', payload: res.data.data })
            } else {
                alert(res.data.message)
                dispatch({ type: 'NO-LOADING' })
            }
        }).catch(error => {
            dispatch({ type: 'NO-LOADING' })
            alert(error)
            // console.log(error)
        })
}

export const { Provider, Context } = CreateDataContext(
    AccountReducer,
    { ListAccount, Menu },
    { loading: false, message: '', listAccount: [], menu: [] }
)