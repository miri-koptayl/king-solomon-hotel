import { useForm } from "react-hook-form";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import {httpAddRoom} from "../api/roomService"
import { useNavigate } from "react-router-dom";

import Swal from "sweetalert2";

const EditRoom = ({}) => {

    // let {register}=useForm({mode:"all",defaultValues:r})
    let { register, handleSubmit, formState: { errors } } = useForm();
    let navigate = useNavigate();
    const user =JSON.parse(localStorage.getItem("currentUserLS"))
    const save = (data) => {
        console.log(user);
        httpAddRoom(data,user.token)
                .then((res) => {
                    console.log(data)
                    Swal.fire({
                        title: "נוסף בהצלחה !",
                        text: " ",
                        icon: "success",
                        confirmButtonText: "אישור"
                    });
                    navigate("/RoomList");
                })
                .catch((err) => {
                    console.log(data)
                    console.log(err);
                    if (err.response) {
                        Swal.fire({
                            title: "שגיאה בהוספה!",
                            text: err.response.status === 409 ? "  אחד הפרטים שהזנת לא מתאימים  ." : err.response.data.message,
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
        };
    return ( 
<Container maxWidth="xs">
            <Box mt={4} p={2} boxShadow={1} borderRadius={1} bgcolor="white">
                <Typography variant="subtitle1" align="center" gutterBottom>
                    הוסף חדר
                </Typography>
                <form noValidate  onSubmit={handleSubmit(save)}>
                    <TextField
                        fullWidth
                        label="מספר חדר"
                        variant="outlined"
                        type="number"
                        margin="dense"
                        size="small"
                        {...register("num", {
                            required: { value: true, message: "חובה להזין מספר חדר" },
                        })}
                        error={!!errors.num}
                        helperText={errors.num?.message}
                    />
                    <TextField
                        fullWidth
                        label="קטגוריית חדר"
                        type="text"
                        variant="outlined"
                        margin="dense"
                        size="small"
                        {...register("roomCategories", {
                            required: { value: true, message: "נא להזין קטגורית חדר" },
                        
                        })}
                        error={!!errors.roomCategories}
                        helperText={errors.roomCategories?.message}
                    />
                    <TextField
                        fullWidth
                        label="תאור"
                        variant="outlined"
                        margin="dense"
                        size="small"
                        {...register("description", {
                            required: { value: true, message: "נא להזין תאור חדר" },
                        })}
                        error={!!errors.description}
                        helperText={errors.description?.message}
                    />
                    <TextField
                        fullWidth
                        label="תמונה - נא לשים קישור"
                        variant="outlined"
                        margin="dense"
                        size="small"
                        {...register("imagePath", {
                            required: { value: true, message: "נא להכניס קישור לתמונה" },
                        })}
                        error={!!errors.imagePath}
                        helperText={errors.imagePath?.message}
                    />
                    <TextField
                        fullWidth
                        label="מחיר"
                        type="number"
                        variant="outlined"
                        margin="dense"
                        size="small"
                        {...register("price", {
                            required: { value: true, message: "חובה להזין מחיר" },
                        
                        })}
                        error={!!errors.price}
                        helperText={errors.price?.message}
                    />
                    <TextField
                        fullWidth
                        label="מספר מיטות"
                        type="number"
                        variant="outlined"
                        margin="dense"
                        size="small"
                        {...register("numBads", {
                            required: { value: true, message: "חובה להזין מספר מיטות" },
                        
                        })}
                        error={!!errors.numBads}
                        helperText={errors.numBads?.message}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        sx={{ mt: 1 }}
                        size="small"
                    >
                        הוסף
                    </Button>
                </form>
            </Box>
        </Container>
 );
}
export default EditRoom;
//-------------------------------------------------------------------------------------
//-----------עדכון מוצר---------------------------------------------------

