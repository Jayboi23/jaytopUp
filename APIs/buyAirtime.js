import axios from "axios";

export const postBuyAirtime = async (network_id, amount, phone ) => {
    const url = "https://jaytopup-backend.onrender.com/buyAirtime";

    const data = {
        "network_id": network_id,
        "amount": amount,
        "phone": phone
    };

    try {
        const response = await axios.post(url, data, {
            headers: {
                "Content-Type": "application/json" // Ensure the content type is set
            }
        });

        const responseData = response.data; // Extract response data
        console.log("response",response.data)
        return responseData;

    } catch (error) {

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
};