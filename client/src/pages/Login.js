import { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import { useNavigate } from "react-router-dom";
import { MyLink } from "../hooks/useStyles";
import { useFlash } from "../hooks/useFlash";
import { Input, Button, Box, Typography, Snackbar, Alert } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";

const Login = () => {
  const navigate = useNavigate();
  const { showMessage, flashMessage } = useFlash();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const { isLoading, setIsLoading, login } = useLogin();

  const inputStyle = {
    width: {
      md_1: "35%",
      md: "40%",
      sm_1: "45%",
      sm: "55%",
      xs: "75%",
    },
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!username || !password) return;
    try {
      const { json } = await login(username, password);
      if (json.error) {
        setError(json.error);
        flashMessage(3000);
        return;
      }
      if (json.message) {
        setSuccess(json.message);
        setUsername("");
        setPassword("");
        flashMessage(3000);
      }
      setTimeout(() => navigate("/dashboard", { replace: true }), 2000);
    } catch (error) {
      setIsLoading(false);
      setError(
        "Cannot connect to server, check internet connection and try again"
      );
      flashMessage(3000);
    }
  };
  return (
    <>
      <form className="login" onSubmit={handleLogin} autoComplete="off">
        <Typography variant="h3" gutterBottom>
          Login
        </Typography>
        <Input
          sx={inputStyle}
          type="text"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          autoFocus
        />
        <Input
          sx={inputStyle}
          type="password"
          placeholder="Password"
          id="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />

        <Box display="flex" gap="30px" justifyContent="center">
          <MyLink to="/">
            <Button variant="outlined">
              <i className="fa-solid fa-arrow-left"></i>
              <span>Home</span>
            </Button>
          </MyLink>

          <LoadingButton
            onClick={handleLogin}
            loading={isLoading}
            loadingPosition="center"
            variant="contained"
          >
            Login
          </LoadingButton>
        </Box>
      </form>
      {error && (
        <Snackbar
          open={showMessage}
          autoHideDuration={5000}
          anchorOrigin={{ horizontal: "center", vertical: "top" }}
        >
          <Alert severity="error">{error}</Alert>
        </Snackbar>
      )}

      {success && (
        <Snackbar
          open={showMessage}
          autoHideDuration={5000}
          anchorOrigin={{ horizontal: "center", vertical: "top" }}
        >
          <Alert severity="success">{success}</Alert>
        </Snackbar>
      )}
    </>
  );
};

export default Login;
