import Head from "next/head";
import HomeStructure from "modules/home/HomeStructure";
import ManageMenuHome from "modules/manageMenu/ManageMenuHome";




export default function managemenu() {
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
          <ManageMenuHome/>
        </HomeStructure>
      </div>
    </>
  );
}
