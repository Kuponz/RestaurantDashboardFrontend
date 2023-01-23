import create from 'zustand';

import { devtools, persist } from "zustand/middleware"

const orderStore = (set:any)=>({
    order:{
        details:{

        },
        incomingOrders:[],
        completedOrders:[]
    },
    setOrder:(data:any)=>set((state:any)=>({
        order:{
            ...state.restaurant,
            details:data
        }
    })),
    setIncomingOrder:(data:any)=>set((state:any)=>({
        order:{
            ...state.restaurant,
            incomingOrders:data
        }
    })),
    setCompletedOrder:(data:any)=>set((state:any)=>({
        order:{
            ...state.restaurant,
            completedOrders:data
        }
    })),
})

export const useorderStore = create(devtools(persist(orderStore,{
    name:"orderData"
})));
