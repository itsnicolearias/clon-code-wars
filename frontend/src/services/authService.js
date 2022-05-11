import axios from "./axiosConfig";


export const login = (email, password) => {

    // Declare Body to POST
    let body = {
        email: email,
        password: password
    }

    // Send POST request to login endpoint
    // http://localhost:4000/api/auth/login
    return axios.post('/auth/login', body)

}


export const register = (name, username, email, password) => {

    // Declare Body to POST
    let body = {
        name: name,
        username: username,
        email: email,
        password: password
        
    }

    // Send POST request to login endpoint
    // http://localhost:4000/api/auth/login
    return axios.post('/auth/register', body)

}
