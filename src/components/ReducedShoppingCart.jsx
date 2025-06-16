import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, Typography, IconButton, Divider } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { deleteFromCart } from "../features/cartSlice";

const ReducedShoppingCart = () => {
  const dispatch = useDispatch();
  const roomsInCart = useSelector((state) => state.cart.arrRooms);
  const SumInCart = useSelector((state) => state.cart.SumRooms);
  const CountInCart = useSelector((state) => state.cart.CountRoom);
  const [isOpen, setIsOpen] = useState(false);

  const closeCart = () => setIsOpen(false);
  const openCart = () => setIsOpen(true);

  return (
    <>
      {/* כפתור לפתיחת הסל */}
      {!isOpen&&
      <Button
        onClick={openCart}
        sx={{
          position: "fixed",
          top: 110,
          right: 20,
          zIndex: 1301,
          backgroundColor: "#b88a4b",
          color: "white",
          "&:hover": { backgroundColor: "#a3763e" },
        }}
      >
        פתח סל 
      </Button>
      }
      {/* סל קניות מוקטן */}
      <Box
        sx={{
          position: "fixed",
          top: "110px", // מתחת ל־Navbar
          right: isOpen ? 0 : "-25%",
          width: "25%",
          height: "calc(100vh - 96px)",
          backgroundColor: "rgba(241, 240, 236, 0.87)",
          padding: "15px",
          borderLeft: "5px solid #8a6f48",
          boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.2)",
          zIndex: 1300,
          color: "#5c4d32",
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          transition: "right 0.5s ease-in-out",
          overflowY: "auto",

        }}
      >
        {/* כפתור סגירה */}
        {isOpen&&
<IconButton
  onClick={closeCart}
  sx={{
    alignSelf: "flex-start", 
    color: "#ff4d4d",
    fontSize: "1.5rem",
  }}
>
  <CloseIcon />
</IconButton>
}

        <Typography variant="h6" fontWeight="bold" mb={2}>
          פרטים מינימליים על ההזמנה שלכם 
        </Typography>

        <Typography variant="h7" mb={1}>מוצרים בעגלה: {CountInCart}</Typography>
        <Typography variant="h7" mb={2}>סכום לתשלום: {SumInCart} ₪</Typography>

        <Divider sx={{ width: "100%", mb: 2, borderColor: "#8a6f48" }} />

        {roomsInCart.map((item) => (
          <Box
            key={item._id}
            sx={{
              backgroundColor: "",
              borderRadius: "10px",
              boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
              width: "100%",
              padding: 2,
              mb: 2,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box>
              <Typography variant="body1" fontWeight="bold">
                חדר מספר: {item.num}
              </Typography>
              <Typography variant="body2" color="primary">
                {item.price} ₪
              </Typography>
            </Box>

            <IconButton
              onClick={() => dispatch(deleteFromCart(item._id))}
              sx={{ color: "#ff4d4d" }}
            >
            </IconButton>
          </Box>
        ))}
      </Box>
    </>
  );
};

export default ReducedShoppingCart;
