import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useLogout } from "../hooks/useLogout";
import { DeletePrompt } from "./DeletePrompt";
import { Button, Box, Typography, Skeleton } from "@mui/material";
import { Alert, Snackbar, CircularProgress } from "@mui/material";
import { Stack } from "@mui/material";
import { useFlash } from "../hooks/useFlash";
import { Modal } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { fetchSingleStock } from "../utilis/StockFunctions";
import EditPage from "./EditPage";

const StockDetails = () => {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const { id } = useParams();
  const { logout } = useLogout();
  const { showMessage, flashMessage } = useFlash();
  const [error, setError] = useState(null);
  const [showEditPage, setShowEditPage] = useState(false);
  const [deletePrompt, showDeletePrompt] = useState(false);

  //skeleton preview
  const [image] = useState(false);
  //skeleton preview

  const toggleDeletePrompt = () => showDeletePrompt(!deletePrompt);
  const toggleEditPage = () => setShowEditPage(!showEditPage);
  const skeleton = {
    width: 210,
    height: 210,
    borderRadius: 3,
  };
  const btnContainer = {
    gap: 2,
    margin: "30px auto",
    justifyContent: "center",
  };
  const stockDetails = {
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
  };
  const info = { id, token: user.token };
  const singleStockQuery = useQuery({
    queryKey: ["single_stock"],
    queryFn: () => fetchSingleStock(info),
    onError: (error) => {
      if (error.response?.data?.error) {
        setError(error.response.data.error);
        if (error.response.data.error.includes("Authentication" || "expired")) {
          flashMessage(3200);
          setTimeout(logout, 3200);
        }
        if (error.response.data.error.includes("Stock")) {
          flashMessage(3200);
          setTimeout(() => navigate("/stocks", { replace: true }), 3200);
        }
      } else {
        setError(error.message);
        flashMessage(3200);
      }
    },
  });
  const { data, isLoading } = singleStockQuery;
  return (
    <div className="container">
      {isLoading && (
        <CircularProgress
          size={100}
          sx={{ display: "block", margin: "1rem auto" }}
        />
      )}

      <Snackbar
        open={showMessage}
        autoHideDuration={4000}
        anchorOrigin={{ horizontal: "center", vertical: "top" }}
      >
        <Alert severity="error">{error}</Alert>
      </Snackbar>

      {data && (
        <Box>
          <Stack direction={{xs: 'column', sm: 'row'}} sx={stockDetails}>
            {image ? <img /> : <Skeleton variant="rectangular" sx={skeleton} />}
            <Stack gap={1}>
              <Typography variant="h4">{data.title}</Typography>
              <Typography variant="h4">N{data.price}</Typography>
              <Typography variant="h5">Qty: {data.quantity}</Typography>
              <Typography variant="h6">For {data.type}</Typography>
            </Stack>
          </Stack>

          <Stack direction="row" sx={btnContainer}>
            <Button variant="outlined" onClick={toggleEditPage}>
              Edit Stock
            </Button>
            <Button
              variant="outlined"
              onClick={toggleDeletePrompt}
              color="error"
            >
              Delete Stock
            </Button>
          </Stack>
        </Box>
      )}

      <Modal open={deletePrompt} onClose={toggleDeletePrompt}>
        <div>
          <DeletePrompt
            toggleDeletePrompt={toggleDeletePrompt}
            id={id}
            user={user}
          />
        </div>
      </Modal>
      <Modal open={showEditPage} onClose={toggleEditPage}>
        <div>
          <EditPage toggleEditPage={toggleEditPage} stock={data} id={id} />
        </div>
      </Modal>
    </div>
  );
};
export default StockDetails;
