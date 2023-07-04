import { MyLink } from "../hooks/useStyles";
import { Typography, Button, Box } from "@mui/material";

const NotFound = () => {
  return (
    <Box sx={{ display: "grid", placeItems: "center", mt: 15 }}>
      <Typography variant="h3">Page not Found</Typography>
      <nav className="nav-notfound">
        <Typography>
          Back to{" "}
          {["Home", "Previous page"].map((link) => (
            <MyLink to="/" key={link}>
              <Button>{link}</Button>
            </MyLink>
          ))}
        </Typography>
      </nav>
    </Box>
  );
};

export default NotFound;
