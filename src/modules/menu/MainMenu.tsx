import Checkout from 'modules/checkoout/Checkout'
import React, { useState } from 'react'
import Display from './Display'
import { CircularProgress, Stack, Typography } from '@mui/material'
import { flexBox, size } from 'theme/defaultFunction'
import MobileCheckout from 'modules/checkoout/MobileCheckout'
import { useUserStore } from 'store/user/userzustandstore'
import { useQuery } from '@tanstack/react-query'
import { getMenu } from 'store/api/axiosSetup'
import { useRouter } from 'next/router'
import { useorderStore } from 'store/order/orderStore'

const MainMenu = () => {
    const [menuInfo, setmenuInfo] = useState({
        categories: [],
        search: ""
    });
    const [val, setValue] = useState([]);
    const [oldOrderId, setoldOrderId] = useState("");
    const router = useRouter();
    let { table, edit } = router.query;
    const userDetails = useUserStore(state => state.user);
    const setOrder = useorderStore(state => state.setOrder);
    const { isLoading, isError, data, error } = useQuery(
        {
            enabled: !!table,
            queryKey: ['getCategoryMenu'],
            queryFn: () => getMenu(table, userDetails?.restaurantLinked, edit),
            onSuccess: (data) => {
                console.log({ data: data?.data?.data })
                edit = edit == undefined ? false : true;
                if (data?.data?.data?.tableReserved && !edit) {
                    setOrder(data?.data?.data?.tableDetails?.orderId)
                    if (data?.data?.data?.tableDetails?.orderId?._id && data?.data?.data?.tableDetails?.status != "VACANT") {
                        router.push(`/restaurant/table/order?orderId=${data?.data?.data?.tableDetails?.orderId._id}`)
                    } else {
                        setmenuInfo({
                            ...menuInfo,
                            categories: data?.data?.data?.category
                        })
                    }
                } else {
                    setmenuInfo({
                        ...menuInfo,
                        categories: data?.data?.data?.category
                    })

                    let newOrder = data?.data?.data?.tableDetails?.orderId?.order.map(ori => {
                        ori.item = {...ori.menuId, selected:ori.selected};
                        return ori;
                    })
                    newOrder = newOrder.filter(newOr=>newOr.quantity != 0)
                    console.log({
                        newOrder,
                        vali:val.map(vall => {
                            let finalData = newOrder.find(oldo => oldo.item._id == vall.item._id)
                            return finalData
                        }),
                        len:val.map(vall => {
                            let finalData = newOrder.find(oldo => oldo.item._id == vall.item._id)
                            return finalData
                        }).length == 0
                    });

                    if (val.length == 0) {
                        setValue([...newOrder])
                    }else{
                        let newValo = val.map(vall => {
                            let finalData = newOrder.find(oldo => oldo.item._id == vall.item._id)
                            return finalData
                        })
                        setValue(newValo);
                    }
                    setoldOrderId(data?.data?.data?.tableDetails?.orderId?._id)
                    /*
                     */
                    // setValue(vall=>([...vall, ...data?.data?.data?.tableDetails?.orderId?.order]))
                }

            }
        })
    if (isLoading) {
        return (
            <Stack sx={{ ...flexBox(), ...size("100%", "100%") }}>
                <CircularProgress />
            </Stack>
        )
    }
    if (isError) {
        return (
            <Stack sx={{ ...flexBox(), ...size("100%", "100%") }}>
                <Typography>Error</Typography>
            </Stack>
        )
    }
    console.log({val})

    const variableip = (items, status, ipdata = 0) => {
        let newVal = val.filter((order) => {
            if (order.item._id == items._id) {
                if (status == "+") {
                    order.quantity += 1;
                    return true;
                } else if (status == "-") {
                    order.quantity -= 1;
                    if (order.quantity <= 0) {
                        return false;
                    } else {
                        return true;
                    }

                } else {
                    if (ipdata <= 0) {
                        return false;
                    } else {
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
        isLoading, isError, data: data?.data?.data, error, val
    })
    return (
        <>
            <Display val={val} setValue={setValue} variableip={variableip} menuInfo={menuInfo} setmenuInfo={setmenuInfo} />
            <Stack sx={{
                ...size("100%", "30%"),
                display: {
                    xs: "none",
                    md: "flex"
                }
            }}>
                <Checkout oldOrderId={oldOrderId} tableId={table} val={val} setValue={setValue} variableip={variableip} />
            </Stack>
            <Stack sx={{
                display: {
                    xs: "flex",
                    md: "none"
                }
            }}>
                <MobileCheckout oldOrderId={oldOrderId} tableId={table} val={val} setValue={setValue} variableip={variableip} />
            </Stack>
        </>
    )
}

export default MainMenu