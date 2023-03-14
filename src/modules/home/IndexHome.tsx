import * as React from 'react';
import ViewListIcon from '@mui/icons-material/ViewList';
import TableRestaurantIcon from '@mui/icons-material/TableRestaurant';
import InventoryIcon from '@mui/icons-material/Inventory';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import TableBarIcon from '@mui/icons-material/TableBar';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import PrintIcon from '@mui/icons-material/Print';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import PaymentsIcon from '@mui/icons-material/Payments';
import { Stack } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import CardFeatue from './CardFeatue';
import { useRouter } from 'next/router';
import { useUserStore } from 'store/user/userzustandstore';

const IndexHome = () => {
    const router = useRouter();
    const JSONHome = [
        {
            title:"Home",
            icons:<HomeRoundedIcon/>,
            url:"/",
            acess:["OWNER", "CAPTAIN", "WAITER"]
        },
        {
            title:"Book Table",
            icons:<TableRestaurantIcon/>,
            url:"/restaurant/table",
            acess:["OWNER", "CAPTAIN", "WAITER"]

        },
        {
            title: "Current Orders",
            icons:<LocalMallIcon/>,
            url:"/restaurant/currentOrder",
            acess:["OWNER", "CAPTAIN", "CHEF"]

        },
        {
            title: "Orders",
            icons:<ViewListIcon/>,
            url:"/restaurant/orders",
            acess:["OWNER", "CAPTAIN"]

        },
        {
            title:"Dashboard",
            icons:<DashboardIcon/>,
            url:"/restaurant/dashboard",
            acess:["OWNER"]
        },
        {
            title:"Inventory(Coming Soon)",
            icons:<InventoryIcon/>,
            url:"/restaurant/inventory",
            acess:["OWNER", "CAPTAIN", "CHEF"]
        },
        {
            title:"Printer Settings",
            icons:<PrintIcon/>,
            url:"/restaurant/print",
            acess:["OWNER", "CAPTAIN"]
        },
        {
            title:"Attendance(Coming Soon)",
            icons:<CurrencyRupeeIcon/>,
            url:"/restaurant/attendance",
            acess:["OWNER", "CAPTAIN"]
        },
        {
            title:"Manage Table",
            icons:<TableBarIcon/>,
            url:"/restaurant/manage/table",
            acess:["OWNER", "CAPTAIN"]
        },
        {
            title:"Manage Menu",
            icons:<MenuBookIcon/>,
            url:"/restaurant/manage/menu",
            acess:["OWNER", "CAPTAIN"]
        },
        {
            title:"Manage Users",
            icons:<PersonAddAltIcon/>,
            url:"/restaurant/manage/users",
            acess:["OWNER"]
        },
        {
            title:"Manage Customers",
            icons:<PeopleAltIcon/>,
            url:"/restaurant/manage/customers",
            acess:["OWNER", "CAPTAIN"]
        },
        {
            title:"Recharge",
            icons:<PaymentsIcon/>,
            url:"/restaurant/manage/recharge",
            acess:["OWNER", "CAPTAIN"]
        }
    ]
    const user = useUserStore(state=>state.user);
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
                JSONHome.map((home, index) => (home.acess.includes(user.role) && <CardFeatue key={index} homeInfo={home} router={router} />))
            }
        </Stack>
    )
}

export default IndexHome