
import { Button, Paper, Typography, CircularProgress, Box, Stack, ToggleButtonGroup, ToggleButton, IconButton } from '@mui/material'
import React, { useEffect, useState } from 'react'
import FiltersSales from './FiltersSales';
import { userestaurantStore } from 'store/restaurant/restaurantStore';
import { useUserStore } from 'store/user/userzustandstore';
import { useMutation } from '@tanstack/react-query';
import { getorderHistory } from 'store/api/axiosSetup';
import dayjs from 'dayjs';
import TopBar from 'common/topBar/TopBar';
import SalesBox from './SalesBox';
import Payment from './Payment';
import HomeStructure from 'modules/home/HomeStructure';
import { tokens } from "theme/theme";


type Tfilter = {
    startDate: dayjs.Dayjs;
    endDate: dayjs.Dayjs;
    restaurantId: string;
    pageNumber: number;
    pageSize: number;
    headerAuth: string;
    pageCounts: number;
};
const Sales = () => {
    const [open, setOpen] = useState(false);
    const restaurant = userestaurantStore(state => state.restaurant);
    const user = useUserStore(state => state.user);
    const [orders, setOrder] = useState([]);
    const [value, setValue] = React.useState<Tfilter>({
        startDate: dayjs(),
        endDate: dayjs(),
        restaurantId: restaurant.restaurantInfo._id,
        pageNumber: 1,
        pageSize: 25,
        headerAuth: user.jwtToken,
        pageCounts: 1,
    });
    const [watchOrder, setWatchOrder] = useState({});
    const { mutate, isLoading } = useMutation(getorderHistory, {
        onSuccess: (state) => {
            console.log(state.data.data);
            setValue({ ...value, pageCounts: state?.data?.data?.totalPages });
            setOrder(state.data.data.orders);
        }
    })

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
                    <TopBar backUrl={"/"} home={true} title={
                        <ToggleButtonGroup
                            color="primary"
                            aria-label="Platform"
                        >
                            <ToggleButton value="TodaysSales">
                                Todays Sales
                            </ToggleButton>
                            <ToggleButton value="WeeklySales">
                                7 days Sales
                            </ToggleButton>
                            <ToggleButton value="MonthlySales">
                                Monthly Sales
                            </ToggleButton>

                        </ToggleButtonGroup>
                    }>
                        <FiltersSales mutate={mutate} isLoading={isLoading} restaurant={restaurant} user={user} setValue={setValue} value={value} />
                    </TopBar>
                    <Stack sx={{ overflow: 'scroll' }}>
                        <Stack
                            sx={{

                                p: 1,
                                pb: 3,
                                pt: 5,

                                flexDirection: "row",
                                flexWrap: "wrap",
                                justifyContent: "flex-start",
                                gap: 1,
                            }}
                        >
                            <SalesBox title="Todays Order" orders="32,456,122.90" />
                            <SalesBox title="Completed Order" orders="25,456,122.90" />
                            <SalesBox title="Cancelled Order" orders="6,122.90" />
                        </Stack>
                        <Stack
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
                        </Stack>
                    </Stack>
                </Stack>
            </HomeStructure>
        </>
    )
}
export default Sales;