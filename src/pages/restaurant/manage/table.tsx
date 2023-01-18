import Head from "next/head";
import { Waiter } from "modules/waiter";
import HomeStructure from "modules/home/HomeStructure";
import EastOutlinedIcon from '@mui/icons-material/EastOutlined';
import { Button, Stack, Typography } from "@mui/material";
import { flexBox } from "theme/defaultFunction";
import { useRouter } from "next/router";

export default function createTable() {
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
        <Typography variant="h2">Stay Tuned</Typography>
          <Typography variant="body2">Construction in Progress!</Typography>
          <Stack direction={"column"} sx={{
              py:5,

          }}>
              <Typography pb={3}>Payments isn't out yet but Table ordering is!! Book Table: </Typography>
              <Button variant={"outlined"} onClick={()=>{
                  router.push("/restaurant/table")
              }} sx={{...flexBox(), gap:1}}>Book Tables <EastOutlinedIcon/></Button>
          </Stack>

        </HomeStructure>
      </div>
    </>
  );
}
