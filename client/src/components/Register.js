import { useState } from "react";
import { useSignup } from "../hooks/useSignup";
import { modalStyle, stackStyle, closeModalStyle } from "../hooks/useStyles";
import { inputStyle } from "../hooks/useStyles";
import { TextField, MenuItem, Button, Box } from "@mui/material";
import { Typography, Stack, IconButton } from "@mui/material";
import { Close } from "@mui/icons-material";

const Register = ({ toggleRegister }) => {
  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [accountType, setAccountType] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const [errorStatus, setErrorStatus] = useState(false);
  const message = <div style={{ color: "red" }}>Passwords do not match</div>;
  const { signup, isLoading, error } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (errorStatus) return;
    await signup(fullname, username, accountType, confirmedPassword);
  };
  const validatePassword = (e) => {
    if (password.length > 0 && confirmedPassword.length > 0) {
      if (password !== confirmedPassword) {
        setErrorStatus(true);
        return;
      }
      setErrorStatus(false);
    }
    setErrorStatus(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box sx={modalStyle}>
        <Stack sx={stackStyle}>
          <IconButton sx={closeModalStyle} onClick={toggleRegister}>
            <Close color="primary" fontSize="large" />
          </IconButton>
          <Typography>Register User</Typography>
          <TextField
            type="text"
            label="Fullname"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
            sx={inputStyle}
          />

          <TextField
            type="text"
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            sx={inputStyle}
          />

          <TextField
            select
            label="Select"
            defaultValue="Staff"
            helperText="Please select account type"
            onChange={(e) => setAccountType(e.target.value)}
            sx={inputStyle}
          >
            <MenuItem value="Admin">Admin</MenuItem>
            <MenuItem value="Staff">Staff</MenuItem>
            <MenuItem value="Chef">Chef</MenuItem>
          </TextField>

          <TextField
            type="password"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyUp={validatePassword}
            sx={inputStyle}
          />

          <TextField
            type="password"
            label="Confirm password"
            value={confirmedPassword}
            onChange={(e) => setConfirmedPassword(e.target.value)}
            onKeyUp={validatePassword}
            sx={inputStyle}
          />
          {errorStatus ? message : null}

          <Button variant="outlined" type="submit" disabled={isLoading}>
            Create User
          </Button>
        </Stack>
      </Box>

      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default Register;
