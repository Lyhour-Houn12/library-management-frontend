import { Button as ButtonClick } from "@mui/material";

const Button = ({ icon, title, handleClick }) => {
  return (
    <ButtonClick
      onClick={handleClick}
      variant="contained"
      startIcon={icon}
      sx={{
        background: "linear-gradient(45deg, #667eea 30%, #764ba2 90%)",
        color: "#fff",
        px: 2.4,
        py: 1.1,
        borderRadius: 2,
        fontWeight: 600,
        fontSize: 16,
        textTransform: "none",
        boxShadow: "0 4px 12px rgba(102, 126, 234, 0.35)",
        transition: "all 0.3s ease",

        "&:hover": {
          background: "linear-gradient(45deg, #5a6fd8 30%, #6a3f91 90%)",
          boxShadow: "0 6px 16px rgba(102, 126, 234, 0.45)",
          transform: "translateY(-2px)",
        },

        "&:active": {
          transform: "translateY(0)",
        },
      }}
    >
      {title}
    </ButtonClick>
  );
};

export default Button;
