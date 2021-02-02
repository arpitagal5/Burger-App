import axios from 'axios' ;

const instance = axios.create({
    baseURL : 'https://react-burger-app-50325-default-rtdb.firebaseio.com/'
})

export default instance ;