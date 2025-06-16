import { useState, useEffect } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import { FoodBank, Pool, KingBed } from "@mui/icons-material"; // אייקונים עבור אוכל, ספא, חדר
import AboutTheHotel from "../components/AboutTheHotel"
const images = [
    "https://cf.bstatic.com/xdata/images/hotel/max1024x768/237955454.jpg?k=22ae2a82bc68fbe5c998f83fd2ac96733a653ba8d179eaa00e1b4e284525fcbf&o=&hp=1",
    "https://www.carlton.co.il/wp-content/uploads/2023/08/Carlton-TLV_pool-sea-view-Aya-Ben-Ezri-1-scaled.jpg",
    "https://meshiv.co.il/wp-content/uploads/2021/10/%D7%90%D7%A8%D7%95%D7%97%D7%94-%D7%91%D7%91%D7%99%D7%AA-%D7%9E%D7%9C%D7%95%D7%9F.jpg",
    "https://thesetaihotels.com/wp-content/uploads/2023/05/Presidential-Suite014.jpg",
    "https://media-cdn.tripadvisor.com/media/photo-s/1c/e7/62/d3/the-grand-gloria-hotel.jpg",
    "https://medi.co.il/wp-content/uploads/2023/07/10.jpg",
];

const HomePage = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Effect לקרוסלה
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 5000); // תצוגת כל תמונה במשך 5 שניות

        return () => clearInterval(interval);
    }, []);

    // States לניהול גודל התמונה
    const [hoveredImage, setHoveredImage] = useState(null);

    return (
        <Box sx={{ textAlign: "center", mt: 4 }}>
            {/* קרוסלה עם כותרת */}
            <Box
                sx={{
                    width: "100%",
                    height: "500px",
                    margin: "auto",
                    position: "relative",
                    overflow: "hidden",
                    borderRadius: "15px",
                    boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.3)",
                }}
            >
                {images.map((image, index) => (
                    <img
                        key={index}
                        src={image}
                        alt={`מלון ${index + 1}`}
                        style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            position: "absolute",
                            top: 0,
                            left: 0,
                            opacity: currentIndex === index ? 1 : 0, 
                            transition: "opacity 1s ease-in-out", 
                        }}
                    />
                ))}

                <Typography
                    variant="h3"
                    sx={{
                        position: "absolute",
                        top: "40%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        color: "#fff",
                        fontWeight: "bold",
                        textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
                        fontSize: { xs: "2rem", md: "3rem" },
                        zIndex: 1,
                    }}
                >
                    <img
                        src="https://kingsolomon.com.ge/wp-content/uploads/2022/06/LOGO-B.png"
                        alt="לוגו"
                        style={{ height: '200px', width: 'auto' }}
                    />                     </Typography>
            </Box>

           
            <AboutTheHotel />
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mt: 4,
                    gap: 2,
                    marginBottom: "30px",
                    width: "100%",
                }}
            >
                <Box
                    sx={{
                        position: "relative",
                        width: "32%",
                        transition: "transform 0.3s ease-in-out",
                        transform: hoveredImage === "food" ? "scale(1.1)" : "scale(1)",
                    }}
                    onMouseEnter={() => setHoveredImage("food")}
                    onMouseLeave={() => setHoveredImage(null)}
                >
                    <img
                        src="https://cdn.speedsize.com/61a206a8-07c4-46c9-b2ac-07edd20dd59d/https://media.isrotel.co.il/umb/22181/%D7%9C%D7%95%D7%98%D7%95%D7%A1-%D7%AA%D7%9E%D7%95%D7%A0%D7%94-%D7%A8%D7%90%D7%A9%D7%99%D7%AA.jpg?anchor=center&mode=crop&width=400&height=297&rnd=132432806370000000/f_auto"
                        alt="אוכל"
                        style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                        }}
                    />
                    <Typography
                        variant="h6"
                        sx={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            color: "#fff",
                            fontWeight: "bold",
                            textShadow: "2px 2px 4px rgba(0,0,0,0.7)",
                        }}
                    >
                        חוויה קולינרית
                    </Typography>
                    <IconButton
                        sx={{
                            position: "absolute",
                            top: "10px",
                            left: "10px",
                            backgroundColor: "rgba(0,0,0,0.5)",
                            color: "white",
                        }}
                    >
                        <FoodBank />
                    </IconButton>
                </Box>

                <Box
                    sx={{
                        position: "relative",
                        width: "32%",
                        transition: "transform 0.13s ease-in-out",
                        transform: hoveredImage === "spa" ? "scale(1.1)" : "scale(1)",
                    }}
                    onMouseEnter={() => setHoveredImage("spa")}
                    onMouseLeave={() => setHoveredImage(null)}
                >
                    <img
                        src="https://images.hapisga.co.il/ssd/sites/11800/604/3167d0a3419dcbf.jpg"
                        alt="ספא ובריכה"
                        style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                        }}
                    />
                    <Typography
                        variant="h6"
                        sx={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            color: "#fff",
                            fontWeight: "bold",
                            textShadow: "2px 2px 4px rgba(0,0,0,0.7)",
                        }}
                    >
                        ספא ובריכה
                    </Typography>
                    <IconButton
                        sx={{
                            position: "absolute",
                            top: "10px",
                            left: "10px",
                            backgroundColor: "rgba(0,0,0,0.5)",
                            color: "white",
                        }}
                    >
                        <Pool />
                    </IconButton>
                </Box>

                <Box
                    sx={{
                        position: "relative",
                        width: "32%",
                        transition: "transform 0.3s ease-in-out",
                        transform: hoveredImage === "room" ? "scale(1.1)" : "scale(1)",
                    }}
                    onMouseEnter={() => setHoveredImage("room")}
                    onMouseLeave={() => setHoveredImage(null)}
                >
                    <img
                        src="https://medi.co.il/wp-content/uploads/2023/07/10.jpg"
                        alt="חדר נופש"
                        style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                        }}
                    />
                    <Typography
                        variant="h6"
                        sx={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            color: "#fff",
                            fontWeight: "bold",
                            textShadow: "2px 2px 4px rgba(0,0,0,0.7)",
                        }}
                    >
                        נופש מלכותי ברמה גבוהה
                    </Typography>
                    <IconButton
                        sx={{
                            position: "absolute",
                            top: "10px",
                            left: "10px",
                            backgroundColor: "rgba(0,0,0,0.5)",
                            color: "white",
                        }}
                    >
                        <KingBed />
                    </IconButton>
                </Box>
            </Box>


        </Box>
    );
};

export default HomePage;
