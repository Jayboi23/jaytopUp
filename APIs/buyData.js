import axios from "axios";

export const postBuyData = async (network_id, phone, plan_id) =>{
    const url = "https://jaytopup-backend.onrender.com/buyData"

    const data =  {
        "network_id": network_id,
        "phone": phone,
        "plan_id": plan_id

    }

    console.log(data)

    try{
        const response = await axios.post(url, data, {
            headers: {
                "Content-Type": "application/json"
            }
        })

        const resData = response.data
        console.log("Result", resData)
        return resData;
    }catch(error){
         // Handle errors
         if (error.response) {

            // The request was made and the server responded with a status code
            console.error("Server Error:", error.response.data);
            console.error("Status Code:", error.response.status);
            throw new Error(`Server Error: ${error.response.data.message || error.response.statusText}`);

        } else if (error.request) {

            // The request was made but no response was received
            console.error("Network Error:", error.message);
            throw new Error("Network Error: No response received from the server");

        } else {
            // Something else went wrong
            console.error("Error:", error.message);
            throw new Error(`Error: ${error.message}`);
        }
    }
}