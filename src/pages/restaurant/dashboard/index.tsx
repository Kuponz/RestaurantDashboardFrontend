import Head from "next/head";
import { Waiter } from "modules/table";
import HomeStructure from "modules/home/HomeStructure";
import EastOutlinedIcon from '@mui/icons-material/EastOutlined';
import { Button, Stack, Typography } from "@mui/material";
import { flexBox } from "theme/defaultFunction";
import { useRouter } from "next/router";
import Sales from "modules/dashboard/Sales";

export default function Dashboard() {
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
        <Sales />
      </div>
    </>
  );
}
