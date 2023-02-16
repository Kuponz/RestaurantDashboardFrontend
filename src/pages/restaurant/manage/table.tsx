import Head from "next/head";
import React from "react";
import HomeStructure from "modules/home/HomeStructure";
import ManageTableHome from "../../../modules/manageTable/ManageTableHome";
import { useUserStore } from "store/user/userzustandstore";
import { Stack, Typography } from "@mui/material";

export default function createTable() {
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
        {
          user.role == "OWNER" ?
          <ManageTableHome/>
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
