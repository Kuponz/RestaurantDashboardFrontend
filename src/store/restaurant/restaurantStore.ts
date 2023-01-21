import create from 'zustand';

import { devtools, persist } from "zustand/middleware"

const restaurantStore = (set:any)=>({
    restaurant:{
        floors:[],
        categories:[],
        
    },
    setFloors:(data:any)=>set((state:any)=>({
        restaurant:{
            ...state.restaurant,
            floors:[...data]
        }
    })),
    setCategories:(data:any)=>set((state:any)=>({
        restaurant:{
            ...state.restaurant,
            categories:[...data]
        }
    })),
})

export const userestaurantStore = create(devtools(persist(restaurantStore,{
    name:"restaurantData"
})));
