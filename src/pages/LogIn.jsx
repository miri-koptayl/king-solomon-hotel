import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { httpLogin, httpAddUser } from "../api/userService";
import { userIn, setCurrentUser } from "../features/userSlice";
import { TextField, Button, Typography, Box, IconButton, Container } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Swal from "sweetalert2";

const Login = () => {
    let disp = useDispatch();
    let navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(true);
    const cartRooms = useSelector((state) => state.cart?.arrRooms);

    const log = (data) => {
        console.log(data)
        httpLogin(data.username, data.password)
            .then((res) => {
                disp(userIn(res.data));
                disp(setCurrentUser(res.data));
                console.log((res.data))
                localStorage.setItem("currentUserLS", JSON.stringify(res.data));
                navigate( "/HomePage");
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "התחברת בהצלחה",
                    showConfirmButton: false,
                    timer: 1800
                  });
                setIsLogin(true);
            })
            .catch((err) => {
                Swal.fire({
                    title: "שגיאה בהתחברות!",
                    text: err.response?.data?.message || "שם משתמש או סיסמה שגויים",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonText: "הירשם",
                    cancelButtonText: "ביטול"
                }).then((result) => {
                    if (result.isConfirmed) setIsLogin(false);
                });
            });
    };

    const save = (data) => {
        httpAddUser(data)
            .then((res) => {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "התחברת בהצלחה",
                    showConfirmButton: false,
                    timer: 1800
                  });
                navigate("/RoomList");
                console.log(data)
                disp(userIn(res.data));
            })
            .catch((err) => {
                Swal.fire({
                    title: "שגיאה בהרשמה!",
                    text: err.response?.status === 409 ? "שם המשתמש או האימייל כבר קיימים במערכת." : err.response?.data?.message,
                    icon: "error",
                    confirmButtonText: "אישור"
                });
            });
    };

    let { register, handleSubmit, formState: { errors } } = useForm();

    return (
        <Container maxWidth="lg" disableGutters>
            <Box display="flex" height="100vh" alignItems="center">
                <Box 
                    sx={{ 
                        width: "35%", 
                        height: "80vh",
                        p: 5, 
                        display: "flex", 
                        flexDirection: "column", 
                        justifyContent: "center",
                        position: "relative",
                        borderRadius: "10px"
                    }}
                >
                    <IconButton 
                        sx={{ 
                            position: "absolute", 
                            top: 10, 
                            left: 10, 
                            color: "#5D4037" 
                        }} 
                        onClick={() => navigate("/")}
                    >
                        <CloseIcon />
                    </IconButton>

                    <Typography variant="h5" align="center" gutterBottom>
                        {isLogin ? "התחברות" : "הרשמה"}
                    </Typography>

                    <form noValidate onSubmit={handleSubmit(isLogin ? log : save)}>
                        <TextField
                            fullWidth
                            label="שם משתמש"
                            variant="outlined"
                            margin="normal"
                            {...register("username", { required: "חובה להזין שם משתמש" })}
                            error={!!errors.username}
                            helperText={errors.username?.message}
                        />
                        <TextField
                            fullWidth
                            label="סיסמה"
                            type="password"
                            variant="outlined"
                            margin="normal"
                            {...register("password", { 
                                required: "חובה להזין סיסמה", 
                                pattern: { value: /[a-zA-Z0-9]{5,}/, message: "סיסמה חייבת להכיל לפחות 5 תווים" } 
                            })}
                            error={!!errors.password}
                            helperText={errors.password?.message}
                        />
                        
                        {!isLogin && (
                            <>
                                <TextField
                                    fullWidth
                                    label="טלפון"
                                    variant="outlined"
                                    margin="normal"
                                    {...register("phone", { required: "חובה להזין מספר טלפון" })}
                                    error={!!errors.phone}
                                    helperText={errors.phone?.message}
                                />
                                <TextField
                                    fullWidth
                                    label="אימייל"
                                    type="email"
                                    variant="outlined"
                                    margin="normal"
                                    {...register("email", { 
                                        required: "חובה להזין אימייל", 
                                        pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "אימייל לא תקין" } 
                                    })}
                                    error={!!errors.email}
                                    helperText={errors.email?.message}
                                />
                            </>
                        )}

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 2, backgroundColor: "#8B4513", "&:hover": { backgroundColor: "#5D4037" } }}
                        >
                            {isLogin ? "התחבר" : "הרשמה"}
                        </Button>

                        <Button 
                            fullWidth 
                            variant="text" 
                            sx={{ mt: 1, color: "#5D4037" }} 
                            onClick={() => setIsLogin(!isLogin)}
                        >
                            {isLogin ? "אין לך חשבון? הירשם כאן" : "כבר יש לך חשבון? התחבר"}
                        </Button>
                    </form>
                </Box>

                {/* קו כחול - קצר יותר */}
                <Box sx={{ width: "5px", height: "90vh", backgroundColor: "#0077b6", mx: 2 }} />

                {/* לוגו - בצד שמאל ובגודל גדול */}
                <Box 
                    sx={{ 
                        width: "60%", 
                        display: "flex", 
                        alignItems: "center", 
                        justifyContent: "center" 
                    }}
                >
                    <img 
                        src="https://kingsolomon.com.ge/wp-content/uploads/2022/06/LOGO-B.png" 
                        alt="לוגו" 
                        style={{ width: "80%", height: "auto", maxHeight: "80vh" }}
                    />
                </Box>
            </Box>
        </Container>
    );
}

export default Login;
