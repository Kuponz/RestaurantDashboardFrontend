import { Button, Stack, ToggleButton, ToggleButtonGroup } from "@mui/material";
import TopBar from "common/topBar/TopBar";
import React, { useState } from "react";
import { flexBox } from "theme/defaultFunction";
import BillInputPrint from "./BillInputPrint";
import EditIcon from '@mui/icons-material/Edit';
import { useMutation, useQuery } from "@tanstack/react-query";
import { userestaurantStore } from "store/restaurant/restaurantStore";
import { getPrintByRestaurant, savePrintByRestaurant } from "store/api/axiosSetup";
import { useUserStore } from "store/user/userzustandstore";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
const PrintHome = () => {
  // const [alignment, setAlignment] = useState("BILL");
  const [_, forceUpdate] = React.useReducer((x) => x + 1, 0);
  const [printData, setprintData] = useState(()=>{
    return ({
      isEdit:false,
      value:{
        kot:{},
        billing:{}
      },
      type:"billing"
    })
  })
  const restroDetails = userestaurantStore(state=>state.restaurant)
  const setRestaurantDetails = userestaurantStore(state=>state.setRestaurantDetails)
  const userDetails = useUserStore(state=>state.user);
  const { isLoading, isError, data, error } = useQuery(
    {
      queryKey:['getPrintByRestaurant'], 
      enabled: !!restroDetails,
      refetchOnWindowFocus:false,
      queryFn:()=>getPrintByRestaurant({
        restaurantId:restroDetails?.restaurantInfo?._id,
        headerAuth:userDetails?.jwtToken
      }),
      onSuccess:(data)=>{
          console.log({data:data?.data?.data?.restaurantData})
          console.log({userDetails})
          setprintData({...printData, value:data?.data?.data?.restaurantData?.print})
          setRestaurantDetails(data?.data?.data?.restaurantData)
          
        // setOrder(data?.data?.data?.orderInfo)
      }
  })

  const saveMutate = useMutation(savePrintByRestaurant,{
    onSuccess:(data)=>{
      console.log({data});
      setprintData({...printData, value:data?.data?.data?.restaurantData?.print, isEdit:!printData?.isEdit})
    }
  })
  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    if (newAlignment !== null) {
      setprintData({...printData, type:newAlignment});
    }
  };

  // <Stack sx={{backgroundColor:"black", width:"100%", height:"100%", border:"14px solid green", p:2}}>
  return (
    <Stack sx={{ width: "100%", height: "88%", p: 2 }}>
      <TopBar home={true} backUrl={"/"} title={"Printer"}>
      <Stack sx={{
        ...flexBox("row", "space-between"),
        gap:2,
        py:2
      }}>
        <ToggleButtonGroup
          disabled = {isLoading || saveMutate?.isLoading}
          color="primary"
          value={printData?.type}
          exclusive
          onChange={handleChange}
          aria-label="Platform"
        >
          <ToggleButton value="kot">KOT</ToggleButton>
          <ToggleButton value="billing">Billing</ToggleButton>
        </ToggleButtonGroup>
        {printData.isEdit?
          <Button disabled={isLoading || saveMutate?.isLoading} startIcon={<CheckCircleIcon/>} variant={"outlined"} sx={{}} onClick={()=>{
          saveMutate.mutate({
            headerAuth:userDetails?.jwtToken,
            printData,
            restaurantId:restroDetails?.restaurantInfo?._id
          })
          
          }}>Save</Button>

        :
          <Button disabled={isLoading || saveMutate?.isLoading} startIcon={<EditIcon/>} variant={"outlined"} sx={{}} onClick={()=>{
          setprintData({...printData, isEdit:!printData?.isEdit});
          }}>Edit</Button>
        }
      </Stack>
      </TopBar>
      
      <Stack py={2} sx={{
        py:2,
        overflowY:"auto",
        height:"100%"
      }}>
        <BillInputPrint isLoading={isLoading || saveMutate?.isLoading} forceUpdate={forceUpdate} printData={printData} setprintData={setprintData}/>
      </Stack>
    </Stack>
  );
};

export default PrintHome;
