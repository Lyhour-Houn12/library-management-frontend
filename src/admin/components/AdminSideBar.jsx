import React, { useState } from "react";

import {
  Box,
  Drawer,
  List,
  Divider,
  Collapse,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from "@mui/material";

import {
  ExpandLess,
  ExpandMore,
  Logout as LogoutIcon,
} from "@mui/icons-material";

import { useDispatch } from "react-redux";

import SidebarLogo from "./SidebarLogo";
import SidebarItem from "./SidebarItem";

import { useNavigate } from "react-router";
import { useLocation } from "react-router";
import { logout } from "../../store/features/auth/authSlice";
import { navigationItems } from "../config/navigationItems";

export default function AdminSidebar({
  drawerWidth,
  mobileOpen,
  onDrawerToggle,
  isMobile,
}) {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const [subscriptionsOpen, setSubscriptionsOpen] = useState(true);

  const isActive = (path) => {
    if (!path) return false;

    return (
      location.pathname === path || location.pathname.startsWith(path + "/")
    );
  };

  const handleNavigation = (path) => {
    if (!path) return;

    navigate(path);

    if (isMobile) {
      onDrawerToggle();
    }
  };

  const handleLogout = () => {
    dispatch(logout());

    navigate("/");

    if (isMobile) {
      onDrawerToggle();
    }
  };

  const drawer = (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        background: "linear-gradient(180deg, #0f172a 0%, #020617 100%)",
        color: "white",
        position: "relative",
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "300px",
          background:
            "radial-gradient(circle at 50% 0%, rgba(220, 38, 38, 0.15) 0%, transparent 100%)",
          pointerEvents: "none",
        },
      }}
    >
      {/* Logo */}
      <SidebarLogo />
      {/* Navigation */}
      <List
        sx={{
          flex: 1,
          px: 2,
          py: 2,
          overflowY: "auto",
          position: "relative",
          zIndex: 1,
          // Chrome / Safari / Opera
          "&::-webkit-scrollbar": {
            display: "none",
          },
          // IE / Edge
          msOverflowStyle: "none",
          // Firefox
          scrollbarWidth: "none",
        }}
      >
        {navigationItems.map((item) => {
          /*
           * Normal navigation item
           */
          if (!item.children) {
            return (
              <SidebarItem
                key={item.path}
                item={item}
                active={isActive(item.path)}
                onClick={() => handleNavigation(item.path)}
              />
            );
          }
          /*
           * Subscription parent item
           */
          return (
            <React.Fragment key={item.title}>
              <ListItem disablePadding sx={{ mb: 1 }}>
                <Tooltip title={item.description} placement="right" arrow>
                  <ListItemButton
                    onClick={() => setSubscriptionsOpen((prev) => !prev)}
                    sx={{
                      borderRadius: 2.5,
                      py: 1.5,
                      px: 2,
                      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                      border: "1px solid transparent",
                      "&:hover": {
                        bgcolor: "rgba(255,255,255,0.05)",
                        transform: "translateX(6px)",
                        border: "1px solid rgba(255,255,255,0.08)",
                      },
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 48,
                        color: "rgba(255,255,255,0.7)",
                      }}
                    >
                      {item.icon}
                    </ListItemIcon>

                    <ListItemText
                      primary={item.title}
                      slotProps={{
                        primary: {
                          fontWeight: 500,
                          fontSize: "0.95rem",
                          color: "rgba(255,255,255,0.85)",
                        },
                      }}
                    />

                    {subscriptionsOpen ? (
                      <ExpandLess
                        sx={{
                          color: "rgba(255,255,255,0.7)",
                        }}
                      />
                    ) : (
                      <ExpandMore
                        sx={{
                          color: "rgba(255,255,255,0.7)",
                        }}
                      />
                    )}
                  </ListItemButton>
                </Tooltip>
              </ListItem>

              {/* Subscription Children */}
              <Collapse in={subscriptionsOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {item.children.map((child) => (
                    <SidebarItem
                      key={child.path}
                      item={child}
                      active={isActive(child.path)}
                      nested
                      onClick={() => handleNavigation(child.path)}
                    />
                  ))}
                </List>
              </Collapse>
            </React.Fragment>
          );
        })}
      </List>

      {/* Divider */}
      <Divider
        sx={{
          borderColor: "rgba(255,255,255,0.05)",
          mx: 2,
        }}
      />

      {/* Logout */}
      <Box
        sx={{
          p: 2,
          position: "relative",
          zIndex: 1,
        }}
      >
        <ListItemButton
          onClick={handleLogout}
          sx={{
            borderRadius: 2.5,
            py: 1.5,
            px: 2,
            background:
              "linear-gradient(135deg, rgba(239, 68, 68, 0.15) 0%, rgba(220, 38, 38, 0.15) 100%)",
            border: "1px solid rgba(239, 68, 68, 0.2)",
            transition: "all 0.3s ease",
            "&:hover": {
              background:
                "linear-gradient(135deg, rgba(239, 68, 68, 0.25) 0%, rgba(220, 38, 38, 0.25) 100%)",
              border: "1px solid rgba(239, 68, 68, 0.4)",
              transform: "translateY(-2px)",
              boxShadow: "0 8px 24px rgba(239, 68, 68, 0.25)",
            },
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: 42,
              color: "#f87171",
            }}
          >
            <LogoutIcon />
          </ListItemIcon>

          <ListItemText
            primary="Logout"
            slotProps={{
              primary: {
                fontWeight: 600,
                fontSize: "0.95rem",
                color: "#fca5a5",
              },
            }}
          />
        </ListItemButton>
      </Box>

      {/* Bottom Branding */}
      <Box
        sx={{
          p: 2,
          textAlign: "center",
          position: "relative",
          zIndex: 1,
        }}
      >
        <Box
          component="span"
          sx={{
            display: "block",
            opacity: 0.4,
            fontSize: "0.7rem",
            fontWeight: 500,
            letterSpacing: 0.5,
          }}
        >
          © 2026 Admin Panel. Secured.
        </Box>
      </Box>
    </Box>
  );

  return (
    <Box
      component="nav"
      sx={{
        width: {
          md: drawerWidth,
        },

        flexShrink: {
          md: 0,
        },
      }}
    >
      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: {
            xs: "block",
            md: "none",
          },

          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
            border: "none",
          },
        }}
      >
        {drawer}
      </Drawer>

      {/* Desktop Drawer */}
      <Drawer
        variant="permanent"
        sx={{
          display: {
            xs: "none",
            md: "block",
          },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
            border: "none",
          },
        }}
        open
      >
        {drawer}
      </Drawer>
    </Box>
  );
}
