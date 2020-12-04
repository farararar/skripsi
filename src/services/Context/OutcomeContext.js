import CreateDataContext from './CreateDataContext'
import axios from 'axios'
import {API} from '../Api/AccountingApi'

const IncomeReducer = (state, action) => {
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
        case 'LIST-OUTCOME-TYPE':
            return {
                ...state,
                listOutcomeType: action.payload
            }
        case 'LIST-OUTCOME-TYPE-BY':
            return {
                ...state,
                listOutcomeType: action.payload
            }
        case 'LIST-OUTCOME':
            return {
                ...state,
                listOutcome: action.payload
            }
        default:
            return state
    }
}

const ListOutcomeType = dispatch => () => {
    dispatch ({type: 'LOADING', payload: 'Menampilkan Tipe Transaksi Keluar'})
    axios.get(`${API}/outcome_type`)
      .then(res => {
        //   alert(JSON.stringify(res.data.data.data))
        if(res.data.success){
            dispatch({type: 'NO-LOADING'})
            dispatch({type: 'LIST-OUTCOME-TYPE', payload:res.data.data.data})
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

const ListOutcomeTypeBy = dispatch => (type) => {
    dispatch ({type: 'LOADING', payload: 'Menampilkan Tipe Transaksi Keluar'})
    axios.get(`${API}/outcometypeby/${type}`)
      .then(res => {
        //   alert(JSON.stringify(res.data.data.data))
        if(res.data.success){
            dispatch({type: 'NO-LOADING'})
            dispatch({type: 'LIST-OUTCOME-TYPE-BY', payload:res.data.data})
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

const AddOutcome = dispatch => (data, callback) => {
    dispatch ({type: 'LOADING', payload: 'Menyimpan Data Transaksi...'})
    axios.post(`${API}/outcome/store`, data)
      .then(res => {
        //   alert(JSON.stringify(res)) 
        if(res.data.success){
            dispatch({type: 'NO-LOADING'})
            if(callback){
                callback()
                alert('Transaksi Berhasil Disimpan!')
            }
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

const ListOutcome = dispatch => () => {
    dispatch ({type: 'LOADING', payload: 'Menampilkan List Transaksi Keluar...'})
    axios.get(`${API}/outcome`)
      .then(res => {
        //   alert(JSON.stringify(res.data.data.data))
        if(res.data.success){
            dispatch({type: 'NO-LOADING'})
            dispatch({type: 'LIST-OUTCOME', payload:res.data.data.data})
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
    IncomeReducer,
    {ListOutcomeType, AddOutcome, ListOutcome, ListOutcomeTypeBy},
    {loading: false, message:'', listOutcomeType:[], listOutcome:[]}
)