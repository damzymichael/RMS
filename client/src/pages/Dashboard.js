import { useAuthContext } from "../hooks/useAuthContext";
import { useLogout } from "../hooks/useLogout";
import { MyLink } from "../hooks/useStyles";
import { Button, Box, Typography, Grid, Paper } from "@mui/material";
import { Grading, ShoppingCart } from "@mui/icons-material";
import { ReceiptLong, People } from "@mui/icons-material";

const Dashboard = () => {
  const { user } = useAuthContext();
  const { logout } = useLogout();
  const navlinks = [
    { Link: "Stocks", icon: ShoppingCart },
    { Link: "Users", icon: People },
    { Link: "Orders", icon: ReceiptLong },
    { Link: "Transactions", icon: Grading },
  ];
  const paperStyle = {
    display: "flex",
    gap: "0.5rem",
    flexDirection: "column",
    alignItems: "center",
    margin: "0 auto",
    paddingBlock: 5,
    width: {
      xs: "90%",
      sm: "100%",
    },
  };

  return (
    <Box sx={{ paddingBottom: "2.5rem" }}>
      <Box display="flex" justifyContent="space-between" sx={{ mb: 5, mt: 3 }}>
        <Typography variant="h5" align="center">
          Welcome, {user.username}
        </Typography>
        <Button variant="contained" onClick={logout} color="error">
          Logout
        </Button>
      </Box>

      <Typography variant="h4" gutterBottom sx={{ textAlign: "center" }}>
        Admin Dashboard
      </Typography>

      <Grid
        container
        sx={{ mt: { xs: "40px", sm: "80px" } }}
        spacing={2}
        justifyContent="center"
        alignItems="center"
      >
        {navlinks.map((nav) => (
          <Grid item md={3} sm={6} xs={12} key={nav.Link}>
            <MyLink
              to={`/${nav.Link.charAt(0).toLowerCase() + nav.Link.slice(1)}`}
            >
              <Paper elevation={10} sx={paperStyle}>
                <nav.icon sx={{ fontSize: 50 }} color="primary" />
                <Typography variant="h5">{nav.Link}</Typography>
              </Paper>
            </MyLink>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Dashboard;
