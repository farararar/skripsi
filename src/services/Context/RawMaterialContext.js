import CreateDataContext from './CreateDataContext'
import axios from 'axios'
import {API} from '../Api/AccountingApi'

const RawMaterialReducer = (state, action) => {
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
        case 'LIST-MATERIAL-RAW':
            return {
                ...state,
                listMaterialRaw:action.payload
            }
        default:
            return state
    }
}

const AddRawMaterial = dispatch => (data, callback) => {
    dispatch ({type: 'LOADING', payload: 'Menyimpan Data Bahan Baku...'})
    axios.post(`${API}/raw-material`, data)
      .then(res => {
        //   alert(JSON.stringify(res)) 
        if(res.data.success){
            dispatch({type: 'NO-LOADING'})
            if(callback){
                callback()
                alert('Bahan Baku Berhasil Ditambahkan!')
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

const ListRawMaterial = dispatch => (filter) => {
    dispatch ({type: 'LOADING', payload: 'Menampilkan List Bahan Baku'})
    if(filter != ''){
        var url = `${API}/raw-material?filter=${filter}`;
    }else{
        var url = `${API}/raw-material`;
    }
    axios.get(url)
      .then(res => {
        //   alert(JSON.stringify(res.data.data.data))
        if(res.data.success){
            dispatch({type: 'NO-LOADING'})
            dispatch({type: 'LIST-MATERIAL-RAW', payload:res.data.data})
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
                alert('Transaksi Berhasil Dihapus!')
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


export const {Provider, Context} = CreateDataContext(
    RawMaterialReducer,
    {AddRawMaterial, ListRawMaterial,  DeleteMaterialCategory},
    {loading: false, message:'', listMaterialRaw:[]}
)