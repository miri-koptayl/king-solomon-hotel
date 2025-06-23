import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { EmptyingTheBasket } from "../features/cartSlice";
import {
    TextField, Button, Typography, Box, Grid
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { httpAddInvitation } from "../api/InvitationService";
import emailjs from "emailjs-com";

const OrderCompletion = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.currentUser);
    const Rooms = useSelector((state) => state.cart.arrRooms);
    const finalPrice = useSelector((state) => state.cart.SumRooms);
    const [IsOrder, setIsOrder] = useState(false);

    const name = user?.username || "";
    const email = user?.email || "";
    console.log(user.email)
    useEffect(() => {
        if (!user) navigate("/Login");
    }, [user, navigate]);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    useEffect(() => {
        reset({
            userName: name,
            number: "",
            ThreeDigits: "",
            validity: "",
            startDate: "",
            endDate: "",
        });
    }, [name, reset]);

    const createInvitation = (data) => {
        const invitationData = {
            userId: user?._id,
            orderRooms: Rooms,
            userName: name,
            EmailAddress: email,
            startDate: data.startDate,
            endDate: data.endDate,
            pay: {
                number: data.number,
                ThreeDigits: data.ThreeDigits,
                validity: data.validity,
            },
        };

        const roomListHtml = invitationData.orderRooms
            .map((room) => {
                const roomName = room.roomCategories?.[0] || "חדר";
                return `
          <tr>
            <td style="padding: 10px; border: 1px solid #ccc; text-align: center;">
              <img src="${room.imagePath}" alt="${roomName}" style="width: 100px; height: auto; border-radius: 8px;" />
            </td>
            <td style="padding: 10px; border: 1px solid #ccc; text-align: center;">${roomName}</td>
            <td style="padding: 10px; border: 1px solid #ccc; text-align: center;">${room.price} ₪</td>
            <td style="padding: 10px; border: 1px solid #ccc; text-align: center;">${room.qty}</td>
          </tr>
        `;
            })
            .join("");

        emailjs
            .send(
                "service_haj0n8z",
                "template_mguhhnj",
                {
                    name: invitationData.userName,
                    email: invitationData.EmailAddress,
                    finalPrice: finalPrice,
                    roomListHtml: roomListHtml,
                },
                "A2OaW7uwax719G291"
            )
            .then(() => {
                console.log("Email sent successfully!");
            })
            .catch((error) => {
                console.error("Email send failed:", error);
            });

        httpAddInvitation(invitationData)
            .then(() => {
                dispatch(EmptyingTheBasket());
                setIsOrder(true);
            })
            .catch((err) => {
                console.log(err);
                alert(`שגיאה בשמירת ההזמנה\n${err.message}`);
            });
    };

    return (
        <>
            {!IsOrder ? (
                <Box
                    sx={{
                        minHeight: "100vh",
                        direction: "rtl",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        p: 4,
                    }}
                >
                    <Grid container spacing={4} alignItems="center" justifyContent="center">
                        <Grid item xs={12} md={5}>
                            <Box textAlign="center" p={2}>
                                <Typography
                                    variant="h3"
                                    fontWeight="bold"
                                    sx={{
                                        color: "#4b2e14",
                                        fontFamily: "'Segoe UI', 'Heebo', sans-serif",
                                        lineHeight: 1.6,
                                        fontSize: "3rem",
                                    }}
                                >
                                    מלאו את פרטיכם
                                    <br />
                                    ואתם בדרך לחופשה
                                    <br />
                                    ברמה שעוד לא הכרתם!
                                </Typography>
                            </Box>
                        </Grid>

                        <Grid item xs={12} md={5}>
                            <Box sx={{ padding: 3 }}>
                                <Typography variant="h5" align="center" gutterBottom fontWeight="bold">
                                    סיום הזמנה
                                </Typography>

                                <form onSubmit={handleSubmit(createInvitation)}>
                                    <TextField
                                        fullWidth
                                        margin="normal"
                                        label="שם משתמש"
                                        value={name}
                                        disabled
                                    />

                                    <TextField
                                        fullWidth
                                        margin="normal"
                                        label="מייל - לכאן תשלח קבלה"
                                        value={email}
                                        disabled
                                    />


                                    <Typography variant="h6" gutterBottom fontWeight="bold" mt={4}>
                                        בחירת תאריכים
                                    </Typography>

                                    <Grid container spacing={2}>
                                        <Grid item xs={6}>
                                            <TextField
                                                fullWidth
                                                label="מתאריך"
                                                type="date"
                                                InputLabelProps={{ shrink: true }}
                                                {...register("startDate", { required: "נא לבחור תאריך התחלה" })}
                                                error={!!errors.startDate}
                                                helperText={errors.startDate?.message}
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <TextField
                                                fullWidth
                                                label="עד תאריך"
                                                type="date"
                                                InputLabelProps={{ shrink: true }}
                                                {...register("endDate", { required: "נא לבחור תאריך סיום" })}
                                                error={!!errors.endDate}
                                                helperText={errors.endDate?.message}
                                            />
                                        </Grid>
                                    </Grid>

                                    <Box mt={4} mb={1}>
                                        <Typography variant="h6" gutterBottom fontWeight="bold">
                                            תשלום בכרטיס אשראי
                                        </Typography>
                                        <Grid container spacing={2} alignItems="center">
                                            <Grid item>
                                                <img
                                                    src="https://www.freepnglogos.com/uploads/visa-logo-png-image-4.png"
                                                    alt="Visa"
                                                    width={50}
                                                />
                                            </Grid>
                                            <Grid item>
                                                <img
                                                    src="https://pngimg.com/d/mastercard_PNG16.png"
                                                    alt="MasterCard"
                                                    width={50}
                                                />
                                            </Grid>
                                            <Grid item>
                                                <img
                                                    src="https://www.svgrepo.com/show/328113/amex.svg"
                                                    alt="Amex"
                                                    width={50}
                                                />
                                            </Grid>
                                        </Grid>
                                    </Box>

                                    <TextField
                                        fullWidth
                                        margin="normal"
                                        label="מספר כרטיס אשראי"
                                        type="number"
                                        {...register("number", {
                                            required: "נא להכניס מספר כרטיס",
                                            minLength: { value: 16, message: "מספר כרטיס צריך להכיל 16 ספרות" },
                                            maxLength: { value: 16, message: "מספר כרטיס צריך להכיל 16 ספרות" },
                                        })}
                                        error={!!errors.number}
                                        helperText={errors.number?.message}
                                    />

                                    <Grid container spacing={2}>
                                        <Grid item xs={6}>
                                            <TextField
                                                fullWidth
                                                label="3 ספרות בגב הכרטיס"
                                                type="number"
                                                {...register("ThreeDigits", {
                                                    required: "נא להזין שלוש ספרות",
                                                    minLength: { value: 3, message: "חייב להכיל 3 ספרות" },
                                                    maxLength: { value: 3, message: "חייב להכיל 3 ספרות" },
                                                })}
                                                error={!!errors.ThreeDigits}
                                                helperText={errors.ThreeDigits?.message}
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <TextField
                                                fullWidth
                                                label="תוקף כרטיס"
                                                type="month"
                                                {...register("validity", { required: "נא להזין תוקף" })}
                                                error={!!errors.validity}
                                                helperText={errors.validity?.message}
                                            />
                                        </Grid>
                                    </Grid>

                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="outlined"
                                        sx={{
                                            mt: 3,
                                            color: "#4b2e14",
                                            borderColor: "#4b2e14",
                                            fontWeight: "bold",
                                            "&:hover": {
                                                backgroundColor: "#4b2e14",
                                                color: "#fff",
                                            },
                                        }}
                                    >
                                        שלח הזמנה
                                    </Button>
                                </form>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            ) : (
                <h1>
                    ❤️ ההזמנה בוצעה בהצלחה
                    <br />
                    <br />
                    קבלה נשלחה למייל
                </h1>
            )}
        </>
    );
};

export default OrderCompletion;
