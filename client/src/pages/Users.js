import { useState } from "react";
import { Button, Typography, Box, Modal } from "@mui/material";
// import { useAuthContext } from "../hooks/useAuthContext";
import Register from "../components/Register";

const Users = () => {
  // const { user } = useAuthContext();
  const [showRegister, setShowRegister] = useState(false);
  const toggleRegister = () => setShowRegister(!showRegister);

  return (
    <Box>
      <Typography variant="h2" gutterBottom>
        Users
      </Typography>
      <Button variant="outlined" color="primary" onClick={toggleRegister}>
        Add New User
      </Button>
      <Modal open={showRegister} onClose={toggleRegister}>
        <div>
          <Register toggleRegister={toggleRegister} />
        </div>
      </Modal>
    </Box>
  );
};

export default Users;
