import create from 'zustand';

import { devtools, persist } from "zustand/middleware"

const orderStore = (set:any)=>({
    order:{
        details:{

        }
    },
    setOrder:(data:any)=>set((state:any)=>({
        order:{
            ...state.restaurant,
            details:data
        }
    })),
})

export const useorderStore = create(devtools(persist(orderStore,{
    name:"orderData"
})));
