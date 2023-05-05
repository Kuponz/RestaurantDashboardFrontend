import {
  Alert,
  Button,
  CircularProgress,
  IconButton,
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
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { userestaurantStore } from "store/restaurant/restaurantStore";
import {
  deleteExpense,
  deleteExpenseCategory,
  deleteItem,
  getExpense,
  getExpenseType,
  getWorkMenu,
} from "store/api/axiosSetup";
import { useUserStore } from "store/user/userzustandstore";
import ExpenseOptions from "test/ExpenseOptions";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { createAndUpdateExpenseCategory } from "store/api/axiosSetup";

const TopBarInventory = () => {
  // const [open, setOpen] = useState(false);

  const userToken = useUserStore((state) => state.user);
  const restroState = userestaurantStore((state) => state);

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

  console.log(restroState);

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
      // QueryClient.invalidateQueries(["getWorkMenu"]);
    },
  });

  const mutateExpenseType = useMutation(deleteExpenseCategory, {
    onSuccess: (data) => {
      console.log(data);
    },
  });
  const mutateExpense = useMutation(deleteExpense, {
    onSuccess: (data) => {
      console.log(data);
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
                    sx={{
                      p: 2,
                      color: "white",
                      display: "flex",
                      // justifyContent: "center",
                      alignItems: "center",
                    }}
                    key={expense._id}
                  >
                    <span>{expense.expenseType}</span>
                    <Stack
                      direction={"row"}
                      gap={2}
                      sx={{ marginLeft: "auto" }}
                    >
                      <IconButton
                        onClick={() => {
                          mutateExpenseType.mutate({
                            body: {
                              expenseTypeId: expense._id,
                              assigneeId: userToken._id,
                            },
                            headerAuth: userToken.jwtToken,
                          });
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                      <IconButton disabled>
                        <EditIcon />
                      </IconButton>
                    </Stack>
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
                  <Paper
                    key={expense._id}
                    sx={{
                      p: 2,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <span>{expense.expenseType?.expenseType}</span>
                    <Stack
                      direction={"row"}
                      gap={2}
                      sx={{ marginLeft: "auto" }}
                    >
                      <IconButton
                        onClick={() => {
                          mutateExpense.mutate({
                            body: { expenseId: expense._id },
                            headerAuth: userToken.jwtToken,
                          });
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                      <IconButton disabled>
                        <EditIcon />
                      </IconButton>
                    </Stack>
                  </Paper>
                ))}
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      )}
      {/* <BasicModal
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
      </Snackbar> */}
    </Stack>
  );
};
export default TopBarInventory;
