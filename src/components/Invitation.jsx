import React, { useState } from "react";
import {
  Button,
  Box,
  Typography,
  Divider,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import Swal from "sweetalert2";

const Invitation = ({ invitation, onDeleteInvitation }) => {
  const [isHovered, setIsHovered] = useState(false);

  const deleteInvitation = () => {
    Swal.fire({
      title: "?האם אתה בטוח",
      text: "!לא תוכל לשחזר את ההזמנה לאחר המחיקה",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "!כן, מחק",
      cancelButtonText: "ביטול",
    }).then((result) => {
      if (result.isConfirmed) {
        onDeleteInvitation(invitation._id);
      }
    });
  };

  return (
    <Box
      sx={{
        maxWidth: 700,
        m: 2,
        p: 2,
        border: "1px solid #ccc",
        borderRadius: 2,
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#f9f9f9",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Typography variant="h6" gutterBottom>
          {invitation._id} :קוד הזמנה 
      </Typography>

      <Typography variant="body1" gutterBottom>
         {invitation.EmailAddress} :כתובת מייל 
      </Typography>

      <Divider sx={{ width: "100%", my: 2 }} />

      <Typography variant="subtitle1" gutterBottom>
        :פרטי החדרים שהוזמנו
      </Typography>

      <Box sx={{ width: "100%", overflowX: "auto" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="right">מספר חדר</TableCell>
              <TableCell align="right">תמונה</TableCell>
              <TableCell align="right">מחיר</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {invitation.orderRooms.map((room) => (
              <TableRow key={room._id}>
                <TableCell align="right">{room.num}</TableCell>
                <TableCell align="right">
                  <img
                    src={room.imagePath}
                    alt={`Room ${room.num}`}
                    style={{ width: "100px", height: "auto", borderRadius: "8px" }}
                  />
                </TableCell>
                <TableCell align="right">₪{room.price}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>

      <Divider sx={{ width: "100%", my: 2 }} />

      <Button variant="contained" color="error" onClick={deleteInvitation}>
        מחק הזמנה
      </Button>
    </Box>
  );
};

export default Invitation;
