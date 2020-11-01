import CreateDataContext from './CreateDataContext'
import axios from 'axios'
import {API} from '../Api/AccountingApi'

const AuthReducer = (state, action) => {
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
        default:
            return state
    }
}

const setLogin = (data) => {
    if(typeof window !== 'undefined'){
        localStorage.setItem('login', JSON.stringify(data))
    }
}

const isAuthenticated = dispatch => () => {
    if(typeof window == 'undefined'){
        return false
    }
    if(localStorage.getItem('login')){
        return JSON.parse(localStorage.getItem('login'))
    }else{
        return false
    }
}

const Signin = dispatch => ({email, password}) => {
    dispatch ({type: 'LOADING', payload: 'Mengautentikasi Pengguna...'})
    axios.post(`${API}/login`, { email: email, password: password })
      .then(res => {
        // alert(JSON.stringify(res))
        if(res.data.success){
            // alert(res)
            // console.log(res)
            dispatch({type: 'NO-LOADING'})
            setLogin(res.data)
            window.location.reload();
        }else{
            alert(res.data.message)
            dispatch({type: 'NO-LOADING'})
        }
    }).catch(error => {
        dispatch({type: 'NO-LOADING'})
        // alert(error)
        // console.log(error)
    })
}

// const Signin = dispatch => async ({email, password}) => {
//     dispatch ({type: 'LOADING', payload: 'Mengautentikasi Pengguna...'})
//     try {
//         let response = await fetch(`${API}/login`, {
//             method: 'GET',
//             headers: {
//                 'Accept' : 'application/json',
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({
//                 email: email,
//                 password: password
//             })
//         })
//         let responseJson = await response.json()
//         if(responseJson.success){
//             dispatch({type: 'NO-LOADING'})
//             setLogin(responseJson.data)
//         }else{
//             alert(responseJson.message)
//             dispatch({type: 'NO-LOADING'})
//         }
//     } catch (err) {
//         dispatch({type: 'NO-LOADING'})
//         alert(err)
//     }
// }

export const {Provider, Context} = CreateDataContext(
    AuthReducer,
    {isAuthenticated, Signin},
    {loading: false, message:''}
)