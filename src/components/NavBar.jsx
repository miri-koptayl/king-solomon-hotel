import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Badge, IconButton, Avatar, AppBar, Toolbar, Button, Box } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { EmptyingTheBasket } from "../features/cartSlice";
import { useSelector, useDispatch } from "react-redux";

const NavBar = () => {
    const reduxUser = useSelector((state) => state.user?.currentUser);
    const countInCart = useSelector((state) => state.cart.countRooms); 
    const [user, setUser] = useState(localStorage.getItem("currentUserLS") ? JSON.parse(localStorage.getItem("currentUserLS")) : null);
    let dispatch = useDispatch();

    useEffect(() => {
        setUser(reduxUser);
    }, [reduxUser]);

    const handleLogout = () => {
        localStorage.removeItem("currentUserLS");
        localStorage.removeItem("countRooms");
        dispatch(EmptyingTheBasket());
        setUser(null);
    };

    return (
        <AppBar position="sticky" sx={{ bgcolor: "#3f74a1", padding: 2, zIndex: 1300 }}>
            <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Box>
                    <IconButton color="inherit" component={Link} to="CartList">
                        <Badge badgeContent={countInCart} color="blue">
                            <ShoppingCartIcon />
                        </Badge>
                    </IconButton>
                </Box>

                {/* כפתורי ניווט*/}
                <Box sx={{ display: "flex", gap: 2 }}>
                    <Box sx={{
                        borderBottom: "2px solid white",
                        "&:hover": {
                            borderBottom: "3px solid white",
                            transition: "border-bottom 0.3s ease"
                        }
                    }
                    }>
                        <Button color="inherit" component={Link} to="ContactUs">צור קשר </Button>
                    </Box>
                    <Box sx={{
                        borderBottom: "2px solid white",
                        "&:hover": {
                            borderBottom: "3px solid white",
                            transition: "border-bottom 0.3s ease"
                        }
                    }
                    }>
                        <Button color="inherit" component={Link} to="RoomList">החדרים שלנו</Button>
                    </Box>
                    <Box sx={{
                        borderBottom: "2px solid white",
                        "&:hover": {
                            borderBottom: "3px solid white",
                            transition: "border-bottom 0.3s ease"
                        }
                    }
                    }>
                        <Button color="inherit" component={Link} to="AboutTheHotel"> אודות המלון</Button>
                    </Box>
                    <Box sx={{
                        borderBottom: "2px solid white",
                        "&:hover": {
                            borderBottom: "3px solid white",
                            transition: "border-bottom 0.3s ease"
                        }
                    }
                    }>
                        <Button color="inherit" component={Link} to="HomePage">דף הבית</Button>
                    </Box>


                    {user && user.role === "ADMIN" && (
                        <>
                            <Box
                                sx={{
                                    borderBottom: "2px solid white",
                                    "&:hover": {
                                        borderBottom: "3px solid white",
                                        transition: "border-bottom 0.3s ease",
                                    },
                                }}
                            >
                                <Button color="inherit" component={Link} to="EditRoom">
                                    הוסף חדר
                                </Button>
                            </Box>

                            <Box
                                sx={{
                                    borderBottom: "2px solid white",
                                    "&:hover": {
                                        borderBottom: "3px solid white",
                                        transition: "border-bottom 0.3s ease",
                                    },
                                }}
                            >
                                <Button color="inherit" component={Link} to="InvitationList">
                                    הצג הזמנות
                                </Button>
                            </Box>
                        </>
                    )}

                </Box>

                <Box sx={{ display: "flex", alignItems: "center", color: "#b88a4b", gap: 2 }}>

                    {user ? (
                        <Avatar sx={{ bgcolor: "#b88a4b" }}>
                            {user.username.charAt(0).toUpperCase()}
                        </Avatar>
                    ) : (
                        <IconButton color="inherit" component={Link} to="logIn">

                            <AccountCircleIcon fontSize="large" />
                        </IconButton>

                    )}

                    {user && (
                        <IconButton color="inherit" onClick={handleLogout}>
                            <ExitToAppIcon />
                        </IconButton>
                    )}

                    <img
                        src="https://kingsolomon.com.ge/wp-content/uploads/2022/06/LOGO-B.png"
                        alt="לוגו"
                        style={{ height: '70px', width: 'auto' }}
                    />

                </Box>

            </Toolbar>
        </AppBar>
    );
};

export default NavBar;
