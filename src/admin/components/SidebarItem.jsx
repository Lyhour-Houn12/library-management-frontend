import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Box,
} from "@mui/material";

export default function SidebarItem({ item, active, onClick, nested = false }) {
  return (
    <ListItem
      disablePadding
      sx={{
        mb: nested ? 0.5 : 1,
      }}
    >
      <Tooltip
        title={item.description || ""}
        placement="right"
        arrow
        disableHoverListener={nested}
      >
        <ListItemButton
          onClick={onClick}
          sx={{
            borderRadius: nested ? 2 : 2.5,
            py: nested ? 1.2 : 1.5,
            px: nested ? 2 : 2,
            pl: nested ? 6 : 2,
            transition: nested
              ? "all 0.3s ease"
              : "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            position: "relative",
            bgcolor: active ? "rgba(220, 38, 38, 0.15)" : "transparent",
            border: active
              ? "1px solid rgba(220, 38, 38, 0.3)"
              : "1px solid transparent",
            backdropFilter: active && !nested ? "blur(10px)" : "none",
            "&:hover": {
              bgcolor: active
                ? "rgba(220, 38, 38, 0.2)"
                : "rgba(255,255,255,0.05)",
              transform: nested ? "translateX(5px)" : "translateX(6px)",
              border: "1px solid rgba(255,255,255,0.08)",
            },
            // Active indicator
            "&::before":
              active && !nested
                ? {
                    content: '""',
                    position: "absolute",
                    left: 0,
                    top: "50%",
                    transform: "translateY(-50%)",
                    width: 4,
                    height: "70%",
                    borderRadius: "0 4px 4px 0",
                    background:
                      "linear-gradient(135deg, #dc2626 0%, #991b1b 100%)",
                    boxShadow: "0 0 12px rgba(220, 38, 38, 0.6)",
                  }
                : {},
          }}
        >
          {/* Icon */}
          <ListItemIcon
            sx={{
              minWidth: nested ? 40 : 48,
              color: active
                ? nested
                  ? "#fca5a5"
                  : "#fca5a5"
                : nested
                  ? "rgba(255,255,255,0.6)"
                  : "rgba(255,255,255,0.7)",

              transition: "all 0.3s ease",
            }}
          >
            {item.icon}
          </ListItemIcon>

          {/* Text */}
          <ListItemText
            primary={item.title}
            slotProps={{
              primary: {
                fontWeight: active ? 700 : 500,
                fontSize: nested ? "0.9rem" : "0.95rem",
                color: active
                  ? "#ffffff"
                  : nested
                    ? "rgba(255,255,255,0.75)"
                    : "rgba(255,255,255,0.85)",
              },
            }}
          />

          {/* Active dot */}
          {active && !nested && (
            <Box
              sx={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                bgcolor: "#fca5a5",
                boxShadow: "0 0 12px rgba(252, 165, 165, 0.8)",
              }}
            />
          )}
        </ListItemButton>
      </Tooltip>
    </ListItem>
  );
}
