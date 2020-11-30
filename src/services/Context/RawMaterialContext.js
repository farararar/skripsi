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
            case 'LIST-UNIT':
                return{
                    ...state,
                    listUnit:action.payload
                }
                case 'LIST-REPORT':
                    return {
                        ...state,
                        listReportMaterial: action.payload
                    }
                    case 'LIST-STOK':
                    return {
                        ...state,
                        listStok: action.payload
                    }
                    case 'LIST-STATUS':
                        return {
                            ...state,
                            listStatus: action.payload
                        }
                        case 'LIST-RIWAYAT':
                            return {
                                ...state,
                                listRiwayatProduksi: action.payload
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

const UpdateStok = dispatch => (data, callback) => {
    dispatch ({type: 'LOADING', payload: 'Menyimpan Data Bahan Baku...'})
    axios.post(`${API}/stock-material`, data)
      .then(res => {
        //   alert(JSON.stringify(res)) 
        if(res.data.success){
            dispatch({type: 'NO-LOADING'})
            if(callback){
                callback()
                alert('Stok berhasil di Update!')
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

const ListStok = dispatch => (filter) => {
    dispatch ({type: 'LOADING', payload: 'Menampilkan List Bahan Baku'})
        var url = `${API}/stock-material`;
    
    axios.get(url)
      .then(res => {
        //   alert(JSON.stringify(res.data.data.data))
        if(res.data.success){
            dispatch({type: 'NO-LOADING'})
            dispatch({type: 'LIST-STOK', payload:res.data.data})
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

const ListReportMaterial = dispatch => (filter) => {
    dispatch ({type: 'LOADING', payload: 'Menampilkan List Bahan Baku'})
        var url = `${API}/raw-material/report?since=${filter.since}&until=${filter.until}`;
    axios.get(url)
      .then(res => {
        //   alert(JSON.stringify(res.data.data))
        if(res.data.success){
            dispatch({type: 'NO-LOADING'})
            dispatch({type: 'LIST-REPORT', payload:res.data.data})
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

const ListUnit = dispatch => (filter) => {
    dispatch ({type: 'LOADING', payload: 'Menampilkan List Bahan Baku'})
    var url = `${API}/product-unit`;
    axios.get(url)
      .then(res => {
        //   alert(JSON.stringify(res.data.data.data))
        if(res.data.success){
            dispatch({type: 'NO-LOADING'})
            dispatch({type: 'LIST-UNIT', payload:res.data.data})
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

const ListStatus = dispatch => (filter) => {
    dispatch ({type: 'LOADING', payload: 'Menampilkan List Bahan Baku'})
    var url = `${API}/stock-opname/material/status`;
    axios.get(url)
      .then(res => {
        //   alert(JSON.stringify(res.data.data.data))
        if(res.data.success){
            dispatch({type: 'NO-LOADING'})
            dispatch({type: 'LIST-STATUS', payload:res.data.data})
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

const DeleteBahanBaku = dispatch => (id, callback) => {
    dispatch ({type: 'LOADING', payload: 'Mengahapus Data Kategori Bahan Baku...'})
    axios.delete(`${API}/raw-material/${id}`)
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


const ListRiwayatProduksi = dispatch => (id) => {
    dispatch ({type: 'LOADING', payload: 'Menampilkan List Bahan Baku'})
    var url = `${API}/product-process/${id}`;
    axios.get(url)
      .then(res => {
        //   alert(JSON.stringify(res.data.data.data))
        if(res.data.success){
            dispatch({type: 'NO-LOADING'})
            dispatch({type: 'LIST-RIWAYAT', payload:res.data})
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

const StartProduksi= dispatch => (data, callback) => {
    dispatch ({type: 'LOADING', payload: 'Menyimpan Data Bahan Baku...'})
    axios.post(`${API}/product-process`, data)
      .then(res => {
        //   alert(JSON.stringify(res)) 
        if(res.data.success){
            dispatch({type: 'NO-LOADING'})
            if(callback){
                callback()
                // alert('Bahan Baku Berhasil Ditambahkan!')
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

const StopProduksi= dispatch => (data, callback) => {
    dispatch ({type: 'LOADING', payload: 'Menyimpan Data Bahan Baku...'})
    axios.patch(`${API}/product-process`, data)
      .then(res => {
        //   alert(JSON.stringify(res)) 
        if(res.data.success){
            dispatch({type: 'NO-LOADING'})
            if(callback){
                callback()
                // alert('Bahan Baku Berhasil Ditambahkan!')
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
    {AddRawMaterial, ListRawMaterial,  DeleteMaterialCategory, UpdateStok,ListUnit, DeleteBahanBaku, ListReportMaterial, ListStok, ListStatus, ListRiwayatProduksi, StartProduksi, StopProduksi},
    {loading: false, message:'', listMaterialRaw:[], listUnit:[], listReportMaterial:[], listStok:[], listStatus:[], listRiwayatProduksi:[]}
)