import {
  AppBar,
  Box,
  CssBaseline,
  IconButton,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useUserStore } from "store/user/userzustandstore";
import { flexBox, size } from "theme/defaultFunction";
import MenuIcon from "@mui/icons-material/Menu";
import SideBar from "common/sidebar/Sidebar";
import AvatarMenu from "common/sidebar/Avatar";
import { userestaurantStore } from "store/restaurant/restaurantStore";
import RefreshIcon from "@mui/icons-material/Refresh";
import { useTheme } from "@emotion/react";

const HomeStructure = ({ children }) => {
  const router = useRouter();
  const drawerWidth = 240;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [largeHide, setlargeHide] = React.useState(true);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const handleDrawerToggleLarge = () => {
    setlargeHide(!largeHide);
  };

  const userState = useUserStore((state) => state.user);
  const logout = useUserStore((state) => state.logout);
  const theme= useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));
  const restaurant = userestaurantStore((state) => state.restaurant);
  useEffect(() => {
    if (!userState || !userState.login || !userState._id) {
      router.push("/auth");
    }
  }, [userState, router]);
  useEffect(()=>{
    console.log({matches})
    if(matches){
      setlargeHide(true);
    }else{
      setlargeHide(false);
    }
  },[matches])
  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        width: "100vw",
        overflowY: "hidden",
      }}
    >
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: {
            sm: largeHide
              ? `calc(100% - ${drawerWidth}px)`
              : `calc(100% - ${90}px)`,
            // sm: `calc(100% - ${drawerWidth}px)`
          },
          ml: { sm: `${drawerWidth}px` },
          padding: {
            xs: 0,
            md: 1,
          },
          height: {
            xs: "55px",
            md: "70px",
          },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggleLarge}
            sx={{ mr: 2, display: { xs: "none", sm: "flex" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h3" noWrap component="div" color={"white"}>
            {restaurant?.restaurantInfo?.restaurantName}
          </Typography>

          <Box
            sx={{
              flex: 1,
              ...flexBox("row", "flex-end"),
            }}
          >
            <IconButton
              onClick={() => {
                router.reload();
              }}
            >
              <RefreshIcon />
            </IconButton>
            <AvatarMenu userState={userState} logout={logout} />
            {/*  */}
          </Box>
        </Toolbar>
      </AppBar>
      <Box
        sx={{
          "& .css-1hssoln-MuiDrawer-docked .MuiDrawer-paper":{
            width: {
              sm: largeHide ? 240 : 90,
            },

          },
          flexShrink: { sm: 0 },
        }}
      >
        <SideBar
          largeHide={largeHide}
          mobileOpen={mobileOpen}
          setMobileOpen={setMobileOpen}
          handleDrawerToggle={handleDrawerToggle}
          user={userState}
        />
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          height: "100vh",
          // width: largeHide? "100%" : "80vw",
          pl:{
            sm:largeHide ? 30 : 10
          },
          ...flexBox("column"),
          overflow: "hidden",
          // border:"12px solid blue"
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};

export default HomeStructure;
