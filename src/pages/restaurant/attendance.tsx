import Head from "next/head";
import { Waiter } from "modules/table";
import HomeStructure from "modules/home/HomeStructure";
import EastOutlinedIcon from '@mui/icons-material/EastOutlined';
import { Button, Stack, Toolbar, Typography } from "@mui/material";
import { flexBox, size } from "theme/defaultFunction";
import { useRouter } from "next/router";
import Display from "modules/menu/Display";
import Checkout from "modules/checkoout/Checkout";

export default function attendance() {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>etoPOS</title>
        <meta
          name="description"
          content="India's first paperless and Innovative POS with monthly Subscription. So Pay when You Need!"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        {/* Auth Stuff Here */}
        {/* <Waiter /> */}
        <HomeStructure>
          {/* <Typography variant="body2">Construction in Progress!</Typography>
          <Stack direction={"column"} sx={{
              py:5,

          }}>
              <Typography pb={3}>Payments isn't out yet but Table ordering is!! Book Table: </Typography>
              <Button variant={"outlined"} onClick={()=>{
                  router.push("/restaurant/table")
              }} sx={{...flexBox(), gap:1}}>Book Tables <EastOutlinedIcon/></Button>
          </Stack> */}
          <Stack direction={{
            xs:"column",
            md:"row"
          }}
          sx={{
            height:"100%",
            width:"100%",
            p:2,
            overflow:"hidden"
          }}
          >
            <Display/>
            <Stack sx= {{
              ...size("100%", "30%"),
              display:{
                xs:"none",
                md:"flex"
              }
            }}>
              <Checkout/>
            </Stack>
          </Stack>

        </HomeStructure>
      </div>
    </>
  );
}
