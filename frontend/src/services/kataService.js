
import axios from './axiosConfig';

export const getAllKatas = async () => await axios.get('/katas')

    

export const getKataByID = (token, id) => {
    // http://localhost:8000/api/katas?id=XXXXXXXXXXXX
    // Add headers with JWT in x-access-token
    const options = {
        headers: {
            'x-access-token': token
        },
        params: {
            id
        }
    }

    return axios.get('/katas', options)
}

