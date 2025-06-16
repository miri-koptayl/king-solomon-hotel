import axios from "axios";

// const baseUrl = "http://localhost:8080/api/invitation"; 
const baseUrl = "https://hotel-server-master.onrender.com/api/invitation"; 

export const httpAddInvitation = (invitation) => {
    console.log(invitation);
    return axios.post(`${baseUrl}`, invitation);
};

export const httpDeleteInvitation = (invitationId) => {
    console.log(invitationId)
    return axios.post(`${baseUrl}/delete`, { invitationId });
};

export const httpGetAllInvitations = (token) => {
    return axios.get(`${baseUrl}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }).then(res => res.data);
};
