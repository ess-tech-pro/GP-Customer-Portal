import { AppBar, IconButton, Toolbar, Tooltip } from "@mui/material";

// import Breadcrumbs from "./Breadcrumbs";
import MenuIcon from "@mui/icons-material/Menu";
import { SIDEBAR_WIDTH } from "../constants";
import SelectLanguage from './SelectLanguage';
import useIsMobile from "@/hooks/useIsMobile";
import { useLayoutContext } from "@/contexts/LayoutContext";
import LogoutIcon from '@mui/icons-material/Logout';
import { CustomBreadcrumbs } from "@/components/custom-breadcrumbs";

const Header = () => {
  const { sidebarOpen, setSidebarOpen } = useLayoutContext();
  const isMobile = useIsMobile();
  // const paths = {
  //   dashboard: {
  //     root: "/dashboard",
  //     product: {
  //       root: "/dashboard/product",
  //       new: "/dashboard/product/new",
  //       edit: "/dashboard/product/edit",
  //     },
  //   },
  // };

  const handleDrawerToggle = () => {
    setSidebarOpen((current) => !current);
  };
  const handleLogout = () => {
    localStorage.removeItem('accessToken')
    window.location.reload()
  }

  return (
    <AppBar
      elevation={0}
      position="fixed"
      sx={{
        width: `calc(100% - ${sidebarOpen && !isMobile ? SIDEBAR_WIDTH : 0
          }px)`,
        background: "#000",
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
            {/* <Breadcrumbs /> */}
            <CustomBreadcrumbs
            // heading="Create a new product"
            // links={[
            //   { name: 'Dashboard', href: paths.dashboard.root },
            //   { name: 'Product', href: paths.dashboard.product.root },
            //   { name: 'New product' },
            // ]}
            // sx={{ mb: { xs: 3, md: 5 } }}
            />
          </div>
          <div className="flex">
            <SelectLanguage />
            <Tooltip title="Logout">
              <IconButton
                onClick={() => handleLogout()}
                color="inherit"
                size="large"
                aria-label="logout"
              >
                <LogoutIcon />
              </IconButton>
            </Tooltip>
          </div>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
