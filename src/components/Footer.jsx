import { Box, Typography, IconButton, TextField, Button } from "@mui/material";
import { LocationOn, Phone, Email, Verified, Pool } from "@mui/icons-material";

const Footer = () => {
    return (
        <Box
            sx={{
                backgroundColor: "#f5f5f5",
                padding: "40px 20px",
                mt: 4,
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                justifyContent: "space-between",
                alignItems: "center",
                borderTop: "3px solid #8B4513", // חום זהוב
                borderBottom: "3px solid #8B4513",
            }}
        >
           
 <Box
                sx={{
                    flex: 1,
                    textAlign: "center",
                    padding: "20px",
                }}
            >
                <iframe
                    title="map"
                    width="100%"
                    height="440"
                    style={{
                        borderRadius: "10px",
                        border: "4px solid #3f67a4", // מסגרת כחולה
                    }}
                    src="https://maps.google.com/maps?q=Zurab%20Gorgiladze%20St%2078,%20Batumi&t=&z=15&ie=UTF8&iwloc=&output=embed"
                ></iframe>
            </Box>
            <Box
                sx={{
                    flex: 1,
                    textAlign: "center",
                    padding: "20px",
                    backgroundColor: "#3f67a4",
                    borderRadius: "10px",
                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                    color: "#fff",
                    mx: 2, // מרווח בין האלמנטים
                }}
            >
                <Typography variant="h6" sx={{ fontWeight: "600", mb: 2 }}>
                    יצירת קשר
                </Typography>

                <TextField
                    fullWidth
                    label="שם"
                    variant="outlined"
                    sx={{ mb: 2, backgroundColor: "#fff", borderRadius: "5px" }}
                />

                <TextField
                    fullWidth
                    label="אימייל"
                    variant="outlined"
                    sx={{ mb: 2, backgroundColor: "#fff", borderRadius: "5px" }}
                />

                <TextField
                    fullWidth
                    label="טלפון"
                    variant="outlined"
                    sx={{ mb: 2, backgroundColor: "#fff", borderRadius: "5px" }}
                />

                <TextField
                    fullWidth
                    label="תוכן ההודעה"
                    multiline
                    rows={3}
                    variant="outlined"
                    sx={{ mb: 2, backgroundColor: "#fff", borderRadius: "5px" }}
                />

                <Button
                    variant="contained"
                    sx={{
                        backgroundColor: "#8B4513", 
                        color: "#fff",
                        "&:hover": { backgroundColor: "#6b3410" },
                    }}
                >
                    שלח הודעה
                </Button>
            </Box>
           
            <Box
                sx={{
                    flex: 1,
                    textAlign: "right",
                    padding: "20px",
                    direction: "rtl",
                }}
            >
                   <img
                        src="https://kingsolomon.com.ge/wp-content/uploads/2022/06/LOGO-B.png"
                        alt="לוגו"
                        style={{ height: '120px', width: 'auto' }}
                    />
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                <Typography variant="h5" sx={{ color: "#8B4513", fontWeight: "700", mb: 2 }}>
                    פרטי המלון
                </Typography>

                <Typography variant="body1" sx={{ fontSize: "1.2rem", display: "flex", alignItems: "center", mb: 1 }}>
                    <LocationOn sx={{ color: "#8B4513", ml: 1 }} />
                    כתובת: רחוב זוראב גורגילדזה 78, באטומי, גאורגיה
                </Typography>

                <Typography variant="body1" sx={{ fontSize: "1.2rem", display: "flex", alignItems: "center", mb: 1 }}>
                    <Phone sx={{ color: "#8B4513", ml: 1 }} />
                    טלפון: 02-61111555
                </Typography>

                <Typography variant="body1" sx={{ fontSize: "1.2rem", display: "flex", alignItems: "center", mb: 1 }}>
                    <Email sx={{ color: "#8B4513", ml: 1 }} />
                    מייל: info@luxeheights.com
                </Typography>

                <Typography variant="body1" sx={{ fontSize: "1.2rem", display: "flex", alignItems: "center", mb: 1 }}>
                    <Verified sx={{ color: "#8B4513", ml: 1 }} />
                    בהשגחת הכשר | כשר למהדרין לפסח ולכל השנה
                </Typography>

                <Typography variant="body1" sx={{ fontSize: "1.2rem", display: "flex", alignItems: "center" }}>
                    <Pool sx={{ color: "#8B4513", ml: 1 }} />
                    הבריכה והספא סגורים בשבתות ומועדים
                </Typography>
            </Box>
            
            
        </Box>
    );
};

export default Footer;
