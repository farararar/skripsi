import CreateDataContext from './CreateDataContext'
import axios from 'axios'
import {API} from '../Api/AccountingApi'

const StockOpnameReducer = (state, action) => {
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
        case 'LIST-STOCK-OPNAME':
            return {
                ...state,
                listStockOpname:action.payload
            }
            case 'LIST-STATUS':
                return {
                    ...state,
                    listStatus: action.payload
                }
        default:
            return state
    }
}

const ListStockOpname = dispatch => () => {
    dispatch ({type: 'LOADING', payload: 'Menampilkan List Stock Opname'})
    axios.get(`${API}/stock-opname`)
      .then(res => {
        //   alert(JSON.stringify(res.data.data.data))
        if(res.data.success){
            dispatch({type: 'NO-LOADING'})
            dispatch({type: 'LIST-STOCK-OPNAME', payload:res.data.data})
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

const AddStockOpname = dispatch => (data, callback) => {
    dispatch ({type: 'LOADING', payload: 'Menyimpan Data Stcok Opname...'})
    axios.post(`${API}/stock-opname`, data)
      .then(res => {
        //   alert(JSON.stringify(res)) 
        if(res.data.success){
            dispatch({type: 'NO-LOADING'})
            alert(res.data.message)
            if(callback){
                callback()
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

const DeleteMaterialCategory = dispatch => (id, callback) => {
    dispatch ({type: 'LOADING', payload: 'Mengahapus Data Kategori Bahan Baku...'})
    axios.delete(`${API}/raw-category/${id}`)
      .then(res => {
        //   alert(JSON.stringify(res)) 
        if(res.data.success){
            dispatch({type: 'NO-LOADING'})
            if(callback){
                callback()
                alert('Kategori Bahan Berhasil Dihapus!')
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

const ListStatus = dispatch => () => {
    dispatch({
        type: 'LOADING',
        payload: 'Menampilkan List Status'
    })
    axios.get(`${API}/stock-opname/produk/status`)
        .then(res => {
            //   alert(JSON.stringify(res.data.data.data))
            if (res.data.success) {
                dispatch({
                    type: 'NO-LOADING'
                })
                dispatch({
                    type: 'LIST-STATUS',
                    payload: res.data.data
                })
            } else {
                alert(res.data.message)
                dispatch({
                    type: 'NO-LOADING'
                })
            }
        }).catch(error => {
            dispatch({
                type: 'NO-LOADING'
            })
            alert(error)
            // console.log(error)
        })
}

export const {Provider, Context} = CreateDataContext(
    StockOpnameReducer,
    {ListStockOpname, AddStockOpname, DeleteMaterialCategory, ListStatus},
    {loading: false, message:'', listStockOpname:[], listStatus:[]}
)