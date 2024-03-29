/* eslint-disable @next/next/no-img-element */
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Button, Grid, Paper, Stack, Tooltip } from "@mui/material";
import { flexBox } from "theme/defaultFunction";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { Facebook, Google, Instagram, LinkedIn } from "@mui/icons-material";
import { useMutation } from "@tanstack/react-query";
import { loginUserFn } from "store/api/axiosSetup";
import { useUserStore } from "store/user/userzustandstore";

const drawerWidth = 240;

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
}

export default function HomePage(props: Props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const router = useRouter();
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const userState = useUserStore(state => state);

  const { mutate, isLoading } = useMutation(loginUserFn, {
    onSuccess: (data, variables, context) => {
      userState.setUser(data.data.data?.userLogged)
    },
  })
  const drawer = (
    <div>
      <Stack
        sx={{
          ...flexBox("column"),
          py: 3,
          cursor: "pointer",
        }}
      >
        <Tooltip title={"etoPOS"}>
          <Typography variant="h3">etoPOS</Typography>
        </Tooltip>
        <Typography variant="caption">Restaurant</Typography>
      </Stack>
      <Divider />
      <List>
        {[
          "Restaurants",
          "Support",
          "Pricing",
          "About",
          "Contact Us",
          "Careers",
        ].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <Stack sx={{ ...flexBox(), p: 1 }}>
        <Button
          fullWidth
          variant="outlined"
          onClick={() => {
            router.push("/auth");
          }}
        >
          Login
        </Button>
      </Stack>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex", height:"100vh", overflowX:"hidden" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100%)` },
        }}
      >
        <Toolbar sx={{ ...flexBox("row", "space-between") }}>
          <Stack direction={"row"}
          >
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            <Stack sx={{ ...flexBox("row", "space-between"), gap: 1 }}>
              <Box
                sx={{
                  position: "relative",
                  width: "2.5rem",
                  height: "2.5rem",
                }}
              >
                <Image
                  src="/icon-512x512.png"
                  layout="fill"
                  objectFit="contain"
                  alt="Logo"
                />
              </Box>
              <Typography variant="h3" component="h1">
                etoPOS
              </Typography>
            </Stack>
          </Stack>
          <Stack
            direction={"row"}
            justifyContent={"center"}
            alignItems={"center"}
            sx={{
              display: {
                xs: "none",
                sm: "flex",
              },
              gap: 2,
            }}
          >
            <Typography variant="h5" sx={{ cursor: "pointer" }}>
              Restaurants
            </Typography>
            <Typography variant="h5" sx={{ cursor: "pointer" }}>
              Support
            </Typography>
            <Typography variant="h5" sx={{ cursor: "pointer" }}>
              Pricing
            </Typography>
            <Typography variant="h5" sx={{ cursor: "pointer" }}>
              About
            </Typography>
            <Typography variant="h5" sx={{ cursor: "pointer" }}>
              Careers
            </Typography>
            <Button
              variant="outlined"
              disabled={isLoading}
              onClick={() => {
                router.push("/auth");
              }}
            >
              Login
            </Button>
            <Button
            disabled={isLoading}
              variant="contained"
              sx={{ backgroundColor: "black" }}
              onClick={() => {
                mutate({
                  mobileNumber: "9999999991",
                  pin: "123456",
                  showPin: false,
                })
              }}
            >
              DEMO
            </Button>
          </Stack>
          <Stack
            direction={"row"}
            justifyContent={"center"}
            alignItems={"center"}
            sx={{
              display: {
                xs: "flex",
                sm: "none",
              },
              gap: 2,
            }}
          >
            <Button
              variant="outlined"
              onClick={() => {
                router.push("/auth");
              }}
            >
              Login
            </Button>
          </Stack>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          height: `100vh`,
          overflowY: "auto",
          overflowX: "hidden",
        }}
      >
        <Toolbar />
        <Grid container py={5} gap={2} height={"100vh"} sx={{
            backgroundImage: "url(https://www.posist.com/restaurant-times/wp-content/uploads/2017/12/background-blurry-restaurant-shop-interior_1203-4031.jpeg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            position:"sticky",
            width:{
              xs:"100vw",
              sm:"100vw"
            },
            height:"100vh",
            p:{
              xs:5
            }
          }}>
          <Grid item xs={12} sm={5} sx={{ ...flexBox() }}>
            <Box
              sx={{
                position: "relative",
                width: "100%",
                height: {
                  xs: "10rem",
                  sm: "20rem",
                },
              }}
            >
              <Image
                src="/icon-512x512.png"
                layout="fill"
                objectFit="contain"
                alt="POS Logo"
              />
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} sx={{ ...flexBox("column"), p:3 }} gap={2}>
            <Typography variant="h1" component={"div"} sx={{
              color:"white",
              fontSize:{
                xs:"3rem",
                sm:"5rem",
              },
              textAlign:"center",
            }}>
              Introducing etoPOS
            </Typography>
            <Typography paragraph textAlign={"center"} sx={{
              color:"white",
              fontSize:"1rem",
            }}>
              A Powerful yet Simple POS for all your daily Business Need to keep
              your focus towards Customer
            </Typography>
          </Grid>
        </Grid>
        <Grid container py={5} gap={2} height={"90vh"}>
          <Grid item xs={12} sm={6} sx={{ ...flexBox("column") }} gap={2}>
            <Typography variant="h2" component={"div"} textAlign={"center"}>
            Trusted by 25+ Restaurant Partners
            </Typography>
            <Typography paragraph textAlign={"center"}>
              We proudly are trusted by 25+ local Restaurants and have processed more than 50,000+ orders till date
            </Typography>
          </Grid>
          <Grid item xs={12} sm={5} sx={{ ...flexBox() }}>
            <Box
              sx={{
                position: "relative",
                width: "100%",
                height: "20rem",
                gap:1,
                ...flexBox(),
                flexWrap:"wrap"
              }}
            >
              {[
                {
                  src:"https://madoverpizza.com/img/logo.png",
                  name:"MOP"
                },
                {
                  src:"https://lh3.googleusercontent.com/p/AF1QipP45zywTp9S-3MTZGCCIaZ62Aksk8lDbuX_Qv3P=s680-w680-h510",
                  name:"Cafe Avenger's Bite"
                },
                {
                  src:"https://lh3.googleusercontent.com/p/AF1QipOEAlqm3YCWgPx4asSdpfrhNVe7QKmljOYdn4Z_=s1360-w1360-h1020",
                  name:"IBS"
                },
                {
                  src:"https://lh3.googleusercontent.com/p/AF1QipPbYcwavd87LkC6IGR5cYR0iGY_dviK0-Pu1L4Y=s1360-w1360-h1020",
                  name:"CCC A'bad"
                },
                ].map((v, i)=>(
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={v.src} key={i} alt={v.name} style={{
                    width:"10rem",
                    height:"10rem",
                    objectFit:"contain",
                  }} />
              ))}..... Many more
            </Box>
          </Grid>
        </Grid>
        <Grid container py={5} gap={2}>
          <Grid item xs={12} sm={7} sx={{ ...flexBox("column"), zIndex:10, height:"7rem" }} gap={2}>
            <Typography variant="h3" component={"div"} textAlign={"center"}>
              Pricing Starts at ₹250/Month
            </Typography>
            <Stack gap={0}>
              <Typography paragraph textAlign={"center"}>
                Yes you heard it Right. Such Multi Feature POS at ₹250/Monthly?
                How is this Possible?
              </Typography>
              <Typography paragraph textAlign={"center"}>
                We Belive in Transparency and Minimalism
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={12} sm={4} sx={{ display:"flex", justifyContent:"center", alignItems:"center" }}>
            <Box
              sx={{
                display: "flex",
                position: "relative",
                width: "100%",
                height: "20rem",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img
                src={"https://posphilly.com/wp-content/uploads/2022/11/Screenshot_2022-11-07_at_11-25-01_spoton_pos_-_Google_Search-removebg-preview1.png"}
                alt="POS Logo"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                }}
              />
            </Box>
          </Grid>
        </Grid>
        <Grid container py={5} gap={2}>
          <Grid item xs={12} sx={{ ...flexBox() }}>
            <Box
              sx={{
                display: "flex",
                position: "relative",
                width: "100%",
                height: "5rem",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography>
                Created By two Friends who are passionate about 
              </Typography>
              <Typography>
                Technology and Business
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sx={{ ...flexBox("column") }} gap={2}>
            Meet
            <Stack gap={2} sx={{
              flexDirection:{
                xs:"column",
                sm:"row"
              },
              justifyContent:"center",
              alignItems:"center",
            }}>

            <Typography variant="h3" component={"div"} textAlign={"center"} gap={2} sx={{
              display:"flex",
              justifyContent:"center",
              alignItems:"center",
              border:"1px solid #D3D3D3",
              padding:"1rem",
              borderRadius:"1rem",
            }}>
              <Link href={"https://www.linkedin.com/in/omaduragkar/"}>
                <img src={"https://store-images.s-microsoft.com/image/apps.31120.9007199266245564.44dc7699-748d-4c34-ba5e-d04eb48f7960.bc4172bd-63f0-455a-9acd-5457f44e4473"} alt={"LinkedIn"} style={{
                  width:"2rem",
                  height:"2rem",
                }} />
              </Link>
                Om Duragkar
            </Typography>
            <Typography variant="h3" component={"div"} textAlign={"center"} gap={2} sx={{
              display:"flex",
              justifyContent:"center",
              alignItems:"center",
              border:"1px solid #D3D3D3",
              padding:"1rem",
              borderRadius:"1rem",
            }}>
              <Link href={"https://www.linkedin.com/in/shashank-shetty03/"}>
                <img src={"https://store-images.s-microsoft.com/image/apps.31120.9007199266245564.44dc7699-748d-4c34-ba5e-d04eb48f7960.bc4172bd-63f0-455a-9acd-5457f44e4473"} alt={"LinkedIn"} style={{
                  width:"2rem",
                  height:"2rem",
                }} />
              </Link>
              Shashank Shetty
            </Typography>
          </Stack>
          </Grid>
        </Grid>
        <Typography
          paragraph
          textAlign={"center"}
          variant="h5"
          component={"div"}
          pt={5}
          pb={15}
        >
          Contact Support Now:{" "}
          <Link href={"tel:8766968741"}>8766968741</Link>
          {" "} Help Line
        </Typography>
        <Paper variant="outlined" sx={{
          p: 2
        }}>
          <Stack direction={{
            xs: "column",
            sm: "row"
          }} justifyContent={"space-between"} alignItems={"center"} gap={2} pb={5}>
            <Stack>
              <Typography textAlign={"center"}><Link href="/">etopos.tech</Link> ©2023</Typography>
              <Typography textAlign={"center"}>All Rights Reserved</Typography>
            </Stack>
            <Stack direction={"row"} gap={2}>
              <Link href={"https://in.linkedin.com/company/kuponzrestro"}>
                <LinkedIn color="primary" />
              </Link>
              <Instagram color="primary" />
              <Google color="primary" />
              <Facebook color="primary" />
            </Stack>
          </Stack>
        </Paper>
      </Box>
    </Box>
  );
}
