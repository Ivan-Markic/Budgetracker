import MuiAppBar, { AppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import { styled } from "@mui/material/styles";
import { Avatar } from "@mui/material";
import Drawer from "./Drawer";
import React from "react";
import LanguageSelector from "./LanguageSelector";

interface ExtendedAppBarProps extends AppBarProps {
  open: boolean;
}

const drawerWidth: number = 240;

const StyledAppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<ExtendedAppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

function AppBar({ profilePictureUrl }: { profilePictureUrl: string }) {
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };
  return (
    <div className="appBar">
      <StyledAppBar position="absolute" open={open}>
        <Toolbar
          sx={{
            pr: "24px", // keep right padding when the drawer is closed
          }}
        >
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer}
            sx={{
              marginRight: "36px",
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            sx={{ flexGrow: 1 }}
          >
            Budgetracker
          </Typography>
          <LanguageSelector />
          <IconButton
            color="inherit"
            onClick={() => (window.location.href = "/")}
          >
            {profilePictureUrl && (
              <Avatar alt="User Avatar" src={profilePictureUrl} />
            )}
          </IconButton>
        </Toolbar>
      </StyledAppBar>
      <Drawer open={open} toggleDrawer={toggleDrawer} />
    </div>
  );
}

export default AppBar;
