import React, { useState } from "react";

import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Badge,
  Tooltip,
  Avatar,
  Box,
} from "@mui/material";

import {
  Menu as MenuIcon,
  Notifications as NotificationsIcon,
  Settings as SettingsIcon,
} from "@mui/icons-material";

import { useSelector } from "react-redux";
import ThemeToggle from "../../components/theme/ThemeToggle";
import ProfileMenu from "./ProfileMenu";
import { useLocation } from "react-router";
import { navigationItems } from "../config/navigationItems";

export default function AdminNavbar({ drawerWidth, onMenuClick }) {
  const location = useLocation();
  const { user } = useSelector((state) => state.auth);
  const [anchorEl, setAnchorEl] = useState(null);
  const isActive = (path) => {
    if (!path) return false;
    return (
      location.pathname === path || location.pathname.startsWith(path + "/")
    );
  };

  const currentTitle =
    navigationItems.find((item) => {
      if (item.children) {
        return item.children.some((child) => isActive(child.path));
      }

      return isActive(item.path);
    })?.title || "Admin Dashboard";

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          width: {
            md: `calc(100% - ${drawerWidth}px)`,
          },
          ml: {
            md: `${drawerWidth}px`,
          },
          bgcolor: "background.paper",
          color: "text.primary",
          boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
        }}
      >
        <Toolbar>
          {/* Mobile Menu */}
          <IconButton
            color="inherit"
            edge="start"
            onClick={onMenuClick}
            sx={{
              mr: 2,
              display: {
                md: "none",
              },
            }}
          >
            <MenuIcon />
          </IconButton>

          {/* Current Page Title */}
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              flexGrow: 1,
              fontWeight: 700,
            }}
          >
            {currentTitle}
          </Typography>

          {/* Notifications */}
          <Tooltip title="Notifications">
            <IconButton>
              <Badge badgeContent={5} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Tooltip>

          {/* Settings */}
          <Tooltip title="Settings">
            <IconButton sx={{ ml: 1 }}>
              <SettingsIcon />
            </IconButton>
          </Tooltip>

          {/* Theme */}
          <Box sx={{ ml: 2 }}>
            <ThemeToggle />
          </Box>

          {/* Account */}
          <Tooltip title="Account">
            <IconButton onClick={handleProfileMenuOpen} sx={{ ml: 1 }}>
              <Avatar
                src={user?.profilePicture}
                sx={{
                  width: 36,
                  height: 36,
                }}
              >
                {user?.fullName?.charAt(0)}
              </Avatar>
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>

      {/* Profile Menu */}
      <ProfileMenu anchorEl={anchorEl} onClose={handleProfileMenuClose} />
    </>
  );
}
