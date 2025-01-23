import { AppBar, IconButton, Toolbar } from "@mui/material";

import Breadcrumbs from "./Breadcrumbs";
import MenuIcon from "@mui/icons-material/Menu";
import { SIDEBAR_WIDTH } from "../constants";
import SelectLanguage from './SelectLanguage';
import useIsMobile from "@/hooks/useIsMobile";
import { useLayoutContext } from "@/contexts/LayoutContext";

const Header = () => {
  const { sidebarOpen, setSidebarOpen } = useLayoutContext();
  const isMobile = useIsMobile();
  const handleDrawerToggle = () => {
    setSidebarOpen((current) => !current);
  };
  return (
    <AppBar
      elevation={0}
      position="fixed"
      sx={{
        width: `calc(100% - ${sidebarOpen && !isMobile ? SIDEBAR_WIDTH : 0
          }px)`,
        transition: (theme) =>
          theme.transitions.create(["width"], {
            easing: sidebarOpen
              ? theme.transitions.easing.easeOut
              : theme.transitions.easing.sharp,
            duration: sidebarOpen
              ? theme.transitions.duration.enteringScreen
              : theme.transitions.duration.leavingScreen,
          }),
      }}
    >
      <Toolbar>
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center">
            <IconButton
              color="inherit"
              aria-label="toggle drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Breadcrumbs />
          </div>
          <SelectLanguage />
        </div>

      </Toolbar>
    </AppBar>
  );
};

export default Header;
