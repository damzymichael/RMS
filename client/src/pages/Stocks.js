import { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useLogout } from "../hooks/useLogout";
import { useQuery } from "@tanstack/react-query";
import { fetchStocks } from "../utilis/StockFunctions";
import { useLocation } from "react-router-dom";
import { useFlash } from "../hooks/useFlash";
import { MyLink } from "../hooks/useStyles";
import { CircularProgress } from "@mui/material";
import { Button, Box, Grid, Typography } from "@mui/material";
import { Snackbar, Alert, Modal, Paper } from "@mui/material";
import StockForm from "../components/StockForm";

const Stocks = () => {
  const location = useLocation();
  const { user } = useAuthContext();
  const { logout } = useLogout();
  const { showMessage, flashMessage } = useFlash();
  const [error, setError] = useState(null);
  const [showStockForm, setShowStockForm] = useState(false);
  const toggleStockForm = () => setShowStockForm(!showStockForm);
  const linkStyle = {
    display: "block",
    margin: "0 auto",
    width: {
      xs: "90%",
      sm: "100%",
    },
  };
  const stocksQuery = useQuery({
    queryKey: ["stocks"],
    queryFn: () => fetchStocks(user.token),
    onError: (error) => {
      if (error.response?.data?.error) {
        console.log(error.response.data.error);
        setError(error.response.data.error);
        flashMessage(3000);
        setTimeout(logout, 3200);
      } else {
        setError(error.message);
        flashMessage(3000);
      }
    },
    staleTime: 1000 * 60 * 1,
    refetchInterval: 120000,
  });
  const { isLoading, data, refetch } = stocksQuery;

  useEffect(() => {
    if (location.state?.id) refetch();
  }, []);

  return (
    <Box>
      <Typography variant="h4" align="center" sx={{ mt: "20px", mb: "40px" }}>
        Stocks
      </Typography>

      {isLoading && (
        <CircularProgress
          size={100}
          sx={{ display: "block", margin: "5rem auto" }}
        />
      )}

      <Snackbar
        open={showMessage}
        autoHideDuration={4000}
        anchorOrigin={{ horizontal: "center", vertical: "top" }}
      >
        <Alert severity="error">{error}</Alert>
      </Snackbar>

      {data?.stocks && (
        <Box>
          <Grid container spacing={2}>
            {data.stocks.map((stock) => (
              <Grid item xl={3} md={3} sm={6} xs={12} key={stock._id}>
                <MyLink
                  to={`/stockDetails/${stock._id}`}
                  sx={linkStyle}
                  state={{ stock }}
                >
                  {/* Reduce padding when more content is added */}
                  <Paper elevation={10} sx={{ paddingBlock: "20px" }}>
                    <Typography variant="h5" fontWeight="light" align="center">
                      {stock.title}
                    </Typography>
                  </Paper>
                </MyLink>
              </Grid>
            ))}
          </Grid>

          <Button
            variant="contained"
            onClick={toggleStockForm}
            sx={{ display: "block", margin: "50px auto 30px" }}
          >
            Add New Stock
          </Button>
        </Box>
      )}

      <Modal open={showStockForm} onClose={toggleStockForm}>
        <div>
          <StockForm toggleStockForm={toggleStockForm} />
        </div>
      </Modal>
    </Box>
  );
};
export default Stocks;
