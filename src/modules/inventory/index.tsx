import {
  Alert,
  Button,
  CircularProgress,
  Paper,
  Snackbar,
  Stack,
  Typography,
} from "@mui/material";
import TopBar from "common/topBar/TopBar";
import React, { useState } from "react";
import ManageMenuCard from "modules/manageMenu/ManageCategoryCard";
import AddIcon from "@mui/icons-material/Add";
import BasicModal from "common/modalGenerator/Modal";
import AddModal from "modules/manageMenu/modal/AddModal";
import { useMutation, useQuery } from "@tanstack/react-query";
import { userestaurantStore } from "store/restaurant/restaurantStore";
import {
  deleteItem,
  getExpense,
  getExpenseType,
  getWorkMenu,
} from "store/api/axiosSetup";
import { useUserStore } from "store/user/userzustandstore";
import ExpenseOptions from "test/ExpenseOptions";
import inventory from "pages/restaurant/inventory";
const TopBarInventory = () => {
  const [open, setOpen] = useState(false);
  const [isItem, setisItem] = useState(false);
  const [viewOne, setViewOne] = useState({
    viewObj: {},
    open: open,
  });
  const userToken = useUserStore((state) => state.user);
  const restroState = userestaurantStore((state) => state);
  const [errorOpener, setErrorOpener] = useState({
    message: "",
    open: false,
    severity: "error",
  });

  const [expense, setexpense] = useState([]);
  const [expenseType, setexpenseType] = useState([]);

  const { isLoading: isloadingExpense } = useQuery({
    enabled: !!restroState && !!userToken,
    queryKey: ["getWorkMenu"],
    refetchOnWindowFocus: false,
    queryFn: () =>
      getExpense({
        restaurantId: restroState.restaurant.restaurantInfo._id,
        headerAuth: userToken.jwtToken,
      }),
    onSuccess: (data) => {
      setexpense(data.data.data.expenses);
      console.log({ data: data.data.data.expenses });
    },
  });
  const { isLoading: isloadingExpenseType } = useQuery({
    enabled: !!restroState && !!userToken,
    refetchOnWindowFocus: false,
    queryFn: () =>
      getExpenseType({
        restaurantId: restroState.restaurant.restaurantInfo._id,
        headerAuth: userToken.jwtToken,
      }),
    onSuccess: (data) => {
      setexpenseType(data.data.data.getData);
      console.log({ type: data.data.data.getData });
    },
  });

  return (
    <Stack
      sx={{
        height: "100vh",
        width: "100%",
        pt: 3,
        p: {
          xs: 1,
          md: 2,
        },
        overflow: "hidden",
      }}
    >
      <TopBar home={true} title={"Inventory"} backUrl={"/"}>
        <ExpenseOptions />
      </TopBar>
      {isloadingExpense ? (
        <>
          <CircularProgress />
        </>
      ) : (
        <Stack
          width={"100%"}
          direction={{
            xs: "column",
            md: "row",
          }}
          sx={{
            overflow: "hidden",
          }}
        >
          <Stack
            sx={{
              width: {
                xs: "100%",
                md: "40%",
              },
              height: {
                xs: "45%",
                md: "100%",
              },
            }}
          >
            <Stack
              direction={"row"}
              justifyContent={"space-between"}
              alignItems={"center"}
              px={{
                xs: 0,
                md: 2,
              }}
              py={1}
            >
              <Typography variant="h4">Type</Typography>
            </Stack>
            <Stack
              direction={"row"}
              sx={{
                flexWrap: "wrap",
                maxHeight: "100%",
                width: {
                  xs: "100%",
                },
                overflowY: "auto",
                overflowX: "hidden",
                pt: 3,
                pb: 10,
                px: 2,
                gap: 2,
              }}
            >
              {/* {restroState?.restaurant?.categories?.map((category, index) => {
                return (
                  <>
                    <ManageMenuCard
                      key={index}
                      setisItem={setisItem}
                      setViewOne={setViewOne}
                      viewOne={viewOne}
                      deleteMutate={deleteMutate}
                      isCategory={true}
                      menuVal={category}
                      setOpen={setOpen}
                      userToken={userToken}
                    />
                  </>
                );
                
              })} */}
              <Stack gap={2} sx={{ flex: 1 }}>
                {expenseType?.map((expense: any, index) => (
                  <Paper
                    variant="free"
                    sx={{ p: 2, color: "white" }}
                    key={index}
                  >
                    {expense.expenseType}
                  </Paper>
                ))}
              </Stack>
            </Stack>
          </Stack>
          <Stack
            sx={{
              width: {
                xs: "100%",
                md: "45%",
              },
              height: {
                xs: "45%",
                md: "100%",
              },
              flex: 1,
            }}
          >
            <Stack
              direction={"row"}
              justifyContent={"space-between"}
              alignItems={"center"}
              px={{
                xs: 0,
                md: 2,
              }}
              py={1}
            >
              <Typography variant="h4">Expense details</Typography>
              {/* <Button
                                variant="contained"
                                onClick={() => {
                                    setOpen(true);
                                    setisItem(true);
                                }}
                                sx={{
                                    borderRadius: 1,
                                    mx: 1,
                                }}
                            >
                                <AddIcon />
                                Add Menu
                            </Button> */}
            </Stack>
            <Stack
              direction={"row"}
              sx={{
                flexWrap: "wrap",
                height: "100%",
                width: {
                  xs: "100%",
                },
                overflowY: "auto",
                overflowX: "hidden",
                pt: 3,
                pb: 10,
                px: 2,
                gap: 2,
              }}
            >
              {/* {restroState?.restaurant?.categories?.map((category, index) => {
                return category?.menu.map((menuVal) => (
                  <ManageMenuCard
                    key={index}
                    setViewOne={setViewOne}
                    viewOne={viewOne}
                    isCategory={false}
                    userToken={userToken}
                    setisItem={setisItem}
                    setOpen={setOpen}
                    menuVal={{
                      ...menuVal,
                      categoryName: category?.categoryName,
                    }}
                    deleteMutate={deleteMutate}
                  />
                ));
              })} */}
              <Stack sx={{ flex: 1 }} gap={2}>
                {expense.map((expense: any, index) => (
                  <Paper key={expense.id}>{}</Paper>
                ))}
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      )}
      <BasicModal
        open={open}
        setOpen={() => {
          setisItem(false);
          setViewOne({
            viewObj: {},
            open: false,
          });
          setOpen(false);
        }}
        title={isItem ? "Item" : "Category"}
      >
        <AddModal
          viewOne={viewOne}
          errorOpener={errorOpener}
          setErrorOpener={setErrorOpener}
          isItem={isItem}
          userToken={userToken}
          restroState={restroState}
          setOpen={() => {
            setisItem(false);
            setViewOne({
              viewObj: {},
              open: false,
            });
            setOpen(false);
          }}
        />
      </BasicModal>
      <Snackbar
        open={errorOpener.open}
        autoHideDuration={6000}
        onClose={() => {
          setErrorOpener((erp) => ({ ...erp, open: false }));
        }}
      >
        <Alert severity={errorOpener.severity}>{errorOpener.message}</Alert>
      </Snackbar>
    </Stack>
  );
};
export default TopBarInventory;
