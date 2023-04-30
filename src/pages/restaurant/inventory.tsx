import Head from "next/head";
import { Waiter } from "modules/table";
import HomeStructure from "modules/home/HomeStructure";
import EastOutlinedIcon from '@mui/icons-material/EastOutlined';
import { Button, Stack, Typography } from "@mui/material";
import { flexBox } from "theme/defaultFunction";
import { useRouter } from "next/router";
import TopBar from "common/topBar/TopBar";
import TopBarInventory from "./inventoryy/TopBarInventory";
export default function inventory() {
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
          {/* <Typography variant="h2">Stay Tuned</Typography>
          <Typography variant="body2">Construction in Progress!</Typography>
          <Stack direction={"column"} sx={{
              py:5,

          }}>
              <Typography pb={3}>Payments isn't out yet but Table ordering is!! Book Table: </Typography>
              <Button variant={"outlined"} onClick={()=>{
                  router.push("/restaurant/table")
              }} sx={{...flexBox(), gap:1}}>Book Tables <EastOutlinedIcon/></Button>
          </Stack> */}
          {/* <Stack direction={"row"}>
            <TopBar home={true} backUrl={"/"} >
              <Stack
                direction={{ xs: "column", md: "row" }}
                alignItems={"flex-start"}
                style={{ flex: 1 }}
                sx={{ paddingInline: "1rem" }}
                gap={2}
              >
                <Stack direction={"row"} gap={2}>
                  <Button variant='outlined' >Add Expenses</Button>
                  <Button variant='outlined' >Add Invdfdentory</Button> */}
          {/* // ! More Intuitive Design Seems to be able to add floor from menu not here */}

          {/* </Stack>
              </Stack>
            </TopBar>
          </Stack> */}
          {/* <Inventortyy />  */}
          <TopBarInventory />

        </HomeStructure>
      </div >
    </>
  );
}
