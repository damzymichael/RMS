import React from "react";
import { AccountBox } from "@mui/icons-material";
import { Typography, Paper, Box } from "@mui/material";
import { MyLink } from "../hooks/useStyles";
import logo from "../logo.png";

const Home = () => {
  const paperStyle = {
    display: "flex",
    gap: 4,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    paddingBlock: "20px",
    margin: "0 auto",
  };
  const BoxStyle = (theme) => ({
    width: "70%",
    paddingBottom: "1rem",
    [theme.breakpoints.down("md_1")]: {
      width: "75%",
    },
    [theme.breakpoints.down("sm_1")]: {
      width: "80%",
    },
  });
  const Box2Style = (theme) => ({
    display: "flex",
    gap: 3,
    justifyContent: "center",
    mt: 5,
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      width: "100%",
    },
  });
  return (
    <Box className="home center" sx={BoxStyle}>
      <img src={logo} alt="logo" className="imagelogo" />
      <Typography variant="h4" gutterBottom textAlign="center">
        Who's Authenticating
      </Typography>
      <Box sx={Box2Style}>
        {["Admin", "Staff"].map((text) => (
          <MyLink
            to="/login"
            key={text}
            sx={{ width: { xs: "100%", sm: "35%" } }}
          >
            <Paper elevation={10} sx={paperStyle}>
              <AccountBox color="primary" sx={{ fontSize: 70 }} />
              <Typography variant="h5">{text}</Typography>
            </Paper>
          </MyLink>
        ))}
      </Box>
    </Box>
  );
};

export default Home;
