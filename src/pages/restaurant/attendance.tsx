import Head from "next/head";
import HomeStructure from "modules/home/HomeStructure";
import { Button, Stack, Toolbar, Typography } from "@mui/material";
import { flexBox, size } from "theme/defaultFunction";
import { useRouter } from "next/router";
import Display from "modules/menu/Display";
import Checkout from "modules/checkoout/Checkout";
import EastOutlinedIcon from '@mui/icons-material/EastOutlined';

export default function attendance() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
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
