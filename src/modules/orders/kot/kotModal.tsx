import React, { useCallback, useEffect, useState } from "react";
import BasicModal from "common/modalGenerator/Modal";
import { Stack, Paper, Typography, Button, Divider, CircularProgress } from "@mui/material";
import table from "pages/restaurant/table/index";
import { userestaurantStore } from "store/restaurant/restaurantStore";
import FloorStructure from "modules/table/FloorStructure";
import FloorWiseTable from "modules/table/FloorWiseTable";
import { useMutation } from "@tanstack/react-query";
import { swapTable } from "store/api/axiosSetup";
import { useUserStore } from "store/user/userzustandstore";
import { flexBox } from "theme/defaultFunction";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import { useRouter } from "next/router";

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
        // console.log(floorData);
        let newTables = floorData.tables.map(tableData=>{
          if(tableData?.status =="VACANT"){
              return (
                <Paper variant={infoSelected.newTableId == tableData?._id?"free":"outlined"}
                elevation={infoSelected.newTableId == tableData?._id?5:1}
                 key={i} sx={{
                  p:2,
                  cursor:"pointer"
                }}
                onClick={()=>{
                  setinfoSelected(st=>({...st, newTableId:tableData?._id}))
                  console.log({infoSelected});
                }}
                >
                <Typography>{tableData?.TableName}</Typography>
              </Paper>
            )
          }else{
            return null;
          }
        })
        newTables = newTables.filter(val=>val);
        console.log(newTables)
        if(newTables && newTables?.length > 0){
          return (
            <Stack key={i} sx={{...flexBox("column", "flex-start"), p:1}}>
              <Divider>{floorData.floorName}</Divider>
              <Stack sx={{...flexBox("row", "flex-start"), p:1, flexWrap:"wrap", gap:1}}>
                {newTables}
              </Stack>
            </Stack>
          )
          
        }else{
          return (
            <Stack key={i} sx={{...flexBox("column", "flex-start"), p:1}}>
              <Divider>{floorData.floorName}</Divider>
              <Stack sx={{...flexBox("row", "flex-start"), p:1, flexWrap:"wrap", gap:1}}>
                <Typography key={i} variant="subtitle1">No Table Exists!</Typography> 
              </Stack>
            </Stack>
          )

        }
      })}
    </>
  );
};

const KotModal = (props: PropType) => {
  const { open, setOpen, data } = props;
  const restroDetails = userestaurantStore((state) => state);
  const router = useRouter();
  const user = useUserStore(state=>state.user);
  const [infoSelected, setinfoSelected] = useState({
    table: "",
    floor: "ALL",
    oldTableId:data.details.table?._id,
    newTableId:null,
    headerAuth:user.jwtToken,
    eOpen:false,
    eMessage:"",
    variant:"error"
  });
  const {isLoading, mutate} = useMutation(swapTable,{
    onSuccess:(data)=>{
      console.log(data);
      setinfoSelected({...infoSelected,
        eOpen:true,
        eMessage:"Success!",
        variant:"success"
       })
       router.push("/restaurant/table");
    },
    onError:(err)=>{
      console.log(err);
      setinfoSelected({...infoSelected,
        eOpen:true,
        eMessage:"eRROR!",
        variant:"error"
       })
    }
  })
  return (
    <>
      <BasicModal open={open} setOpen={setOpen} title="Swap Tables">
        {isLoading?
        <Stack sx={{...flexBox(), height:"100%", width:"100%"}}><CircularProgress/></Stack>
        :
        <Stack sx={{
          pb:3,
          p:1
        }}>
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
          <Stack sx={{...flexBox()}}>
            <SwapVertIcon color="primary" sx={{
              height:"5rem",
              width:"5rem"
            }}/>
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
          <Button variant="outlined" disabled={isLoading} onClick={()=>{
            if(infoSelected.newTableId && infoSelected.oldTableId){
              mutate(infoSelected)
            }else{
              setinfoSelected({...infoSelected, eOpen:true, eMessage:"Missing Parameters"})
            }
          }}>Confirm</Button>
        </Stack>}
      </BasicModal>
    </>
  );
};

export default KotModal;
