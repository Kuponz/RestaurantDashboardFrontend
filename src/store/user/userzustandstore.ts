import create from 'zustand';

import { devtools, persist } from "zustand/middleware"

const userStore = (set:any)=>({
    user:{
        login:false,
    },
    setUser:(data:any)=>set((state:any)=>({
        user:{
            ...state.user,
            login:true,
            mobileNumber:data?.mobileNumber,
            name:data?.name,
            restaurantLinked:data?.restaurantLinked,
            role:data?.role,
            _id:data?._id,
            jwtToken:data?.jwtToken,
        }
    })),
    logout:()=>set(()=>({
        user:{
            login:false,
        }
    }))

})

export const useUserStore = create(devtools(persist(userStore,{
    name:"userData"
})));
