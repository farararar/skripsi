import CreateDataContext from './CreateDataContext'
import axios from 'axios'
import {API} from '../Api/AccountingApi'

const JournalReducer = (state, action) => {
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
        case 'LIST-JOURNAL-DAILY':
            return {
                ...state,
                listJournalDaily:action.payload
            }
        case 'LIST-JOURNAL-DAILY-ADDITIONAL':
            return {
                ...state,
                additionalData:action.payload
            }
            case 'LIST-LAPORAN-KEUANGAN':
                return {
                    ...state,
                    listLaporanKeuangan: action.payload
                }
        default:
            return state
    }
}

const GetDailyJournal = dispatch => (date) => {
    dispatch ({type: 'LOADING', payload: 'Menampilkan Data Jurnal...'})
    console.log(`${API}/journal/${date}`)
    axios.get(`${API}/journal/${date}`)
      .then(res => {
        //   alert(JSON.stringify(res.data.additional_data))
        if(res.data.success){
            dispatch({type: 'NO-LOADING'})
            dispatch({type: 'LIST-JOURNAL-DAILY', payload:res.data.data})
            dispatch({type: 'LIST-JOURNAL-DAILY-ADDITIONAL', payload:res.data.additional_data})
        }else{
            alert(res.data.message)
            dispatch({type: 'NO-LOADING'})
            dispatch({type: 'LIST-JOURNAL-DAILY', payload:[]})
        }
    }).catch(error => {
        dispatch({type: 'NO-LOADING'})
        alert(error)
        // console.log(error)
    })
}

const PostingJournal = dispatch => (data, url) => {
    dispatch ({type: 'LOADING', payload: 'Menampilkan Data Jurnal...'})
    axios.post(`${API}/journal/review-${url}`, data)
      .then(res => {
        //   alert(JSON.stringify(res))
        if(res.data.success){
            dispatch({type: 'NO-LOADING'})
            alert(res.data.message)
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



const JournalManual = dispatch => (data, callback, status, id) => {
    dispatch ({type: 'LOADING', payload: 'Loading Data Manual...'})
    var Fetch = ''
    if(status){
        Fetch = axios.post(`${API}/journal/store`, data)
    }else{
        Fetch = axios.put(`${API}/journal/${id}/update`, data);
    }
      Fetch.then(res => {
          console.log(JSON.stringify(res))
        if(res.data.success){
            dispatch({type: 'NO-LOADING'})
            callback()
            alert(res.data.message)
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


const DeleteJournal = dispatch => (userId, callback) => {
    dispatch ({type: 'LOADING', payload: 'Loading Delete...'})
    axios.delete(`${API}/journal/${userId}/delete`)
      .then(res => {
          console.log(JSON.stringify(res))
        if(res.data.success){
            dispatch({type: 'NO-LOADING'})
            callback()
            alert(res.data.message)
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
const ListLaporanKeuangan = dispatch => (filter) => {
    dispatch ({type: 'LOADING', payload: 'Menampilkan List Bahan Baku'})
    if(filter != ''){
        var url = `${API}/account-report?since=${filter.since}&until=${filter.until}`;
    }else{
        var url = `${API}/account-report`;
    }
    axios.get(url)
      .then(res => {
        if(res.data.success){
            dispatch({type: 'NO-LOADING'})
            dispatch({type: 'LIST-LAPORAN-KEUANGAN', payload:res.data.data})
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
    JournalReducer,
    {GetDailyJournal, PostingJournal, JournalManual, DeleteJournal, ListLaporanKeuangan},
    {loading: false, message:'', listJournalDaily:[], additionalData:{}, journalManual:[], listLaporanKeuangan:[]}
)