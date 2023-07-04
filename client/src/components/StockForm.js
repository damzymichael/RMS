import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useLogout } from "../hooks/useLogout";
import { useFlash } from "../hooks/useFlash";
import { modalStyle, inputStyle, stackStyle } from "../hooks/useStyles";
import { closeModalStyle } from "../hooks/useStyles";
import { createStock } from "../utilis/StockFunctions";
import { useMutation } from "@tanstack/react-query";
import { TextField, Box, IconButton, Stack } from "@mui/material";
import { Typography, Snackbar, Alert } from "@mui/material";
import { Close } from "@mui/icons-material";
import LoadingButton from "@mui/lab/LoadingButton";

const StockForm = ({ toggleStockForm }) => {
  const { user } = useAuthContext();
  const { logout } = useLogout();
  const navigate = useNavigate();
  const { showMessage, flashMessage } = useFlash();
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [type, setType] = useState("");
  const [quantity, setQuantity] = useState("");
  const [severity, setSeverity] = useState(true);
  const [message, setMessage] = useState(null);

  const createStockMutation = useMutation({
    mutationFn: (variables) => createStock(variables),
    onSuccess: (data) => {
      setTitle("");
      setPrice("");
      setType("");
      setQuantity("");
      setSeverity(true);
      setMessage(data.message);
      flashMessage(2500);
      navigate(0);
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
          setTimeout(() => navigate(0), 3200);
        }
      } else {
        setMessage(error.message);
        flashMessage(3200);
      }
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !price || !type || !quantity) return;
    const stock = { title, price, type, quantity };
    const info = { stock, token: user.token };
    createStockMutation.mutate(info);
  };
  const { isLoading } = createStockMutation;
  return (
    <>
      <form noValidate onSubmit={handleSubmit} autoComplete="off">
        <Box sx={modalStyle}>
          <Stack sx={stackStyle}>
            <IconButton onClick={toggleStockForm} sx={closeModalStyle}>
              <Close color="primary" fontSize="large" />
            </IconButton>
            <Typography variant="h5" align="center" gutterBottom>
              Add a stock
            </Typography>
            <TextField
              sx={inputStyle}
              type="text"
              label="Name"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <TextField
              sx={inputStyle}
              type="number"
              label="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <TextField
              sx={inputStyle}
              type="text"
              label="Type"
              value={type}
              onChange={(e) => setType(e.target.value)}
            />
            <TextField
              sx={inputStyle}
              label="Quantity"
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />

            <LoadingButton
              type="submit"
              loading={isLoading}
              loadingPosition="center"
              variant="contained"
            >
              Add Stock
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

export default StockForm;
