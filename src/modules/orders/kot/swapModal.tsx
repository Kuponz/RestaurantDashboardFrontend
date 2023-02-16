import React, { useCallback, useEffect, useState } from "react";
import { Stack, Paper, Typography, Button } from "@mui/material";
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

const CustomTableStructure = ({
  restroDetails,
  infoSelected,
  setinfoSelected,
}: TableProps) => {
  const [useData, setuseData] = useState<any[]>([]);
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
        let newTables = floorData.tables.map((tableData) => {
          if (tableData?.status == "VACANT") {
            return (
              <Paper
                variant="outlined"
                key={i}
                sx={{
                  p: 2,
                }}
                onClick={() => {
                  setinfoSelected((st) => ({
                    ...st,
                    newTableId: tableData?._id,
                  }));
                  console.log({ infoSelected });
                }}
              >
                <Typography>{tableData?.TableName}</Typography>
              </Paper>
            );
          }
        });
        console.log(newTables);
        if (newTables && newTables.length > 0) {
          return (
            <Stack key={i} sx={{ ...flexBox("row", "flex-start"), p: 1 }}>
              {newTables}
            </Stack>
          );
        } else {
          return <Typography key={i}>No Table Exists!</Typography>;
        }
      })}
    </>
  );
};

export default CustomTableStructure;
