 import { useDispatch, useSelector } from "react-redux";
import RoomInvitation from "../components/RoomInvitation";
import { Grid, Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const CartList = () => {
    const navigate = useNavigate();
    const roomsInCart = useSelector((state) => state.cart.arrRooms);
    const SumInCart = useSelector((state) => state.cart.SumRooms);

    return (
        <div style={{ paddingTop: "20px" }}>
            <h2 style={{ textAlign: 'center' }}>חדרים שהזמנתם</h2>

            <Typography variant="h6" sx={{ textAlign: "center", marginBottom: 2 }}>
                סכום לתשלום: {SumInCart} ₪ | מוצרים בעגלה: {roomsInCart.length}
            </Typography>

            {roomsInCart.length > 0 && (
                <Box
                    sx={{
                        position: "sticky",
                        top: "120px", 
                        zIndex: 999,
                        display: "flex",
                        justifyContent: "flex-start",
                        px: 2,
                        mb: 2
                    }}
                >
                    <Button
                        variant="contained"
                        color="primary"
                        sx={{
                            px: 3,
                            py: 1,
                            fontSize: "16px",
                            fontWeight: "bold",
                            borderRadius: "25px"
                        }}
                        onClick={() => navigate("/OrderCompletion")}
                    >
                       🛍️ סיום הזמנה
                    </Button>
                </Box>
            )}

            {/* כרטיסי החדרים */}
            <Grid container spacing={2} justifyContent="center">
                {roomsInCart.length > 0 ? (
                    roomsInCart.map((room) => (
                        <Grid item xs={12} sm={6} md={4} key={room._id}>
                            <RoomInvitation room={room} />
                        </Grid>
                    ))
                ) : (
                    <Typography
                        variant="h6"
                        color="text.secondary"
                        sx={{ width: "100%", textAlign: "center" }}
                    >
                        🙁 אין חדרים בהזמנה
                    </Typography>
                )}
            </Grid>
        </div>
    );
};

export default CartList;
