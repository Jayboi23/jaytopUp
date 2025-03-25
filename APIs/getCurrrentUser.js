import axios from "axios";

export const getCurrentUser = async (id) => {
    const url = `https://jaytopup-backend.onrender.com/api/users/get-current-user/${id}`;

    try {
        const response = await axios.get(url, {
            headers: {
                "Content-Type": "application/json" // Ensure the content type is set
            }
        });

        const responseData = response.data; // Extract response data
        // console.log("response",response.data)
        return responseData;

    } catch (error) {

        // Handle errors
        if (error.response) {

            // The request was made and the server responded with a status code
           // console.error("Server Error:", error.response.data);
            throw new Error(`${error.response.data.message || error.response.statusText}`);

        } else if (error.request) {

            // The request was made but no response was received
            throw new Error("Network Error: No response received from the server");

        } else {
            // Something else went wrong
            throw new Error(`Error: ${error.message}`);
        }
    }
}