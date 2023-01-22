import Checkout from 'modules/checkoout/Checkout'
import React, { useState } from 'react'
import Display from './Display'
import { CircularProgress, Stack } from '@mui/material'
import { flexBox, size } from 'theme/defaultFunction'
import MobileCheckout from 'modules/checkoout/MobileCheckout'
import { userestaurantStore } from 'store/restaurant/restaurantStore'
import { useUserStore } from 'store/user/userzustandstore'
import { useQuery } from '@tanstack/react-query'
import { getMenu } from 'store/api/axiosSetup'
import { SUBRESOURCE_INTEGRITY_MANIFEST } from 'next/dist/shared/lib/constants'
import { useRouter } from 'next/router'

const MainMenu = () => {
    const [menuInfo, setmenuInfo] = useState({
      categories:[],
      search:"" 
    });
    const [val, setValue] = useState([]);
    const router = useRouter();
    const { table } = router.query;
    const userDetails = useUserStore(state=>state.user);
    const { isLoading, isError, data, error } = useQuery(
      {
        queryKey:['getCategoryMenu'], 
        queryFn:()=>getMenu(userDetails?.restaurantLinked),
        onSuccess:(data)=>{
            console.log({data:data?.data?.data?.category})
            setmenuInfo({
                ...menuInfo,
                categories:data?.data?.data?.category
            })

        }
    })
    if(isLoading){
        return (
            <Stack sx={{...flexBox(), ...size("100%", "100%")}}>
                <CircularProgress />
            </Stack>
        )
    }

    const variableip = (items, status, ipdata=0)=>{
        let newVal = val.filter((order)=>{
            if(order.item._id == items._id)
            {
                if(status == "+"){
                    order.quantity += 1;
                    return true;
                }else if(status == "-"){
                    order.quantity -= 1;
                    if(order.quantity <=0){
                        return false;
                    }else{
                        return true;
                    }

                }else{
                    if(ipdata <= 0){
                        return false;
                    }else{
                        order.quantity = ipdata
                        return true;
                    }
                }
            }
            return order;
        })
        // console.log(newVal);
        setValue([...newVal])
    }
    console.log({
      isLoading, isError, data:data?.data?.data, error, menuInfo
    })
  return (
  <>
    <Display val={val} setValue={setValue} variableip={variableip} menuInfo={menuInfo} setmenuInfo={setmenuInfo}/>
        <Stack sx = {{
            ...size("100%", "30%"),
            display:{
            xs:"none",
            md:"flex"
            }
        }}>
            <Checkout tableId={table} val={val} setValue={setValue} variableip={variableip} />
        </Stack>
        <Stack sx={{
            display:{
            xs:"flex",
            md:"none"
            }
        }}>
            <MobileCheckout tableId={table} val={val} setValue={setValue} variableip={variableip} />
        </Stack>
  </>
  )
}

export default MainMenu