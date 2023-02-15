import create from "zustand";

import { devtools, persist } from "zustand/middleware";

const userStore = (set: any) => ({
  user: {
    login: false,
    mobileNumber: "",
    name: "",
    restaurantLinked: "",
    role: "",
    _id: "",
    jwtToken: "",
    access: [
      {
        title: "Home",
        icons: "HomeRoundedIcon",
        url: "/",
      },
      {
        title: "Book Table",
        icons: "TableRestaurantIcon",
        url: "/restaurant/table"

      },
      {
        title: "Current Orders",
        icons: "LocalMallIcon",
        url: "/restaurant/currentOrder"

      },
      {
        title: "Orders",
        icons: "ViewListIcon",
        url: "/restaurant/orders"

      },
      {
        title: "Dashboard",
        icons: "DashboardIcon",
        url: "/restaurant/dashboard/dashboard"
      },
      {
        title: "Inventory",
        icons: "InventoryIcon",
        url: "/restaurant/inventory"
      },
      {
        title: "Payments",
        icons: "AccountBalanceWalletIcon",
        url: "/restaurant/payments"
      },
      {
        title: "Attendance",
        icons: "CurrencyRupeeIcon",
        url: "/restaurant/attendance"
      },
      {
        title: "Manage Table",
        icons: "TableBarIcon",
        url: "/restaurant/manage/table"
      },
      {
        title: "Manage Menu",
        icons: "MenuBookIcon",
        url: "/restaurant/manage/menu"
      },
      {
        title: "Manage Users",
        icons: "PersonAddAltIcon",
        url: "/restaurant/manage/users"
      },
      {
        title: "Manage Customers",
        icons: "PeopleAltIcon",
        url: "/restaurant/manage/customers"
      },
      {
        title: "Recharge",
        icons: "PaymentsIcon",
        url: "/restaurant/manage/recharge"
      }
    ],
  },
  setUser: (data: any) =>
    set((state: any) => ({
      user: {
        ...state.user,
        login: data?.isLogin ?? true,
        mobileNumber: data?.mobileNumber,
        name: data?.name,
        restaurantLinked: data?.restaurantLinked,
        role: data?.role,
        _id: data?._id,
        jwtToken: data?.jwtToken,
      },
    })),
  logout: () =>
    set(() => ({
      user: {
        login: false,
      },
    })),
});

export const useUserStore = create(
  devtools(
    persist(userStore, {
      name: "userData",
    })
  )
);
