import styled from "@emotion/styled";
import { Button } from "@mui/material";

const StyledButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText("#FF8C32"),
    backgroundColor: "#FF8C32",
    '&:hover': {
      backgroundColor: "#994300",
    },
    padding: theme.spacing(1)
}));

export default StyledButton;