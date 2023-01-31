import Head from "next/head";
import { Waiter } from "modules/table";
import HomeStructure from "modules/home/HomeStructure";
import EastOutlinedIcon from "@mui/icons-material/EastOutlined";
import { Button, Paper, Stack, Typography, Grid } from "@mui/material";
import { flexBox } from "theme/defaultFunction";
import { useRouter } from "next/router";
import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";
import EditIcon from "@mui/icons-material/Edit";

const MenuCard = () => {
  return (
    <Paper
      // elevation={0}
      variant="free"
      sx={{
        p: 2,
        minWidth: "clamp(15rem,80vw,30rem)",
        minHeight: "10rem",
        display: "grid",
        position: "relative",
      }}
    >
      <Stack direction="row" justifyContent="center" alignItems="center">
        <Typography variant="h3" fontWeight={800} color="white">
          Menu Name
        </Typography>
      </Stack>
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        position={"absolute"}
        sx={{ top: "-10px", right: "-10px" }}
        gap={2}
      >
        <IconButton>
          <EditIcon />
        </IconButton>
        <IconButton>
          <ClearIcon />
        </IconButton>
      </Stack>
    </Paper>
  );
};

export default function managemenu() {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>etoPOS</title>
        <meta
          name="description"
          content="India's first paperless and Innovative POS with minimum investments and Maximum returns"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        {/* Auth Stuff Here */}
        {/* <Waiter /> */}
        <HomeStructure>
          <Grid
            container
            p={2}
            justifyContent="center"
            spacing={{ xs: 2, md: 3 }}
            gap={2}
            sx={{ overflowY: "scroll" }}
          >
            <MenuCard />
            <MenuCard />
            <MenuCard />
            <MenuCard />
            <MenuCard />
            <MenuCard />
          </Grid>
        </HomeStructure>
      </div>
    </>
  );
}
