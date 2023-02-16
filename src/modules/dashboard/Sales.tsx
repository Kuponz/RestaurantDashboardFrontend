
import { Button, Paper, Typography, CircularProgress, Box, Stack, ToggleButtonGroup, ToggleButton, IconButton } from '@mui/material'
import React, { useEffect, useState } from 'react'
import FiltersSales from './FiltersSales';
import { userestaurantStore } from 'store/restaurant/restaurantStore';
import { useUserStore } from 'store/user/userzustandstore';
import { useMutation } from '@tanstack/react-query';
import { getdashboardHistory, getorderHistory } from 'store/api/axiosSetup';
import dayjs from 'dayjs';
import TopBar from 'common/topBar/TopBar';
import SalesBox from './SalesBox';
import Payment from './Payment';
import HomeStructure from 'modules/home/HomeStructure';
import { flexBox } from 'theme/defaultFunction';


type Tfilter = {
    startDate: dayjs.Dayjs;
    endDate: dayjs.Dayjs;
    restaurantId: string;
    headerAuth: string;
};
const Sales = () => {
    const [open, setOpen] = useState({
        work:false,
        forWork:""
    });
    const restaurant = userestaurantStore(state => state.restaurant);
    const user = useUserStore(state => state.user);
    const [orders, setOrder] = useState({});
    const [value, setValue] = React.useState<Tfilter>({
        startDate: dayjs(),
        endDate: dayjs(),
        restaurantId: restaurant.restaurantInfo._id,
        headerAuth: user.jwtToken,
    });
    const [watchOrder, setWatchOrder] = useState({});
    const { mutate, isLoading } = useMutation(getdashboardHistory, {
        onSuccess: (state) => {
            console.log(state.data.data);
            setValue({ ...value });
            setOrder(state.data.data);
        }
    })
    useEffect(()=>{
        mutate(value);
    },[])
    console.log({orders})
    return (
        <>
            <HomeStructure>
                <Stack sx={{
                    height: "100vh",
                    width: "100%",
                    pt: 4,
                    pr: 0,
                    pl: 0,
                }}>
                    <TopBar backUrl={"/"} home={true} title={""}>
                        <Stack sx={{
                            ...flexBox("row", "flex-end")
                        }}>
                            <ToggleButtonGroup
                                color="primary"
                                aria-label="Platform"
                            >
                                <ToggleButton value="TodaysSales">
                                    Today
                                </ToggleButton>
                                <ToggleButton value="WeeklySales">
                                    Weekly
                                </ToggleButton>
                                <ToggleButton value="MonthlySales">
                                    Monthly
                                </ToggleButton>

                            </ToggleButtonGroup>
                            <FiltersSales mutate={mutate} isLoading={isLoading} restaurant={restaurant} user={user} setValue={setValue} value={value} />

                        </Stack>
                    </TopBar>
                    <Stack sx={{ overflow: 'scroll' }}>
                        <Stack
                            sx={{

                                p: 1,
                                pb: 3,
                                pt: 5,

                                flexDirection: "row",
                                flexWrap: "wrap",
                                justifyContent: "space-around",
                                gap: 1,
                            }}
                        >
                            <SalesBox setOpen={setOpen} title="Total Earning" name={"totalPayment"} orders={orders?.totalPayment?.total} />
                            <SalesBox setOpen={setOpen} title="Total Completed Orders" name={"totalOrders"} orders={orders?.totalOrders?.completedOrders} />
                        </Stack>
                        {console.log({
                            open
                        })}
                        {open.work && <Stack
                            sx={{

                                p: 1,
                                pb: 3,
                                pt: 0,
                                flexDirection: "row",
                                flexWrap: "wrap",
                                justifyContent: "flex-start",
                                gap: 2,
                            }}
                        >
                            <Payment title="Cash Payment " payment="12,345,67.80" />
                            <Payment title="Debit Card " payment="21,46,67.80" />
                            <Payment title="Credit Card " payment="32,375,67.80" />
                        </Stack>}
                    </Stack>
                </Stack>
            </HomeStructure>
        </>
    )
}
export default Sales;