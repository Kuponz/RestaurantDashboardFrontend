import { Button, CircularProgress, Stack } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Filters from './Filters'
import OrderCards from './OrderCards'
import BasicModal from "../../common/modalGenerator/Modal";
import ModalCreator from './ModalCreator';
import { userestaurantStore } from 'store/restaurant/restaurantStore';
import { useUserStore } from 'store/user/userzustandstore';
import { useMutation } from '@tanstack/react-query';
import { getorderHistory } from 'store/api/axiosSetup';
import dayjs from 'dayjs';
import TopBar from 'common/topBar/TopBar';


type Tfilter = {
    startDate: dayjs.Dayjs;
    endDate: dayjs.Dayjs;
    restaurantId: string;
    pageNumber: number;
    pageSize: number;
    headerAuth:string;
    pageCounts:number;
  };
const OrderIndex = () => {
    const [open, setOpen] = useState(false);
    const restaurant = userestaurantStore(state=>state.restaurant);
    const user = useUserStore(state=>state.user);
    const [orders, setOrder] = useState([]);
    const [value, setValue] = React.useState<Tfilter>({
        startDate: dayjs(),
        endDate: dayjs(),
        restaurantId: restaurant.restaurantInfo._id,
        pageNumber: 1,
        pageSize: 25,
        headerAuth:user.jwtToken,
        pageCounts:1,
      });
    const [watchOrder, setWatchOrder] = useState({});
    const {mutate, isLoading } = useMutation(getorderHistory,{
        onSuccess:(state)=>{
            console.log(state.data.data);
            console.log(state.data.data.orders);
            setValue({...value, pageCounts:state?.data?.data?.totalPages});
            setOrder(state.data.data.orders);
        }
    })
    useEffect(()=>{
        mutate(value);
    },[])
  return (
    <Stack sx={{
        height:"100vh",
        width:"100%",
        overflow:"hidden",
        p:2,
    }}>
        <TopBar backUrl={"/"} home={true} title={`${orders.length ?? ""} orders`}>    
            <Filters mutate={mutate} isLoading={isLoading} restaurant={restaurant} user={user} setValue={setValue} value={value}/>  
        </TopBar>
        <Stack sx={{
            height:"100%",
            overflowY:"auto",
            gap:2,
            p:2,
            pt:3,
            pb:5,
            flexDirection:"row",
            flexWrap:"wrap",
        }}>
        {isLoading ?
        <><CircularProgress/></>
        :
            orders.map((order, index)=>(
                <OrderCards order={order} key={index} open={open} setOpen={setOpen} setWatchOrder={setWatchOrder}/>
            ))
            
        }
        </Stack>
        <BasicModal open={open} setOpen={setOpen} title={"Complete Order"}>
            <ModalCreator setWatchOrder={setWatchOrder} watchOrder={watchOrder} open={open} setOpen={setOpen}/>
        </BasicModal>
    </Stack>
  )
}

export default OrderIndex