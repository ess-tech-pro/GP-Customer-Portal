import { Box, Divider, Drawer, List } from "@mui/material";
import { Fragment, useEffect } from "react";

import { SIDEBAR_WIDTH } from "../constants";
import SidebarLink from "./SidebarLink";
import SidebarSubmenu from "./SidebarSubmenu";
import navigation from "@/routes/navigation";
import useIsMobile from "@/hooks/useIsMobile";
import { useLayoutContext } from "@/contexts/LayoutContext";
import logoDemo from '../../../public/images/logo/react.svg';


const Sidebar = () => {
  const isMobile = useIsMobile();
  const { sidebarOpen, setSidebarOpen } = useLayoutContext();

  function handleClose() {
    setSidebarOpen(false);
  }

  useEffect(() => {
    setSidebarOpen(!isMobile);
  }, [isMobile, setSidebarOpen]);

  return (
    <Drawer
      variant={isMobile ? "temporary" : "persistent"}
      open={sidebarOpen}
      onClose={() => handleClose}
      ModalProps={{
        keepMounted: true,
      }}
      sx={{
        "& .MuiDrawer-paper": {
          background: "#000",
          boxSizing: "border-box",
          width: SIDEBAR_WIDTH,
        },
      }}
    >
      <Box>
        <Box sx={{
          minHeight: '64px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <img src={logoDemo} alt="Logo Demo" />
        </Box>


        {/* <Toolbar /> */}
        {navigation.map((section) => (
          <Fragment key={section.title}>
            <Divider />
            <List>
              {section.links.map((link) =>
                link.children ? (
                  <SidebarSubmenu
                    key={link.title}
                    text={link.title}
                    icon={link.icon}
                  >
                    <List>
                      {link.children.map((nestedLink) => (
                        <SidebarLink
                          key={nestedLink.path}
                          to={nestedLink.path}
                          text={nestedLink.title}
                          icon={nestedLink.icon}
                        />
                      ))}
                    </List>
                  </SidebarSubmenu>
                ) : (
                  <SidebarLink
                    key={link.path}
                    to={link.path}
                    text={link.title}
                    icon={link.icon}
                  />
                ),
              )}
            </List>
          </Fragment>
        ))}
      </Box>
    </Drawer>
  );
};

export default Sidebar;
