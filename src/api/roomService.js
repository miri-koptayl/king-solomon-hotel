import axios from "axios";

let baseUrl = "https://hotel-server-master.onrender.com/api/rooms";
// let baseUrl = "http://localhost:8080/api/rooms"

// קבלת מספר הדפים הכולל
// export const httpGetTotalRoomPages = (limit = 4,) => {
//     return axios.get(`${baseUrl}/totalPages?limit=${limit}`, {
//         // headers: { Authorization: `Bearer ${token}` }  // ודאי שהטוקן תקין אם נדרש
//     });
// };


// קבלת כל החדרים עם דפדוף
export const httpGetAllRooms = (page, limit) => {
    console.log("Calling API to fetch rooms:", page, limit);
    return axios.get(`${baseUrl}?page=${page}&limit=${limit}`)
        .then(response => {
            console.log("API response:", response);  // הצגת התשובה שהתקבלה
            return response.data;
        })
        .catch(error => {
            console.error("Error fetching rooms:", error);  // שגיאות בקונסול אם יש
            throw error;
        });
};

// קבלת חדר לפי מזהה
export const httpGetRoomById = (id, token) => {
    return axios.get(`${baseUrl}/${id}`, {
        headers: {
            authorization: token
        }
    });
};

// הוספת חדר חדש
export const httpAddRoom = (room,token) => {
    return axios.post(baseUrl, room, {
        headers: {
            authorization: token
        }    });
};

// עדכון חדר לפי מזהה
export const httpUpdateRoom = (id, room ,token) => {
    return axios.put(`${baseUrl}/${id}`, room, {
        headers: {
            authorization: token
        }    });
};

// מחיקת חדר לפי מזהה
export const httpDeleteRoom = (id,token) => {
    console.log(token)
    return axios.delete(`${baseUrl}/${id}`, {
        headers: {
            authorization: token
        }    });
};






