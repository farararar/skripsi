import CreateDataContext from './CreateDataContext'
import axios from 'axios'
import {API} from '../Api/AccountingApi'

const CustomerContext = (state, action) => {
    switch(action.type){
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
        case 'LIST-CUSTOMER':
            return {
                ...state,
                listCustomer:action.payload
            }
        default:
            return state
    }
}

const ListCustomer = dispatch => () => {
    dispatch ({type: 'LOADING', payload: 'Menyimpan Transaksi'})
    axios.get(`${API}/customer`)
      .then(res => {
        if(res.data.success){
            dispatch({type: 'NO-LOADING'})
            dispatch({type: 'LIST-CUSTOMER', payload:res.data.data.data})
        }else{
            alert(res.data.message)
            dispatch({type: 'NO-LOADING'})
        }
    }).catch(error => {
        dispatch({type: 'NO-LOADING'})
        alert(error)
        // console.log(error)
    })
}


export const {Provider, Context} = CreateDataContext(
    CustomerContext,
    {ListCustomer},
    {loading: false, message:'', listCustomer:[]}
)