import React, { useCallback, useEffect, useState } from "react";
import BasicModal from "common/modalGenerator/Modal";
import { Stack, Paper, Typography, Button } from "@mui/material";
import table from "pages/restaurant/table/index";
import { userestaurantStore } from "store/restaurant/restaurantStore";
import FloorStructure from "modules/table/FloorStructure";
import FloorWiseTable from "modules/table/FloorWiseTable";
import { useMutation } from "@tanstack/react-query";
import { swapTable } from "store/api/axiosSetup";
import { useUserStore } from "store/user/userzustandstore";
import { flexBox } from "theme/defaultFunction";
import SwapVertIcon from "@mui/icons-material/SwapVert";

interface PropType {
  open: boolean;
  setOpen: any;
  data: any;
}

interface TableProps {
  restroDetails: any;
  infoSelected: any;
  setinfoSelected:React.Dispatch<React.SetStateAction<{
    table: string;
    floor: string;
    oldTableId: string;
    newTableId: string;
    headerAuth: string;
}>>;
}

const CustomTableStructure = ({ restroDetails, infoSelected,
  setinfoSelected }: TableProps) => {
  const [useData, setuseData] = useState([]);
  let floorData = useCallback(() => {
    if (infoSelected?.floor == "ALL") {
      return restroDetails;
    } else {
      return restroDetails?.filter(
        (resId: any) => resId._id == infoSelected.floor
      );
    }
  }, [infoSelected, restroDetails]);
  useEffect(() => {
    setuseData(floorData());
  }, [floorData]);
  {
    // console.log({ data: floorData() });
  }
  return (
    <>
      {useData.map((floorData, i) => {
        console.log(floorData);
        let newTables = floorData.tables.map(tableData=>{
          if(tableData?.status =="VACANT"){
              return (
                <Paper variant="outlined" key={i} sx={{
                  p:2
                }}
                onClick={()=>{
                  setinfoSelected(st=>({...st, newTableId:tableData?._id}))
                  console.log({infoSelected});
                }}
                >
                <Typography>{tableData?.TableName}</Typography>
              </Paper>
              )
          }
        })
        console.log(newTables)
        if(newTables && newTables.length > 0){
          return (
            <Stack key={i} sx={{...flexBox("row", "flex-start"), p:1}}>
              {newTables}
            </Stack>
          )
          
        }else{
          return (
            <Typography key={i}>No Table Exists!</Typography> 
          )

        }
      })}
    </>
  );
};

const KotModal = (props: PropType) => {
  const { open, setOpen, data } = props;
  const restroDetails = userestaurantStore((state) => state);
  const {isLoading, mutate} = useMutation(swapTable,{
    onSuccess:(data)=>{
      console.log(data)
    }
  })
  const user = useUserStore(state=>state.user);
  const [infoSelected, setinfoSelected] = useState({
    table: "",
    floor: "ALL",
    oldTableId:data.details.table?._id,
    newTableId:null,
    headerAuth:user.jwtToken,
    eOpen:false,
    eMessage:""
  });

  return (
    <>
      <BasicModal open={open} setOpen={setOpen} title="Swap Tables">
        <Stack alignItems={"center"} gap={2}>
          <Paper
            variant="free"
            sx={{
              minWidth: "20vw",
              display: "grid",
            }}
          >
            <Typography p={0.5} color={"white"} variant="body2">
              Current Table
            </Typography>
            <Typography p={1} variant="h5">
              {data.details.table.TableName}
            </Typography>
          </Paper>
        </Stack>
        <Stack>
        <SwapVertIcon/>
        </Stack>
        <Stack sx={{
          p:1
        }}>
          <FloorStructure
            infoSelected={infoSelected}
            setinfoSelected={setinfoSelected}
            restroDetails={restroDetails?.restaurant?.floors}
          />
          <CustomTableStructure
          infoSelected={infoSelected}
          setinfoSelected={setinfoSelected}
            restroDetails={restroDetails?.restaurant.floors}
          />
        </Stack>
        <Button disabled={isLoading} onClick={()=>{
          if(infoSelected.newTableId && infoSelected.oldTableId){
            mutate(infoSelected)
          }else{
            setinfoSelected({...infoSelected, eOpen:true, eMessage:"Missing Parameters"})
          }
        }}>Confirm</Button>
      </BasicModal>
    </>
  );
};

export default KotModal;
