import React from "react";
import { Button, Typography } from "@mui/material";

const Orders = () => {
  return (
    <div className="container">
      <Typography variant="h3" gutterBottom>
        Orders
      </Typography>
      <Button variant="contained">Place Order</Button>
    </div>
  );
};

export default Orders;
