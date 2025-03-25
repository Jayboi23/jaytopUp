import axios from "axios";

export const signIn = async (email, password) => {
    const url = "https://jaytopup-backend.onrender.com/api/users/signin";

    const data = {
        "email": email,
        "password": password,
    };

    try {
        const response = await axios.post(url, data, {
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