import { Link } from "react-router-dom";
import { styled } from "@mui/system";

// causes page to rerender  on input change
// export const StyledInput = styled(Input)(({theme}) => ({
//   width: '30%'
// }))

export const MyLink = styled(Link)(() => ({
  textDecoration: "none",
  color: "#fff",
  padding: "",
}));

export const modalStyle = {
  height: "auto",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: {
    xs: "90%",
    sm: "80%",
    sm_1: 700,
  },
  borderRadius: "10px",
  backgroundColor: "#1F1D2B",
  border: "1px solid #e45941",
  boxShadow: 24,
};
export const stackStyle = {
  paddingBlock: "1.7rem",
  alignItems: "center",
  gap: 2,
  position: "relative",
};
export const closeModalStyle = {
  position: "absolute",
  top: 1,
  right: 5,
};
export const inputStyle = {
  width: {
    xs: "75%",
    sm_1: "50%",
  },
};
