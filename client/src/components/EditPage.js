import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { modalStyle, inputStyle, stackStyle } from "../hooks/useStyles";
import { closeModalStyle } from "../hooks/useStyles";
import { useAuthContext } from "../hooks/useAuthContext";
import { useLogout } from "../hooks/useLogout";
import { useFlash } from "../hooks/useFlash";
import { updateStock } from "../utilis/StockFunctions";
import { useMutation } from "@tanstack/react-query";
import { TextField, Box, Snackbar, Alert } from "@mui/material";
import { Stack, Typography } from "@mui/material";
import { IconButton } from "@mui/material";
import { Close } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";

const EditPage = ({ toggleEditPage, stock, id }) => {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const { logout } = useLogout();
  const { showMessage, flashMessage } = useFlash();
  const [title, setTitle] = useState(stock.title);
  const [price, setPrice] = useState(stock.price);
  const [type, setType] = useState(stock.type);
  const [quantity, setQuantity] = useState(stock.quantity);
  const [message, setMessage] = useState(null);
  const [severity, setSeverity] = useState(true);

  const updateMutation = useMutation({
    mutationFn: updateStock,
    onSuccess: (data) => {
      setSeverity(true);
      setMessage(data.message);
      flashMessage(3200);
      setTimeout(() => navigate(0), 3200);
    },
    onError: (error) => {
      setSeverity(false);
      if (error.response?.data?.error) {
        setMessage(error.response.data.error);
        if (error.response.data.error.includes("Authentication" || "expired")) {
          flashMessage(3200);
          setTimeout(logout, 3200);
        } else if (error.response.data.error.includes("Stock")) {
          flashMessage(3200);
          setTimeout(() => navigate(0), 3200);
        }
      } else {
        setMessage(error.message);
        flashMessage(3200);
      }
    },
  });
  const { isLoading } = updateMutation;
  const handleUpdate = async (e) => {
    e.preventDefault();
    const stock = { title, price, type, quantity };
    const info = { stock, id, token: user.token };
    updateMutation.mutate(info);
  };

  return (
    <>
      <form onSubmit={handleUpdate} autoComplete="off">
        <Box sx={modalStyle}>
          <Stack sx={stackStyle}>
            <IconButton onClick={toggleEditPage} sx={closeModalStyle}>
              <Close color="primary" fontSize="large" />
            </IconButton>
            <Typography variant="h5" align="center">
              Edit Stock
            </Typography>
            <TextField
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              label="Name"
              type="text"
              sx={inputStyle}
            />
            <TextField
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              label="Price"
              type="number"
              sx={inputStyle}
            />
            <TextField
              value={type}
              onChange={(e) => setType(e.target.value)}
              label="Type"
              type="text"
              sx={inputStyle}
            />
            <TextField
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              label="Quantity"
              type="number"
              sx={inputStyle}
            />

            <LoadingButton
              type="submit"
              variant="contained"
              loading={isLoading}
            >
              Update
            </LoadingButton>
          </Stack>
        </Box>
      </form>

      <Snackbar
        open={showMessage}
        autoHideDuration={3000}
        anchorOrigin={{ horizontal: "center", vertical: "top" }}
      >
        <Alert severity={severity ? "success" : "error"}>{message}</Alert>
      </Snackbar>
    </>
  );
};

export default EditPage;
