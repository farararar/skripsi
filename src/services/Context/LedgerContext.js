import CreateDataContext from './CreateDataContext'
import axios from 'axios'
import { API } from '../Api/AccountingApi'

const LedgerReducer = (state, action) => {
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
        case 'LIST-LEDGER':
            return {
                ...state,
                listLedger: action.payload
            }
        case 'LIST-NERACA':
            return {
                ...state,
                listNeraca: action.payload
            }
        case 'LEDGER-ADDITIONAL':
            return {
                ...state,
                ledgerAdditional: action.payload
            }
        default:
            return state
    }
}

const ListLedger = dispatch => (data) => {
    dispatch({ type: 'LOADING', payload: 'Menampilkan Data Buku Besar...' })
    // axios.post(`${API}/ledger`, data)
    axios.get(`${API}/buku-besar?tahun=${data.month}&bulan=${data.year}&account_id=${data.account_id}`)
        .then(res => {
            //   alert(JSON.stringify(res.data.data.daftar))
            if (res.data.success) {
                dispatch({ type: 'NO-LOADING' })
                dispatch({ type: 'LIST-LEDGER', payload: res.data.data.daftar })
                dispatch({ type: 'LEDGER-ADDITIONAL', payload: res.data.additional_data })
            } else {
                alert(res.data.message)
                dispatch({ type: 'NO-LOADING' })
                dispatch({ type: 'LIST-LEDGER', payload: [] })
            }
        }).catch(error => {
            dispatch({ type: 'NO-LOADING' })
            alert(error)
            // console.log(error)
        })
}

const ListNeraca = dispatch => (data) => {
    dispatch({ type: 'LOADING', payload: 'Menampilkan Data Buku Besar...' })
    // axios.post(`${API}/ledger`, data)
    axios.get(`${API}/neraca-saldo?tahun=${data.month}&bulan=${data.year}`)
        .then(res => {
            alert(JSON.stringify(res.data.data))
            if (res.data.success) {
                dispatch({ type: 'NO-LOADING' })
                dispatch({ type: 'LIST-NERACA', payload: res.data.data })
                dispatch({ type: 'NERACA-ADDITIONAL', payload: res.data.additional_data })
            } else {
                alert(res.data.message)
                dispatch({ type: 'NO-LOADING' })
                dispatch({ type: 'LIST-LEDGER', payload: [] })
            }
        }).catch(error => {
            dispatch({ type: 'NO-LOADING' })
            alert(error)
            // console.log(error)
        })
}

// const ListLedger = dispatch => async (data) => {
//     dispatch ({type: 'LOADING', payload: 'Menampilkan Data Buku Besar...'})
//     try {
//         let response = await fetch(`${API}/ledger`, {
//             method: 'GET',
//             headers: {
//                 'Accept' : 'application/json',
//                 'Content-Type': 'application/json',
//             },
//             body: data
//         })
//         let responseJson = await response.json()
//         if(responseJson.success){
//             dispatch({type: 'NO-LOADING'})
//             dispatch({type: 'LIST-LEDGER', payload:responseJson.data.data})
//             alert(responseJson.data.data)
//         }else{
//             alert(responseJson.message)
//             dispatch({type: 'NO-LOADING'})
//         }
//     } catch (err) {
//         dispatch({type: 'NO-LOADING'})
//         alert(err)
//     }
// }


export const { Provider, Context } = CreateDataContext(
    LedgerReducer,
    { ListLedger, ListNeraca },
    { loading: false, message: '', listLedger: [], ledgerAdditional: '', listNeraca: [] }
)