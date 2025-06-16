import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../features/cartSlice";
import { httpGetAllRooms, httpDeleteRoom } from "../api/roomService";
import Room from "../components/Room";
import ReducedShoppingCart from "../components/ReducedShoppingCart";
import { Button, Grid, Typography, CircularProgress, Box } from '@mui/material';
import { Outlet } from "react-router-dom";
import Swal from "sweetalert2";

const RoomList = () => {
    const [arr, setArr] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [showReducedCart, setShowReducedCart] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const user = JSON.parse(localStorage.getItem("currentUserLS"));

    const dispatch = useDispatch();
    const limit = 6;

    useEffect(() => {
        bringRoomFromServer(currentPage);
    }, [currentPage]);

    const handleDeleteRoom = (roomId) => {
        httpDeleteRoom(roomId, user.token)
            .then(res => {
                console.log(res.data);
                setArr(prevArr => prevArr.filter(room => room._id !== roomId));
                Swal.fire("נמחק!", "החדר נמחק בהצלחה.", "success");
            })
            .catch(err => {
                console.log(err);
                Swal.fire("שגיאה", "תקלה במחיקת חדר", "error");
            });
    };

    const bringRoomFromServer = (page) => {
        setIsLoading(true);
        httpGetAllRooms(page, limit)
            .then(res => {
                console.log("Received rooms data:", res);
                setArr(res);
            })
            .catch(err => {
                console.log("Error fetching rooms:", err);
                alert("תקלה בהבאת חדרים במלון");
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    const handleAddToCart = (room) => {
        dispatch(addToCart(room));
        setShowReducedCart(true);
        setTimeout(() => {
            setShowReducedCart(false);
        }, 10000);
    };

    const nextPage = () => {
        if (arr && arr.length === limit) setCurrentPage((prev) => prev + 1);
    };

    const prevPage = () => {
        if (currentPage > 1) setCurrentPage((prev) => prev - 1);
    };

    return (
        <div>
            <h2 style={{ textAlign: 'center' }}> החדרים שלנו</h2>
            {showReducedCart && <ReducedShoppingCart />}
            <Outlet />

            <div style={{ textAlign: "center", marginBottom: "20px" }}>
                <Button 
                    onClick={prevPage}
                    disabled={currentPage === 1}
                    variant="contained"
                    color="primary"
                    sx={{
                        marginRight: '10px',
                        backgroundColor: currentPage === 1 ? '#dcdcdc' : '#b88a4b',
                        '&:hover': {
                            backgroundColor: currentPage === 1 ? '#dcdcdc' : '#b88a4a',
                        },
                        fontSize: '20px',
                        width: '40px',
                        height: '40px',
                        minWidth: '40px',
                    }}
                >
                    &lt;
                </Button>
                <span style={{ fontSize: '16px', margin: '0 10px' }}> עמוד {currentPage} </span>
                <Button 
                    onClick={nextPage}
                    disabled={arr.length < limit}
                    variant="contained"
                    color="primary"
                    sx={{
                        marginLeft: '10px',
                        backgroundColor: arr.length < limit ? '#dcdcdc' : '#b88a4b',
                        '&:hover': {
                            backgroundColor: arr.length < limit ? '#dcdcdc' : '#b88a4a',
                        },
                        fontSize: '20px',
                        width: '40px',
                        height: '40px',
                        minWidth: '40px',
                    }}
                >
                    &gt;
                </Button>
            </div>

            <Grid container spacing={2} justifyContent="center">
                {isLoading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 5 }}>
                        <CircularProgress />
                    </Box>
                ) : arr.length > 0 ? (
                    arr.map((room) => (
                        <Grid item xs={12} sm={6} md={4} key={room._id}>
                            <Room
                                room={room}
                                onAddToCart={handleAddToCart}
                                onDeleteRoom={handleDeleteRoom}
                            />
                        </Grid>
                    ))
                ) : (
                    <Typography variant="h6" color="text.secondary" sx={{ width: "100%", textAlign: "center" }}>
                        לא נמצאו חדרים להצגה
                    </Typography>
                )}
            </Grid>
        </div>
    );
};

export default RoomList;
