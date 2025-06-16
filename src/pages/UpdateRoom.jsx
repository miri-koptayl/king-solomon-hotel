import { useForm } from "react-hook-form";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import { httpUpdateRoom } from "../api/roomService";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const UpdateRoom = () => {
    let navigate = useNavigate();
    const [room, setRoom] = useState(null);
    const user =JSON.parse(localStorage.getItem("currentUserLS"))
    console.log(user.token)
    useEffect(() => {
        const storedRoom = JSON.parse(localStorage.getItem("room"));
        if (storedRoom) {
            setRoom(storedRoom);
        } else {
            console.error("לא נמצא חדר ב-localStorage");
            navigate("/RoomList");
        }
    }, [navigate]);

    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    useEffect(() => {
        if (room) {
            reset({
                roomCategories: room.roomCategories || "",
                description: room.description || "",
                imagePath: room.imagePath || "",
                price: room.price || "",
                numBads: room.numBads || "",
            });
        }
    }, [room, reset]);

    const save = (data) => {
        if (room) {
            console.log(user)
            httpUpdateRoom(room._id, data, user.token)
                .then((res) => {
                    Swal.fire({
                        title: "עודכן בהצלחה !",
                        icon: "success",
                        confirmButtonText: "אישור"
                    });
                    navigate("/RoomList");
                })
                .catch((err) => {
                    console.log(err);
                    if (err.response) {
                        Swal.fire({
                            title: "שגיאה בעדכון!",
                            text: err.response.status === 409 ? "  אחד הפרטים שהזנת לא מתאימים." : err.response.data.message,
                            icon: "error",
                            confirmButtonText: "אישור"
                        });
                    } else {
                        Swal.fire({
                            title: "שגיאה בשרת!",
                            text: "נא לנסות שוב מאוחר יותר.",
                            icon: "error",
                            confirmButtonText: "אישור"
                        });
                    }
                });
        }
    };

    const handleCancel = () => {
        navigate("/RoomList");
    };

    if (!room) {
        return null;
    }

    return (
        <Container maxWidth="xs">
            <Box mt={8} p={4} boxShadow={3} borderRadius={2} bgcolor="white">
                <Typography variant="h5" align="center" gutterBottom>
                    עדכון חדר
                </Typography>

                <form onSubmit={handleSubmit(save)}>
                    <TextField
                        fullWidth
                        margin="normal"
                        label="קטגוריה"
                        type="text"
                        {...register("roomCategories", {
                            required: "נא להכניס קטגוריה",
                        })}
                        error={!!errors.roomCategories}
                        helperText={errors.roomCategories?.message}
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        label="תיאור"
                        type="text"
                        {...register("description", {
                            required: "נא להכניס תאור",
                        })}
                        error={!!errors.description}
                        helperText={errors.description?.message}
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        label="כתובת תמונה"
                        type="text"
                        {...register("imagePath", {
                            required: "נא להכניס תמונה",
                        })}
                        error={!!errors.imagePath}
                        helperText={errors.imagePath?.message}
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        label="מחיר"
                        type="text"
                        {...register("price", {
                            required: "נא להכניס מספר",
                        })}
                        error={!!errors.price}
                        helperText={errors.price?.message}
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        label="מספר מיטות"
                        type="text"
                        {...register("numBads", {
                            required: "נא להכניס מספר",
                        })}
                        error={!!errors.numBads}
                        helperText={errors.numBads?.message}
                    />

                    <Button type="submit" fullWidth variant="contained" color="primary">
                        עדכן
                    </Button>
                    <Button
                        type="button"
                        fullWidth
                        variant="contained"
                        style={{ backgroundColor: "#b88a4b", color: "#fff" }}
                        onClick={handleCancel}
                        sx={{ mt: 2 }}
                    >
                        ביטול
                    </Button>

                </form>
            </Box>
        </Container>
    );
};

export default UpdateRoom;
