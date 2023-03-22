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
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100%)` },
        }}
      >
        <Toolbar sx={{ ...flexBox("row", "space-between") }}>
          <Stack direction={"row"}>
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
              onClick={() => {
                router.push("/auth");
              }}
            >
              Login
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
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
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
          p: 3,
          width: { sm: `calc(100%)` },
          height: `100vh`,
          overflowY: "auto",
        }}
      >
        <Toolbar />
        <Grid container py={5} gap={2}>
          <Grid item xs={12} sm={5} sx={{ ...flexBox() }}>
            <Box
              sx={{
                position: "relative",
                width: "15rem",
                height: "15rem",
              }}
            >
              <Image
                src="/pos.png"
                layout="fill"
                objectFit="contain"
                alt="POS Logo"
              />
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} sx={{ ...flexBox("column") }} gap={2}>
            <Typography variant="h3" component={"div"}>
              Introducing etoPOS
            </Typography>
            <Typography paragraph textAlign={"center"}>
              A Powerful yet Simple POS for all your daily Business Need to keep
              your focus towards Customer
            </Typography>
          </Grid>
        </Grid>
        <Grid container py={5} gap={2}>
          <Grid item xs={12} sm={5} sx={{ ...flexBox("column") }} gap={2}>
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
          <Grid item xs={12} sm={6} sx={{ ...flexBox() }}>
            <Box
              sx={{
                position: "relative",
                width: "15rem",
                height: "15rem",
              }}
            >
              <Image
                src="https://www.svgrepo.com/show/255050/shopping-cart-online-store.svg"
                layout="fill"
                objectFit="contain"
                alt="POS Logo"
              />
            </Box>
          </Grid>
        </Grid>
        <Typography
          paragraph
          textAlign={"center"}
          variant="h5"
          component={"div"}
          pb={15}
        >
          Contact Support Now:{" "}
          <Link href={"tel:8766968741"}>8766968741</Link>
          {" "} Help Line
        </Typography>
        <Paper variant="outlined" sx={{
          p:2
        }}>
          <Stack direction={{
            xs:"column",
            sm:"row"
          }} justifyContent={"space-between"} alignItems={"center"} gap={2}>
            <Stack>
              <Typography textAlign={"center"}><Link href="/">etopos.tech</Link> ©2023</Typography>
              <Typography textAlign={"center"}>All Rights Reserved</Typography>
            </Stack>
            <Stack direction={"row"} gap={2}>
              <LinkedIn color="primary"/>
              <Instagram color="primary"/>
              <Google color="primary"/>
              <Facebook color="primary"/>
            </Stack>
          </Stack>
        </Paper>
      </Box>
    </Box>
  );
}
