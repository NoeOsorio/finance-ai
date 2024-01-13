import React from "react";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import BarChartIcon from "@mui/icons-material/BarChart";
import SettingsIcon from "@mui/icons-material/Settings";
import Logo from "../assets/images/logo.png";
import { Image } from "@mui/icons-material";

type NavigationItem = {
  text: string;
  icon: JSX.Element;
  link: string;
  disabled?: boolean;
};

type SideNavigationBarProps = {
  handleDrawerToggle: () => void;
  isOpen: boolean;
};

const navigationItems: NavigationItem[] = [
  { text: "Dashboard", icon: <DashboardIcon />, link: "/" },
  {
    text: "Transacciones",
    icon: <AccountBalanceWalletIcon />,
    link: "/transactions",
  },
  {
    text: "Reportes",
    icon: <BarChartIcon />,
    link: "/reports",
    disabled: true,
  },
  {
    text: "Ajustes",
    icon: <SettingsIcon />,
    link: "/settings",
    disabled: true,
  },
];
const SideNavigationBar: React.FC<SideNavigationBarProps> = ({
  handleDrawerToggle,
  isOpen = false,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const drawerStyle = {
    width: isMobile ? "100%" : "240px",
    flexShrink: 0,
    "& .MuiDrawer-paper": {
      width: isMobile ? "100%" : "240px",
      boxSizing: "border-box",
      backgroundColor: "#F5F5F5",
      color: "#333",
    },
  };

  return (
    <Drawer
      variant={isMobile ? "temporary" : "permanent"}
      open={isOpen}
      onClose={handleDrawerToggle}
      sx={drawerStyle}
    >
      <div style={{ padding: "10px", marginTop: isMobile ? "4em" : "1em", height:"20%" }}>
        <img src={Logo} alt="Logo" width="100%" height="100%" style={{objectFit:"cover"}} />
      </div>
      <List>
        {navigationItems.map((item) => {
          if (item.disabled) {
            return (
              <ListItemButton
                disabled={item.disabled}
                key={item.text}
                onClick={isMobile ? handleDrawerToggle : undefined}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            );
          }

          return (
            <RouterLink
              to={item.link}
              key={item.text}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <ListItemButton
                disabled={item.disabled}
                key={item.text}
                onClick={isMobile ? handleDrawerToggle : undefined}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </RouterLink>
          );
        })}
      </List>
    </Drawer>
  );
};

export default SideNavigationBar;
