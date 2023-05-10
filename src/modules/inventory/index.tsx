import {
  Alert,
  Button,
  CircularProgress,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import TopBar from "common/topBar/TopBar";
import React, { useState } from "react";
import ManageMenuCard from "modules/manageMenu/ManageCategoryCard";
import AddIcon from "@mui/icons-material/Add";
import BasicModal from "common/modalGenerator/Modal";
import AddModal from "modules/manageMenu/modal/AddModal";
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { userestaurantStore } from "store/restaurant/restaurantStore";
import {
  createAndUpdateExpense,
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
import {
  createAndUpdateExpenseCategory,
  getWorkUsers,
} from "store/api/axiosSetup";
import { LocalizationProvider, MobileDatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import moment from "moment";

const TopBarInventory = () => {
  const [edit, setEdit] = useState({
    open: false,
    title: "",
    data: {},
  });
  const queryClient = useQueryClient();

  const userToken = useUserStore((state) => state.user);
  const restroState = userestaurantStore((state) => state);

  const [expense, setexpense] = useState([]);
  const [expenseType, setexpenseType] = useState([]);

  const { isLoading: isloadingExpense } = useQuery({
    enabled: !!restroState && !!userToken,
    queryKey: ["getExpense"],
    refetchOnWindowFocus: false,
    queryFn: () =>
      getExpense({
        restaurantId: restroState.restaurant.restaurantInfo._id,
        headerAuth: userToken.jwtToken,
      }),
    onSuccess: (data) => {
      setexpense(data.data.data.expenses);
    },
  });

  const handleDateChange = (newValue: Dayjs | null, name: string) => {
    setEdit({
      ...edit,
      data: { ...edit.data, [name]: newValue },
    });
  };

  const [allUserProfile, setAllUserProfile] = useState([]);

  const { isLoading: isloadingExpenseType, data } = useQuery({
    enabled: !!restroState && !!userToken,
    refetchOnWindowFocus: false,
    queryKey: ["getExpenseType"],
    queryFn: () =>
      getExpenseType({
        restaurantId: restroState.restaurant.restaurantInfo._id,
        headerAuth: userToken.jwtToken,
      }),
    onSuccess: (data) => {
      setexpenseType(data.data.data.getData);
    },
  });

  const { isLoading, isError, error } = useQuery({
    enabled: !!restroState.restaurant.restaurantInfo,
    queryKey: ["getWorkUsers"],
    refetchOnWindowFocus: false,

    queryFn: () =>
      getWorkUsers({
        restaurantId: restroState.restaurant.restaurantInfo._id,
        headerAuth: userToken.jwtToken,
      }),
    onSuccess: (data) => {
      setAllUserProfile(data?.data?.data?.staff);
    },
  });

  const mutateExpenseType = useMutation(deleteExpenseCategory, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getExpenseType"] });
    },
  });
  const mutateExpense = useMutation(deleteExpense, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getExpense"] });
    },
  });

  const updateExp = useMutation(createAndUpdateExpense, {
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["getExpense"],
      });
      setEdit({ open: false, title: "", data: {} });
    },
  });
  const updateCat = useMutation(createAndUpdateExpenseCategory, {
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getExpenseType", "getExpense"],
      });
      setEdit({ open: false, title: "", data: {} });
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
      <TopBar home={true} title={"Expense Manager"} backUrl={"/"}>
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
            overflowY: {
              xs: "auto",
              md: "hidden",
            },
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
              mx={{
                xs:0.25,
                md:1
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
                      <IconButton
                        onClick={() => {
                          setEdit({
                            open: true,
                            title: "Category",
                            data: expense,
                          });
                        }}
                      >
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
                    <Stack direction={{
                      xs:"column",
                      md:"row"
                    }} gap={2}>
                      <Typography variant={"body1"} >{String(expense.expenseType?.expenseType).toUpperCase()}</Typography>
                      <Typography variant={"body1"} color={"red"}>-₹ {expense.amount}</Typography>
                      <Typography variant={"body1"} color={"primary"}>{ moment(moment.utc(expense.date)).local().format("DD/MM/YYYY hh:MM A").toString()}</Typography>
                    </Stack>
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
                      <IconButton
                        onClick={() => {
                          setEdit({
                            open: true,
                            title: "Expense",
                            data: expense,
                          });
                        }}
                      >
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
      <BasicModal
        open={edit.open}
        setOpen={() => {
          setEdit({ ...edit, open: false });
        }}
        title={edit.title}
      >
        {false ? (
          <CircularProgress />
        ) : (
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Stack gap={2}>
              {edit.title === "Category" ? (
                <>
                  <TextField
                    label="Category Name"
                    value={edit.data?.expenseType}
                    onChange={(e) => {
                      setEdit({
                        ...edit,
                        data: { ...edit.data, expenseType: e.target.value },
                      });
                    }}
                    variant="filled"
                  />
                  <Button
                    disabled={updateCat.isLoading}
                    onClick={() => {
                      updateCat.mutate({
                        body: {
                          edit: true,
                          restaurantId:
                            restroState.restaurant.restaurantInfo._id,
                          expenseTypeId: edit.data._id,
                          expenseType: edit.data.expenseType,
                        },
                        headerAuth: userToken.jwtToken,
                      });
                    }}
                  >
                    {updateCat.isLoading ? (
                      <CircularProgress size={25} />
                    ) : (
                      "Update Category"
                    )}
                  </Button>
                </>
              ) : (
                <>
                  <TextField
                    label="Cost (₹)"
                    value={edit.data.amount}
                    type="number"
                    onChange={(e) => {
                      setEdit({
                        ...edit,
                        data: {
                          ...edit.data,
                          amount: e.target.value,
                        },
                      });
                    }}
                    variant="filled"
                  />
                  {/* Why This? */}
                  <MobileDatePicker
                    label="Date"
                    inputFormat="DD/MM/YYYY"
                    value={dayjs(edit.data.date)}
                    onChange={(newValue) => handleDateChange(newValue, "date")}
                    renderInput={(params) => <TextField {...params} />}
                  />
                  <FormControl fullWidth>
                    <InputLabel>Assign</InputLabel>
                    <Select
                      value={edit.data.assigneeId}
                      onChange={(e) => {
                        setEdit({
                          ...edit,
                          data: {
                            ...edit.data,
                            assigneeId: e.target.value,
                          },
                        });
                      }}
                      label="Assign"
                    >
                      {allUserProfile?.map((user: any) => (
                        <MenuItem key={user._id} value={user._id}>
                          {user.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl fullWidth>
                    <InputLabel>Type</InputLabel>
                    <Select
                      value={edit.data.expenseType?._id}
                      onChange={(e) => {
                        setEdit({
                          ...edit,
                          data: {
                            ...edit.data,
                            expenseType: {
                              ...edit.data.expenseType,
                              _id: e.target.value,
                            },
                          },
                        });
                      }}
                      label="Assign"
                    >
                      {expenseType?.map((expense: any) => (
                        <MenuItem key={expense._id} value={expense._id}>
                          {expense.expenseType}
                        </MenuItem>
                      ))}
                      {/* //TODO : Work needed here for rendering type after getting type api */}
                    </Select>
                  </FormControl>
                  <TextField
                    label="Special Instructions"
                    variant="filled"
                    value={edit.data.specialInstruction}
                    onChange={(e) => {
                      setEdit({
                        ...edit,
                        data: {
                          ...edit.data,
                          specialInstruction: e.target.value,
                        },
                      });
                    }}
                  />
                  <Button
                    disabled={updateExp.isLoading}
                    onClick={() => {
                      updateExp.mutate({
                        body: {
                          edit: true,
                          assigneeId: edit.data.assigneeId,
                          restaurantId:
                            restroState.restaurant.restaurantInfo._id,
                          expenseType: edit.data.expenseType._id,
                          expenseId: edit.data._id,
                          amount: edit.data.amount,
                          date: dayjs(edit.data.date).toISOString(),
                          specialInstruction: edit.data.specialInstruction,
                        },
                        headerAuth: userToken.jwtToken,
                      });
                    }}
                  >
                    Update
                  </Button>
                </>
              )}
            </Stack>
          </LocalizationProvider>
        )}
      </BasicModal>
      {/* <Snackbar
        open={errorOpener.open}
        autoHideDuration={6000}
        onClose={() => {
          setErrorOpener((erp) => ({ ...erp, open: false }));
        }}
      >
        <Alert severity={errorOpener.severity}>{errorOpener.message}</Alert>
      </Snackbar>  */}
    </Stack>
  );
};
export default TopBarInventory;
