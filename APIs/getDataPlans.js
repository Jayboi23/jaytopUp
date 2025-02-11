import axios from "axios";

export const fetchDataPlans = async () => {
    try{
        const response = await axios.get('https://jaytopup-backend.onrender.com/getDataPlans')

        const data = response.data
        
        return data;

    }catch(error){
        console.error(error)
    }
}