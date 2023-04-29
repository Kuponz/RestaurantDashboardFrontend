import React, { useCallback, useEffect, useState } from "react";
import { Stack, Paper, Typography, Button, Divider } from "@mui/material";
import { flexBox } from "theme/defaultFunction";

interface TableProps {
  restroDetails: any;
  infoSelected: any;
  // setinfoSelected: React.Dispatch<
  //   React.SetStateAction<{
  //     table: string;
  //     floor: string;
  //     oldTableId: string | null;
  //     newTableId: string | null;
  //     headerAuth: string;
  //   }>
  // >;
  setinfoSelected: any;
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
export default CustomTableStructure;
