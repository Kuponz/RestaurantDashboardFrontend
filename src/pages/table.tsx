import { Waiter } from 'modules/table'
import Head from 'next/head'
import { useRouter } from 'next/router';
import React, { useEffect } from 'react'
import { useUserStore } from 'store/user/userzustandstore';

const table = () => {
  const router = useRouter();
  const userState = useUserStore(state=>state.user);
  useEffect(() => {
    if(!userState?.login){
      router.push("/auth")
    }
  }, [router, userState?.login])
  return (
    <>
      <Head>
        <title>Table Booking</title>
        <meta
          name="description"
          content="Make Table Booking A way Faster with our Innovative Approach at etoPOS"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        {/* Auth Stuff Here */}
        {/* <Waiter /> */}
        <Waiter/>
      </div>
    </>
  )
}

export default table