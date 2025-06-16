import { useEffect, useState } from "react";
import Invitation from "../components/Invitation";
import { Divider, Box, Typography, CircularProgress } from "@mui/material";
import { httpGetAllInvitations, httpDeleteInvitation } from "../api/InvitationService";
import Swal from "sweetalert2";

const InvitationList = () => {
  const [invitations, setInvitations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem("currentUserLS"));

  useEffect(() => {
    bringInvitationsFromServer();
  }, []);

  const bringInvitationsFromServer = () => {
    setIsLoading(true);
    httpGetAllInvitations(user.token)
      .then((res) => {
        console.log("Received invitations:", res);
        setInvitations(res);
      })
      .catch((err) => {
        console.error("Error fetching invitations:", err);
        alert("שגיאה בהבאת ההזמנות");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleDeleteInvitation = (invitationId) => {
    httpDeleteInvitation(invitationId)
      .then(res => {
        console.log(res.data);
        setInvitations((prev) => prev.filter((inv) => inv._id !== invitationId));
      })
      .catch(err => {
        console.log(err);
        Swal.fire("שגיאה", "תקלה במחיקת הזמנה", "error");
      });
  };

  return (
    <Box sx={{ padding: 3, fontSize: "1.2rem" }}>
      <Typography variant="h4" align="center" gutterBottom>
        רשימת ההזמנות
      </Typography>

      {isLoading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 5 }}>
          <CircularProgress />
        </Box>
      ) : (
        invitations.map((invitation, index) => (
          <Box
            key={invitation._id}
            sx={{
              display: "flex",
              justifyContent: "center",
              mb: 3,
            }}
          >
            <Box
              sx={{
                width: "100%",
                maxWidth: 700,
                padding: 3,
                border: "1px solid #ccc",
                borderRadius: 3,
                backgroundColor: "#f9f9f9",
                boxShadow: 3,
                fontSize: "1.2rem",
              }}
            >
              <Invitation
                invitation={invitation}
                onDeleteInvitation={handleDeleteInvitation}
              />
            </Box>
          </Box>
        ))
      )}
    </Box>
  );
};

export default InvitationList;
