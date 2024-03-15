import { Alert, AlertTitle,  CircularProgress, Stack } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import HomeStructure from 'modules/home/HomeStructure'
import EmptyBill from 'modules/orders/orders/EmptyBill'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { getorderById } from 'store/api/axiosSetup'
import { useorderStore } from 'store/order/orderStore'
import { userestaurantStore } from 'store/restaurant/restaurantStore'
import { useUserStore } from 'store/user/userzustandstore'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Bill = () => {
    const router = useRouter();
  const query  = router.query;
  const userDetails = useUserStore(state=>state.user);
  const restro = userestaurantStore(state=>state.restaurant);
  const {order, setOrder} = useorderStore(state=>state);
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
    
    const orderDetails = order.details;
    if(orderDetails?.orderStatus  != "BILLING") {
        router.push(`/restaurant/table/order?orderId=${orderDetails._id}`);
    } 
    },[order.details, router])
  return (
    <HomeStructure>
        <ToastContainer/>
        { isLoading ? 
            <Stack sx={{
                height:"100vh",
                width:"100vw",
                justifyContent:"center",
                alignItems:"center"
            }}>
                <CircularProgress/>
            </Stack>
        :
            <Stack sx={{
                p:{
                    md:2
                },
                height:"100vh",
                width:"100%",
                overflow:"hidden"
            }}>
                {isError &&
                    <Alert severity="warning">
                    <AlertTitle>Warning</AlertTitle>
                    Error From Backend API — <strong>check it out!</strong>
                    </Alert>
                }
                {/* {order?.details?.orderStatus  != "BILLING"? */}
                <EmptyBill order={order} userDetails={userDetails}/>
                
            </Stack>
        }
    </HomeStructure>
  )
}

export default Bill