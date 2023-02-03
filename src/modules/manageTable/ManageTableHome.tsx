import { useRouter } from 'next/router';
import React, { useState } from 'react'
import { useMutation, useQuery } from "@tanstack/react-query";
import { useUserStore } from "store/user/userzustandstore";
import { getTables, createFloorAdmin, createTableAdmin } from "store/api/axiosSetup";
import { userestaurantStore } from "store/restaurant/restaurantStore";
import FloorStructure from "modules/table/FloorStructure";
import BasicModal from "../../common/modalGenerator/Modal";

import { Button, Stack } from '@mui/material';
import TopBar from '../../common/topBar/TopBar';
import CreateFloorModal from './CreateFloorModal';
import TableLayout from './tableLayout';
const ManageTableHome = () => {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [isFloor, setisFloor] = useState(false);
  
    const restroDetails = userestaurantStore((state) => state);
    const userDetails = useUserStore((state) => state.user);
  
    const [infoSelected, setinfoSelected] = useState({
      table: "",
      floor: "ALL",
    });
    const defaultVal={
      "TableName":{
        value:"",
        name:"TableName",
        title:"Table Name",
        type:"text"
      },
      "floorId": {
        value:"",
        name:"floorId",
        title:"floor On ",
        type:"select",
        options:
        restroDetails.restaurant.floors.map(floor=>({
          title: floor.floorName,
          value:floor._id
        }))
      },
      "tableCapacity": {
        value:0,
        name:"tableCapacity",
        title:"table Capacity",
        type:"text"
      }  ,
      "floorName": {
        value:"",
        name:"floorName",
        title:"floor Name",
        type:"text"
      }  
  }
    const [tableData, setTableData ] = useState(defaultVal)
    const { isLoading, isError, data, error } = useQuery({
      queryKey: ["getTable"],
      queryFn: () =>
        getTables(userDetails?.jwtToken, userDetails?.restaurantLinked),
      onSuccess: (data) => {
        restroDetails.setFloors(data?.data?.data);
      },
    });
    const tableClick = useMutation(createTableAdmin,{
      onSuccess:(data)=>{
        console.log(data?.data?.data);
        let newFloors = restroDetails.restaurant.floors.map(floor=>{
          if(
            floor._id == data?.data?.data.addTabletoFloor?._id
          )
          {
            return data?.data?.data.addTabletoFloor
          }else{
            return floor
          }
        })
        restroDetails.setFloors([...newFloors]);
        setOpen(false);
        setTableData(defaultVal)
      }
    })
    const floorClick = useMutation(createFloorAdmin,{
      onSuccess:(data)=>{
        console.log(data?.data?.data);
        restroDetails.setFloors([...restroDetails.restaurant.floors, data?.data?.data]);
        setOpen(false);
        setTableData(defaultVal)
      }
      
    })
    // Just Coppied it From Prev
    // TODO: Needs Work
  
    const handleFloor = () => {
      setisFloor(true);
      setOpen(true);
    };
    const handleTable = () => {
      setisFloor(false);
      setOpen(true);
    };
    const onClickHandler=()=>{
      console.log({tableData, res:restroDetails.restaurant.restaurantInfo._id})
      const req = isFloor?{
        floorName:tableData.floorName.value,
        restaurantId:restroDetails.restaurant.restaurantInfo._id,
      }:{
        restaurantId:restroDetails.restaurant.restaurantInfo._id,
        TableName:tableData.TableName.value,
        floorId:tableData.floorId.value,
        tableCapacity:tableData.tableCapacity.value
      };
      const headerAuth = userDetails?.jwtToken;
      if(isFloor){
        floorClick?.mutate({
          req,
          headerAuth
        })
      }else{
        tableClick?.mutate({
          req,
          headerAuth
        })
      }
    }
  return (
    <Stack minHeight={"100vh"} mt={"7rem"} width={"100%"}>
            <Stack direction={"row"}>
              <TopBar home={true} backUrl={"/"} />
              <Stack
                direction={{ xs: "column", md: "row" }}
                alignItems={"center"}
                style={{ flex: 1 }}
                sx={{ paddingInline: "1rem" }}
                gap={2}
              >
                <FloorStructure
                  infoSelected={infoSelected}
                  setinfoSelected={setinfoSelected}
                  restroDetails={restroDetails?.restaurant?.floors}
                />
                <Stack direction={"row"} gap={2}>
                  <Button variant='outlined' onClick={handleFloor}>Add Floor</Button>
                  <Button variant='outlined' onClick={handleTable}>Add Tables</Button>
                  {/* // ! More Intuitive Design Seems to be able to add floor from menu not here */}
                </Stack>
              </Stack>
            </Stack>

            <Stack
              sx={{
                height: "100%",
                width: "100%",
                overflowY: "auto",
                p: 2,
                pb: 15,
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "flex-start",
                gap: 2,
              }}
            >
              <TableLayout
                infoSelected={infoSelected}
                restroDetails={restroDetails?.restaurant?.floors}
              />
            </Stack>
            <BasicModal
          open={open}
          setOpen={setOpen}
          title={isFloor ? "Floor" : "Table"}
        >
          {/* TODO: Modal Remaining */}
          <CreateFloorModal isFloor={isFloor} floorClick={floorClick} tableClick = {tableClick} onClickHandler={onClickHandler} setisFloor={setisFloor} tableData={tableData} setTableData={setTableData}/>
        </BasicModal>
          </Stack>
  )
}

export default ManageTableHome