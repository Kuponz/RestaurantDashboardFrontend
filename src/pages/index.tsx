import Head from "next/head";
import { Waiter } from "modules/waiter";

export default function Home() {
  return (
    <>
      <Head>
        <title>Kuponz</title>
        <meta
          name="description"
          content="India's first paperless and Innovative POS with minimum investments and Maximum returns"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        {/* Auth Stuff Here */}
        <Waiter />
      </div>
    </>
  );
}
