import CreateDataContext from './CreateDataContext'
import axios from 'axios'
import {API} from '../Api/AccountingApi'

const MaterialCategoryReducer = (state, action) => {
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
        case 'LIST-MATERIAL-CATEGORY':
            return {
                ...state,
                listMaterialCategory:action.payload
            }
        default:
            return state
    }
}

const ListMaterialCategory = dispatch => () => {
    dispatch ({type: 'LOADING', payload: 'Menampilkan List Kategori Material'})
    axios.get(`${API}/raw-category`)
      .then(res => {
        //   alert(JSON.stringify(res.data.data.data))
        if(res.data.success){
            dispatch({type: 'NO-LOADING'})
            dispatch({type: 'LIST-MATERIAL-CATEGORY', payload:res.data.data})
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

const AddMaterialCategory = dispatch => (data, callback) => {
    dispatch ({type: 'LOADING', payload: 'Menyimpan Data Kategori Bahan Baku...'})
    axios.post(`${API}/raw-category`, data)
      .then(res => {
        //   alert(JSON.stringify(res)) 
        if(res.data.success){
            dispatch({type: 'NO-LOADING'})
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


export const {Provider, Context} = CreateDataContext(
    MaterialCategoryReducer,
    {ListMaterialCategory, AddMaterialCategory, DeleteMaterialCategory},
    {loading: false, message:'', listMaterialCategory:[]}
)