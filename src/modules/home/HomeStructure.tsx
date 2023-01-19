import { AppBar, Box, CssBaseline, IconButton, Toolbar, Typography } from '@mui/material';
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useUserStore } from 'store/user/userzustandstore';
import { flexBox, size } from 'theme/defaultFunction';
import MenuIcon from '@mui/icons-material/Menu';
import SideBar from 'common/sidebar/Sidebar';
import AvatarMenu from 'common/sidebar/Avatar';




const HomeStructure = ({children}) => {
    const router = useRouter();
    const drawerWidth = 240;
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
      setMobileOpen(!mobileOpen);
    };

    const userState = useUserStore(state=>state.user);
    // useEffect(() => {
    //   if(!userState?.login){
    //     router.push("/auth")
    //   }
    // }, [router, userState?.login])
    // useEffect(()=>{
    //     if(userState?.login && userState.role == "WAITER"){
    //         router.push("/table")
    //     }
    // },[router, userState?.login , userState?.role])
  
   
  return (
    <Box sx={{ display: 'flex', height:"100vh", width:"100vw", overflowY:"hidden" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          padding:{
            xs:0,
            md:1
          },
          height:{
            xs:"50px",
            md:"70px"
          }
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h3" noWrap component="div" color={"white"}>
            Restaurant Name
          </Typography>
          <Box sx={{
            flex:1,
            ...flexBox("row", "flex-end")
          }}>
            <AvatarMenu userState={userState}/>
            {/*  */}
          </Box>
        </Toolbar>
      </AppBar>
      
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <SideBar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} handleDrawerToggle={handleDrawerToggle}/>
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1,  
        height:"100vh",
        width:"100vw",
        ...flexBox("column"),
        overflow:"hidden",
        // border:"12px solid blue"
       }}
      >
        <Toolbar/>
        {children}
        
      </Box>
    </Box>
  )
}

export default HomeStructure