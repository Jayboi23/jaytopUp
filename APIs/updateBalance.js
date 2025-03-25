import axios from "axios";

export const updateBalane = async (id, amount, type, ref) => {
    const url = `https://jaytopup-backend.onrender.com/api/users/update-wallet-balance/${id}`;

    const data = {
        "amount": parseInt(amount),
        "reference": ref,
        "description": type === "credit" ? "Deposited  to wallet" : "Debitted from wallet",
        "type": type
      }

    try {
        const response = await axios.put(url, data, {
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