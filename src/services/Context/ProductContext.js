import CreateDataContext from './CreateDataContext'
import axios from 'axios'
import {API} from '../Api/AccountingApi'

const ProductReducer = (state, action) => {
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
        case 'LIST-PRODUCT':
            return {
                ...state,
                listProduct:action.payload
            }
        default:
            return state
    }
}

const AddProduct = dispatch => async (formData, callback) => {
    // alert(JSON.stringify(formData))
    dispatch ({type: 'LOADING', payload: 'Menyimpan Data Bahan Baku...'})
    axios.post(`${API}/product`, formData, { headers: {'content-type': `multipart/form-data; boundary=${formData._boundary}`}})
      .then(res => {
        //   alert(JSON.stringify(res)) 
        if(res.data.success){
            dispatch({type: 'NO-LOADING'})
            if(callback){
                callback()
                alert('Produk Berhasil Ditambahkan!')
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

const ListProduct = dispatch => () => {
    dispatch ({type: 'LOADING', payload: 'Menampilkan List Produk'})
    axios.get(`${API}/product`)
      .then(res => {
        //   alert(JSON.stringify(res.data.data.data))
        if(res.data.success){
            dispatch({type: 'NO-LOADING'})
            dispatch({type: 'LIST-PRODUCT', payload:res.data.data})
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



const DeleteProduct = dispatch => (id, callback) => {
    dispatch ({type: 'LOADING', payload: 'Mengahapus Data Produk...'})
    axios.delete(`${API}/product/${id}`)
      .then(res => {
        //   alert(JSON.stringify(res)) 
        if(res.data.success){
            dispatch({type: 'NO-LOADING'})
            if(callback){
                callback()
                alert('Produk Berhasil Dihapus!')
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

const AddIngredients = dispatch => (data, callback) => {
    dispatch ({type: 'LOADING', payload: 'Menyimpan Data Resep...'})
    axios.post(`${API}/product/add-ingredients`, data)
      .then(res => {
        //   alert(JSON.stringify(res)) 
        if(res.data.success){
            dispatch({type: 'NO-LOADING'})
            if(callback){
                callback()
                // alert('Transaksi Berhasil Disimpan!')
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
    ProductReducer,
    {AddProduct, ListProduct, DeleteProduct, AddIngredients},
    {loading: false, message:'', listProduct:[]}
)