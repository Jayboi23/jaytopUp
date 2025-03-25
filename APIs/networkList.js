import axios from "axios"

export const fetchNetworkList = async () =>{

    try {
        const response = await axios.get('https://jaytopup-backend.onrender.com/api/network-list');

        const data = response.data
        return data
    } catch (err) {
        console.error(err.message)
    }

}