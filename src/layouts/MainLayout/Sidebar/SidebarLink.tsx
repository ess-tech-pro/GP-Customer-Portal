import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { JSX } from "react";
import { useNavigate } from "react-router-dom";

import useIsMobile from "@/hooks/useIsMobile";
import { useLayoutContext } from "@/contexts/LayoutContext";

interface Props {
  text: string;
  to: string;
  icon: JSX.Element;
}

const SidebarLink = ({ text, icon, to }: Props) => {
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  const { sidebarOpen, setSidebarOpen } = useLayoutContext();
  function handleClickRedirect() {
    navigate(to)
    if (!isMobile || !sidebarOpen) return;
    setSidebarOpen(false)
  }
  return (
    <ListItem key={text} disablePadding sx={{
      color: 'white',
    }}>
      <ListItemButton onClick={() => handleClickRedirect()}>
        <ListItemIcon sx={{
          color: 'white',
        }}>{icon}</ListItemIcon>
        <ListItemText primary={text} />
      </ListItemButton>
    </ListItem>
  );
};
export default SidebarLink;
