import Head from "next/head";
// import { Waiter } from "modules/table";
import HomeStructure from "modules/home/HomeStructure";
import EastOutlinedIcon from "@mui/icons-material/EastOutlined";
import { Button, CircularProgress, Stack, Typography } from "@mui/material";
import { flexBox } from "theme/defaultFunction";
import { useRouter } from "next/router";
import { useUserStore } from "store/user/userzustandstore";
import dynamic from "next/dynamic";

const Waiter = dynamic(
  () => import("modules/table").then((mod) => mod.Waiter),
  { loading: () => <CircularProgress /> }
);

export default function table() {
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
          {user.role != "CHEF" ? (
            <Waiter />
          ) : (
            <Stack>
              <Typography>Not Authorized</Typography>
            </Stack>
          )}
        </HomeStructure>
      </div>
    </>
  );
}
