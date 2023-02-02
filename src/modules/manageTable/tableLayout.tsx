import { Divider, Stack, Typography } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import TableComponent from 'modules/manageTable/table';

const TableLayout = ({ restroDetails, infoSelected }: any) => {
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
  return (
    <>
      {useData?.map((floorData: any) => (
        <>
          <Stack sx={{ width: "100%", height: "fit-content" }}>
            <Divider
              sx={{
                width: "100%",
              }}
            >
              {floorData?.floorName}
            </Divider>
          </Stack>
          {floorData?.tables?.length != 0 ? (
            floorData?.tables?.map((tableData: any, index: any) => (
              <TableComponent key={index} tableData={tableData} />
            ))
          ) : (
            <Typography>No Tables Added</Typography>
          )}
        </>
      ))}
    </>
  );
};

export default TableLayout;
