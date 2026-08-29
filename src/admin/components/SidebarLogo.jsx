import { Box, Avatar, Typography } from "@mui/material";

import { Shield as ShieldIcon } from "@mui/icons-material";

export default function SidebarLogo() {
  return (
    <Box
      sx={{
        p: 3,
        display: "flex",
        alignItems: "center",
        gap: 2,
        position: "relative",
        zIndex: 1,
      }}
    >
      {/* Logo */}
      <Box
        sx={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Avatar
          sx={{
            width: 48,
            height: 48,

            background: "linear-gradient(135deg, #dc2626 0%, #991b1b 100%)",

            fontWeight: "bold",
            fontSize: "1.3rem",

            boxShadow: "0 8px 24px rgba(220, 38, 38, 0.4)",
          }}
        >
          <ShieldIcon sx={{ fontSize: 28 }} />
        </Avatar>

        {/* Pulse Animation */}
        <Box
          sx={{
            position: "absolute",
            width: 48,
            height: 48,
            background: "linear-gradient(135deg, #dc2626 0%, #991b1b 100%)",
            borderRadius: "50%",
            opacity: 0.3,
            animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
            "@keyframes pulse": {
              "0%, 100%": {
                transform: "scale(1)",
                opacity: 0.3,
              },
              "50%": {
                transform: "scale(1.2)",
                opacity: 0,
              },
            },
          }}
        />
      </Box>

      {/* Logo Text */}
      <Box>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 800,
            letterSpacing: 0.5,

            background: "linear-gradient(135deg, #ffffff 0%, #fecaca 100%)",

            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Admin Panel
        </Typography>

        <Typography
          variant="caption"
          sx={{
            opacity: 0.7,
            fontWeight: 500,
            letterSpacing: 1,
            textTransform: "uppercase",
          }}
        >
          Control Center
        </Typography>
      </Box>
    </Box>
  );
}
