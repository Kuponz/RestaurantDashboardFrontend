import React, { useCallback, useEffect, useState } from "react";
import BasicModal from "common/modalGenerator/Modal";
import { Stack, Paper, Typography, Button } from "@mui/material";
import table from "pages/restaurant/table/index";
import { userestaurantStore } from "store/restaurant/restaurantStore";
import FloorStructure from "modules/table/FloorStructure";
import FloorWiseTable from "modules/table/FloorWiseTable";

interface PropType {
  open: boolean;
  setOpen: any;
  data: any;
}

interface TableProps {
  restroDetails: any;
  infoSelected: any;
}

const CustomTableStructure = ({ restroDetails, infoSelected }: TableProps) => {
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
        console.log(floorData.tables);
        return <div key={i}>lmao</div>;
      })}
    </>
  );
};

const KotModal = (props: PropType) => {
  const { open, setOpen, data } = props;
  const restroDetails = userestaurantStore((state) => state);
  const [infoSelected, setinfoSelected] = useState({
    table: "",
    floor: "ALL",
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
          <FloorStructure
            infoSelected={infoSelected}
            setinfoSelected={setinfoSelected}
            restroDetails={restroDetails?.restaurant?.floors}
          />
          <CustomTableStructure
            infoSelected={infoSelected}
            restroDetails={restroDetails?.restaurant.floors}
          />
        </Stack>
        <Button>Confirm</Button>
      </BasicModal>
    </>
  );
};

export default KotModal;
