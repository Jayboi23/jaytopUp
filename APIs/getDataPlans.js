import axios from "axios";

export const fetchDataPlans = async () => {
    try{
        const response = await axios.get('https://jaytopup-backend.onrender.com/api/data-plans')

        const data = response.data
        
        return data;

    }catch(error){
        console.error(error)
    }
}