import React, { useState } from "react";
import { useSelector } from "react-redux";
import { CardMedia, Typography, Button, Box, Divider } from "@mui/material";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { httpDeleteRoom } from "../api/roomService";

import Swal from "sweetalert2";

const Room = ({ room, onAddToCart, onDeleteRoom }) => {
    const [isHovered, setIsHovered] = useState(false);
    const user = useSelector((state) => state.user?.currentUser);
    const userLocal =JSON.parse(localStorage.getItem("currentUserLS"))

    let navigate = useNavigate();
const deleteRoom = () => {
    console.log(userLocal.token);
    Swal.fire({
        title: "?האם אתה בטוח",
        text: "!לא תוכל לשחזר את החדר לאחר המחיקה",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "!כן, מחק",
        cancelButtonText: "ביטול"
    }).then((result) => {
        if (result.isConfirmed) {
         onDeleteRoom(room._id);   
        }
    });
};


    const handleUpdateRoom = () => {
        localStorage.setItem("room", JSON.stringify(room));
        navigate("/UpdateRoom");
    };

    return (
        <Box
            sx={{
                maxWidth: 400,
                m: 2,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <Box sx={{ width: "100%", textAlign: "right", pr: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: "bold", color: "brown" }}>
                    {room.roomCategories}
                </Typography>
            </Box>

            <Divider sx={{ width: "100%", my: 1, borderBottomWidth: 1 }} />

            <Box sx={{ position: "relative", width: "100%", height: 250 }}>
                <CardMedia
                    component="img"
                    height="250"
                    width="100%"
                    image={room.imagePath}
                    alt="תמונה של חדר"
                    sx={{ objectFit: "cover", borderRadius: 2 }}
                />

                {isHovered && room._id && (
                    <Button
                        component={Link}
                        to={`/RoomDescription/${room._id}`}
                        variant="contained"
                        sx={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            backgroundColor: "#3f67a4",
                            color: "white",
                            "&:hover": { backgroundColor: "#2a4a7d" },
                        }}
                    >
                        לפרטים
                    </Button>
                )}
            </Box>

            <Typography variant="h6" sx={{ mt: 2, color: "brown" }}>
                {room.description}
            </Typography>

            <Box sx={{ width: "100%", display: "flex", flexDirection: "column", gap: 1, mt: 2 }}>
                {user && user.role === "ADMIN" && (
                    <Button variant="contained" color="error" onClick={deleteRoom}>
                        מחק
                    </Button>
                )}
                {user && user.role === "ADMIN" && (
                    <Button variant="contained" color="primary" onClick={handleUpdateRoom}>

                        עדכון

                    </Button>
                )}
                <Button variant="contained" color="#1C4039" onClick={() => onAddToCart(room)}>
                    <Typography variant="h6" sx={{  color: "#3f74a1" }}>
                        הזמן עכשיו
                    </Typography>

                </Button>
            </Box>
        </Box>
    );
};

export default Room;
