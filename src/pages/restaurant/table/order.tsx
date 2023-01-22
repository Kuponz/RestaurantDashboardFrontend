import { Button, Stack, Toolbar, Typography } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import HomeStructure from 'modules/home/HomeStructure'
import Orders from 'modules/orders/Orders'
import SumValue from 'modules/orders/SumValue'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
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
  return (
    <HomeStructure>
        <Stack sx={{
            p:{
                md:2
            },
            ...size("100%", "100%"),
            overflow:"hidden"
        }}>
            <Stack sx={{
                width:"100%"
            }}>
                <Typography textAlign={"center"} variant="h3">Order</Typography>
            </Stack>
            <Stack sx={{
                flexDirection:{
                    xs:"column",
                    md:"row-reverse"
                },
                width:"100%",
                height:"100%",
                overflow:"hidden"
            }}>
                <Stack sx={{
                    width:{
                        xs:"100%",
                        md:"45%"
                    },
                    overflow:"hidden",
                    p:{
                        md:2,
                        lg:2
                    }
                }}>
                   
                    <Stack direction={{
                        xs:"row",
                        md:"column"
                    }} gap={{
                        xs:1,
                    }}>
                        <Button variant={"text"}>Update Order</Button>
                        <Button variant={"text"}>Generate Bill</Button>
                        <Button variant={"text"}>Print Bill</Button>
                        <Button variant={"text"}>Cancel</Button>
                    </Stack>
                    <SumValue order={order} />
                </Stack>
                <Stack sx={{
                    height:{
                        xs:"30vh",
                        md:"100%"
                    },
                    width:"100%",
                    flex:1,
                    overflowY:"auto",
                    p:2
                }}>
                    <Orders order={order}/>
                </Stack>
                
            </Stack>
        </Stack>
    </HomeStructure>
  )
}

export default Order