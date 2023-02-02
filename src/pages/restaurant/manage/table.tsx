import Head from "next/head";
import HomeStructure from "modules/home/HomeStructure";
import { Button, Stack, Typography } from "@mui/material";
import { useRouter } from "next/router";
import TopBar from "common/topBar/TopBar";
import FloorStructure from "modules/table/FloorStructure";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useUserStore } from "store/user/userzustandstore";
import { getTables } from "store/api/axiosSetup";
import { userestaurantStore } from "store/restaurant/restaurantStore";
import TableLayout from "modules/manageTable/tableLayout";
import BasicModal from "common/modalGenerator/Modal";

export default function createTable() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isFloor, setisFloor] = useState(false);

  const restroDetails = userestaurantStore((state) => state);
  const userDetails = useUserStore((state) => state.user);

  const [infoSelected, setinfoSelected] = useState({
    table: "",
    floor: "ALL",
  });

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["getTable"],
    queryFn: () =>
      getTables(userDetails?.jwtToken, userDetails?.restaurantLinked),
    onSuccess: (data) => {
      restroDetails.setFloors(data?.data?.data);
    },
  });
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
  return (
    <>
      <Head>
        <title>etoPOS</title>
        <meta
          name="description"
          content="India's first paperless and Innovative POS with minimum investments and Maximum returns"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        {/* Auth Stuff Here */}
        {/* <Waiter /> */}
        <HomeStructure>
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
                  <Button onClick={handleFloor}>Add Floor</Button>
                  <Button onClick={handleTable}>Add Tables</Button>
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
          </Stack>
        </HomeStructure>
        <BasicModal
          open={open}
          setOpen={setOpen}
          title={isFloor ? "Floor" : "Table"}
        >
          {/* TODO: Modal Remaining */}
        </BasicModal>
      </div>
    </>
  );
}
