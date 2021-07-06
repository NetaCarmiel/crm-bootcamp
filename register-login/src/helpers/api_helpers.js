
import axios from 'axios';
import {basicURL} from '../constans/constants.js'
import {addToLS} from '../helpers/local_storage_helper.js'



export async function connectToServerLogin(params) {
   const res =  await axios.post(basicURL+'/login',{...params})
   if(res.data.status) {
        localStorage.setItem("my_user", res.data.accessToken);
        window.location.href = "http://localhost:3000/home";
        return true;
    }
    return false;
}


export async function connectToServerRegister(params) {
   const res =  await axios.post(basicURL+'/register',{...params})
   switch(res.data.status) {
        //user already exist
        case 0:  
            return {status: 'exist'}
        //ok
        case 1:  
            localStorage.setItem("my_user", res.data.accessToken);
            window.location.href = "http://localhost:3000/home";
            break
        //invalid fields
        case 2: 
            return {status:'invalid', valid : res.data.valid}
   }
}

export async function connectToServerReset(params) {
   await axios.post(basicURL+'/reset',{...params})
}


export async function connectToServerChange(params) {
    const res =  await axios.post(basicURL+'/change',{...params})
    return res.data.status;
 }
