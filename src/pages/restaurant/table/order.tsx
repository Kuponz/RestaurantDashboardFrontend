import { Button, CircularProgress, Stack, Toolbar, Typography } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import HomeStructure from 'modules/home/HomeStructure'
import KotCheckout from 'modules/orders/kot/KotCheckout'
import EmptyBill from 'modules/orders/orders/EmptyBill'
import Orders from 'modules/orders/orders/Orders'
import SumValue from 'modules/orders/SumValue'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { getorderById } from 'store/api/axiosSetup'
import { useorderStore } from 'store/order/orderStore'
import { userestaurantStore } from 'store/restaurant/restaurantStore'
import { useUserStore } from 'store/user/userzustandstore'
import { size } from 'theme/defaultFunction'

const Order = () => {
    const router = useRouter();
  const [Selection, setSelection] = useState(true);
  const query  = router.query;
  const userDetails = useUserStore(state=>state.user);
  const restro = userestaurantStore(state=>state.restaurant);
  const {order, setOrder} = useorderStore(state=>state);
  console.log(query)
  const { isLoading, isError, data, error } = useQuery(
    {
      queryKey:['getRestaurantById'], 
      enabled: !!query?.orderId,
      queryFn:()=>getorderById(userDetails?.jwtToken, query?.orderId,restro?.restaurantInfo?._id),
      onSuccess:(data)=>{
          console.log({data:data?.data?.data?.orderInfo})
          console.log({userDetails,restro})
          //   setRestaurantDetails(data?.data?.data?.restaurantInfo)
          setOrder(data?.data?.data?.orderInfo)
        }
    })

    useEffect(()=>{
    
    if(order && order.details?.orderStatus  == "BILLING" && (order.details._id == query?.orderId) && order?.details?.table?._id) {
      console.log({order});
        router.push(`/restaurant/table/bill?tableId=${order?.details?.table?._id}&orderId=${order.details._id}`);
    } 
    },[order, router, query?.orderId])

  if(isLoading){
    return (
        <Stack sx={{
            height:"100vh",
            width:"100vw",
            justifyContent:"center",
            alignItems:"center"
        }}>
            <CircularProgress/>
        </Stack>
    )
  }

  return (
    <HomeStructure>
        <Stack sx={{
            p:{
                md:2
            },
            ...size("100%", "100%"),
            overflow:"hidden"
        }}>
            <KotCheckout order={order}/>
        </Stack>
    </HomeStructure>
  )
}

export default Order