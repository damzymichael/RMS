import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { modalStyle } from "../hooks/useStyles";
import { useFlash } from "../hooks/useFlash";
import { useLogout } from "../hooks/useLogout";
import { Typography, Box, Button, Snackbar, Alert } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { deleteStock } from "../utilis/StockFunctions";
import LoadingButton from "@mui/lab/LoadingButton";

export const DeletePrompt = ({ toggleDeletePrompt, id, user }) => {
  const navigate = useNavigate();
  const { logout } = useLogout();
  const { showMessage, flashMessage } = useFlash();
  const [message, setMessage] = useState(null);
  const [severity, setSeverity] = useState(true);

  const deleteMutation = useMutation({
    mutationFn: deleteStock,
    onSuccess: (data) => {
      setSeverity(true);
      setMessage(data.message);
      flashMessage(3200);
      setTimeout(() => {
        navigate("/stocks", { state: { id: "refetch" } }, { replace: true });
      }, 2700);
    },
    onError: (error) => {
      setSeverity(false);
      if (error.response?.data?.error) {
        setMessage(error.response.data.error);
        if (error.response.data.error.includes("Authentication" || "expired")) {
          flashMessage(3200);
          setTimeout(logout, 3200);
        }
        if (error.response.data.error.includes("Stock")) {
          flashMessage(3200);
          setTimeout(() => navigate("/stocks", { replace: true }), 3200);
        }
      } else {
        setMessage(error.message);
        flashMessage(3200);
      }
    },
  });

  const handleDelete = async (e) => {
    e.preventDefault();
    const info = { id, token: user.token };
    deleteMutation.mutate(info);
  };

  const { isLoading } = deleteMutation;
  return (
    <Box sx={modalStyle} padding={3}>
      <Typography variant="h5" align="center">
        Are you sure you want to delete
      </Typography>
      <Box
        justifyContent="center"
        display="flex"
        gap="10px"
        sx={{ marginTop: "20px" }}
      >
        <Button onClick={toggleDeletePrompt} variant="outlined">
          No
        </Button>
        <LoadingButton
          onClick={handleDelete}
          variant="contained"
          color="error"
          loading={isLoading}
        >
          Yes
        </LoadingButton>
      </Box>

      <Snackbar
        open={showMessage}
        autoHideDuration={3000}
        anchorOrigin={{ horizontal: "center", vertical: "top" }}
      >
        <Alert severity={severity ? "success" : "error"}>{message}</Alert>
      </Snackbar>
    </Box>
  );
};
