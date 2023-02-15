import * as React from 'react';
import ViewListIcon from '@mui/icons-material/ViewList';
import TableRestaurantIcon from '@mui/icons-material/TableRestaurant';
import InventoryIcon from '@mui/icons-material/Inventory';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import TableBarIcon from '@mui/icons-material/TableBar';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import PaymentsIcon from '@mui/icons-material/Payments';
import { Stack } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import CardFeatue from './CardFeatue';
import { useRouter } from 'next/router';

const IndexHome = () => {
    const router = useRouter();
    const JSONHome = [
        {
            title: "Home",
            icons: <HomeRoundedIcon />,
            url: "/"
        },
        {
            title: "Book Table",
            icons: <TableRestaurantIcon />,
            url: "/restaurant/table"

        },
        {
            title: "Current Orders",
            icons: <LocalMallIcon />,
            url: "/restaurant/currentOrder"

        },
        {
            title: "Orders",
            icons: <ViewListIcon />,
            url: "/restaurant/orders"

        },
        {
            title: "Dashboard",
            icons: <DashboardIcon />,
            url: "/restaurant/dashboard/dashboard"
        },
        {
            title: "Inventory",
            icons: <InventoryIcon />,
            url: "/restaurant/inventory"
        },
        {
            title: "Payments",
            icons: <AccountBalanceWalletIcon />,
            url: "/restaurant/payments"
        },
        {
            title: "Attendance",
            icons: <CurrencyRupeeIcon />,
            url: "/restaurant/attendance"
        },
        {
            title: "Manage Table",
            icons: <TableBarIcon />,
            url: "/restaurant/manage/table"
        },
        {
            title: "Manage Menu",
            icons: <MenuBookIcon />,
            url: "/restaurant/manage/menu"
        },
        {
            title: "Manage Users",
            icons: <PersonAddAltIcon />,
            url: "/restaurant/manage/users"
        },
        {
            title: "Manage Customers",
            icons: <PeopleAltIcon />,
            url: "/restaurant/manage/customers"
        },
        {
            title: "Recharge",
            icons: <PaymentsIcon />,
            url: "/restaurant/manage/recharge"
        }


    ]
    return (
        <Stack sx={{
            flexDirection: {
                xs: "column",
                md: "row",
            },
            flexWrap: "wrap",
            width: {
                xs: "100%"
            }
        }}>
            {
                JSONHome.map((home, index) => (
                    <CardFeatue key={index} homeInfo={home} router={router} />

                ))
            }
        </Stack>
    )
}

export default IndexHome