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
        default:
            return state
    }
}

const GetDailyJournal = dispatch => (date) => {
    dispatch ({type: 'LOADING', payload: 'Menampilkan Data Jurnal...'})
    console.log(`${API}/journal/${date}`)
    axios.get(`${API}/journal/${date}`)
      .then(res => {
        //   alert(JSON.stringify(res))
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

const PostingJournal = dispatch => (data, date) => {
    dispatch ({type: 'LOADING', payload: 'Menampilkan Data Jurnal...'})
    axios.put(`${API}/journal/${date}/posting`, data)
      .then(res => {
          alert(JSON.stringify(res))
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



const JournalManual = dispatch => (data, callback) => {
    dispatch ({type: 'LOADING', payload: 'Loading Data Manual...'})
    axios.post(`${API}/journal/store`, data)
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

export const {Provider, Context} = CreateDataContext(
    JournalReducer,
    {GetDailyJournal, PostingJournal, JournalManual},
    {loading: false, message:'', listJournalDaily:[], additionalData:'', journalManual:[]}
)