import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";
import Login from "./pages/Login";
import Users from "./pages/Users";
import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import Orders from "./pages/Orders";
import Stocks from "./pages/Stocks";
import StockDetails from "./components/StockDetails";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import { Container } from "@mui/material";
import { useTheme } from "@emotion/react";
import Navbar from "./components/Navbar";

const App = () => {
  const theme = useTheme();
  const { user } = useAuthContext();
  const bgcolor = { background: theme.palette.background.default };
  return (
    <Container className="app" sx={bgcolor}>
      <BrowserRouter>
        <Navbar>
          <Routes>
            <Route exact path="/" element={user ? <Dashboard /> : <Home />} />
            <Route path="/stocks" element={user ? <Stocks /> : <Login />} />
            <Route
              path="/stockDetails/:id"
              element={user ? <StockDetails /> : <Login />}
            />
            <Route
              path="/transactions"
              element={user ? <Transactions /> : <Login />}
            />
            <Route path="/orders" element={user ? <Orders /> : <Login />} />
            <Route path="/login" element={user ? <Dashboard /> : <Login />} />
            <Route path="/users" element={<Users />} />
            <Route
              path="/dashboard"
              element={user ? <Dashboard /> : <Login />}
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Navbar>
      </BrowserRouter>
    </Container>
  );
};

export default App;
