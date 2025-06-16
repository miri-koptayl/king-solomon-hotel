import React from "react";
import { useDispatch } from "react-redux";
import { deleteFromCart, deleteRoomFromCart, addToCart } from "../features/cartSlice";
import { Card, CardMedia, CardContent, Typography, Button, Box } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

const RoomInvitation = ({ room }) => {
    const dispatch = useDispatch();

    return (
        <Card
            sx={{
                maxWidth: 400,
                m: 2,
                p: 2,
                boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                borderRadius: 4,
                backgroundColor: "#fff8f1",
                border: "2px solid #4b2e14"
            }}
        >
            <CardMedia
                component="img"
                height="250"
                image={room.imagePath}
                alt={room.description}
                sx={{
                    objectFit: "cover",
                    borderRadius: 3,
                    marginBottom: "15px",
                    border: "1px solid #d7ccc8"
                }}
            />

            <CardContent>
                <Typography
                    variant="h5"
                    gutterBottom
                    sx={{ color: "#4b2e14", fontWeight: "bold" }}
                >
                    חדר {room.num}
                </Typography>

                <Typography variant="body1" sx={{ color: "#5d4037" }}>
                    {room.description}
                </Typography>

                <Typography variant="h6" sx={{ mt: 2, color: "#a1887f" }}>
                    מחיר: {room.price} ₪
                </Typography>

                <Typography variant="body2" sx={{ color: "#6d4c41" }}>
                    כמות: {room.qty}
                </Typography>

                <Typography variant="body2" sx={{ color: "#6d4c41", mb: 2 }}>
                    סך הכל: {room.qty * room.price} ₪
                </Typography>

                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Box sx={{ display: "flex", gap: 1 }}>
                        <Fab
                            size="small"
                            sx={{ backgroundColor: "#e0c097", color: "#4b2e14", fontWeight: "bold" }}
                            onClick={() => dispatch(deleteFromCart(room))}
                        >
                            -
                        </Fab>
                        <Fab
                            size="small"
                            sx={{ backgroundColor: "#e0c097", color: "#4b2e14" }}
                            onClick={() => dispatch(addToCart(room))}
                        >
                            <AddIcon />
                        </Fab>
                    </Box>

                    <IconButton
                        onClick={() => dispatch(deleteRoomFromCart(room))}
                        sx={{
                            backgroundColor: "#fbe9e7",
                            color: "#6d4c41",
                            border: "1px solid #bcaaa4",
                            '&:hover': {
                                backgroundColor: "#efebe9"
                            }
                        }}
                    >
                        <DeleteIcon />
                    </IconButton>
                </Box>
            </CardContent>
        </Card>
    );
};

export default RoomInvitation;
