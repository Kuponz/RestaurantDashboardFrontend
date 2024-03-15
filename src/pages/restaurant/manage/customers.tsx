import Head from "next/head";
import { Waiter } from "modules/table";
import HomeStructure from "modules/home/HomeStructure";
import EastOutlinedIcon from '@mui/icons-material/EastOutlined';
import { Button, Stack, Typography } from "@mui/material";
import { flexBox } from "theme/defaultFunction";
import { useRouter } from "next/router";
import ManageCustomersHome from "modules/manageConsumer/ManageCustomersHome";
import { useUserStore } from "store/user/userzustandstore";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function manageCustomers() {
  const router = useRouter();
  const user = useUserStore((state) => state.user);
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
          <ToastContainer />
        {
          user.role == "OWNER"?
          <ManageCustomersHome/>  
          :
          <Stack>
            <Typography>Not Authorized</Typography>
          </Stack>
        }
        </HomeStructure>
      </div>
    </>
  );
}
