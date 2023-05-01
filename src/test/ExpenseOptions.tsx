import {
  Button,
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Select,
  CircularProgress,
  TextField,
  Stack,
} from "@mui/material";
import { LocalizationProvider, MobileDatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useMutation, useQuery } from "@tanstack/react-query";
import BasicModal from "common/modalGenerator/Modal";
import dayjs, { type Dayjs } from "dayjs";
import React, { useState } from "react";
import {
  getWorkUsers,
  createCategory,
  createAndUpdateExpenseCategory,
  createAndUpdateExpense,
} from "store/api/axiosSetup";
import { userestaurantStore } from "store/restaurant/restaurantStore";
import { useUserStore } from "store/user/userzustandstore";

const ExpenseOptions = () => {
  const [Open, setOpen] = useState(false);
  const [Option, setOption] = useState("");
  const [Selections, setSelections] = useState<any>({
    Category: { name: "" },
    Expense: {
      assignDate: dayjs(),
      assign: "",
      specialInstructions: "",
      type: "",
    },
  });
  const [allUserProfile, setAllUserProfile] = useState([]);

  const restaurant = userestaurantStore((state) => state.restaurant);
  const user = useUserStore((state) => state.user);

  const { isLoading, isError, data, error } = useQuery({
    enabled: !!restaurant.restaurantInfo,
    queryKey: ["getWorkUsers"],
    refetchOnWindowFocus: false,
    queryFn: () =>
      getWorkUsers({
        restaurantId: restaurant.restaurantInfo._id,
        headerAuth: user.jwtToken,
      }),
    onSuccess: (data) => {
      // console.log({data:data?.data?.data})
      setAllUserProfile(data?.data?.data?.staff);
    },
  });

  const updateCat = useMutation(createAndUpdateExpenseCategory, {
    onSuccess: (data) => {
      console.log(data);
    },
  });

  // console.log(allUserProfile);

  // dayjs().toISOString();

  // console.log({
  //   edit: false,
  //   assigneeId: Selections.Expense.assign,
  //   restaurantId: restaurant.restaurantInfo._id,
  //   expenseType: Selections.Expense.type,
  //   amount: Selections.Expense.cost,
  //   date: Selections.Expense.assignDate.toISOString(),
  //   specialInstruction: Selections.Expense.specialInstructions,
  // });

  const handleDateChange = (newValue: Dayjs | null, name: string) => {
    setSelections({
      ...Selections,
      Expense: { ...Selections.Expense, [name]: newValue },
    });
  };

  const createCategory = useMutation(createAndUpdateExpenseCategory, {
    onSuccess: (data) => {
      console.log({ successData: data });
      setSelections({
        ...Selections,
        Category: {
          name: "",
        },
      });
    },
  });

  const createExpense = useMutation(createAndUpdateExpense, {
    onSuccess: (data) => {
      console.log(data);
    },
  });

  return (
    <>
      <Stack direction={"row"}>
        <Button
          onClick={() => {
            setOption("Category");
            setOpen(true);
          }}
        >
          Add Category
        </Button>
        <Button
          onClick={() => {
            setOption("Expense");
            setOpen(true);
          }}
        >
          Add Expense
        </Button>
      </Stack>
      <BasicModal open={Open} setOpen={setOpen} title={Option}>
        {isLoading ? (
          <CircularProgress />
        ) : (
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Stack gap={2}>
              {Option === "Category" ? (
                <>
                  <TextField
                    label="Category Name"
                    //   variant="standard"
                    value={Selections.Category?.name}
                    onChange={(e) => {
                      setSelections({
                        ...Selections,
                        Category: {
                          ...Selections.Category,
                          name: e.target.value,
                        },
                      });
                    }}
                    variant="filled"
                  />
                  <Button
                    disabled={
                      createCategory.isLoading ||
                      Selections.Category.name === ""
                    }
                    onClick={() => {
                      createCategory.mutate({
                        body: {
                          restaurantId: restaurant.restaurantInfo._id,
                          edit: false,
                          expenseType: Selections.Category.name,
                        },
                        headerAuth: user.jwtToken,
                      });
                    }}
                  >
                    Add Category
                  </Button>
                </>
              ) : (
                <>
                  <TextField
                    label="Expense Name"
                    value={Selections.Expense?.name}
                    onChange={(e) => {
                      setSelections({
                        ...Selections,
                        Expense: {
                          ...Selections.Expense,
                          name: e.target.value,
                        },
                      });
                    }}
                    variant="filled"
                  />
                  <TextField
                    label="Cost (₹)"
                    value={Selections.Expense?.cost}
                    type="number"
                    onChange={(e) => {
                      setSelections({
                        ...Selections,
                        Expense: {
                          ...Selections.Expense,
                          cost: e.target.value,
                        },
                      });
                    }}
                    variant="filled"
                  />
                  {/* Why This? */}
                  <MobileDatePicker
                    label="Date"
                    inputFormat="DD/MM/YYYY"
                    value={dayjs(Selections.Expense.startDate)}
                    onChange={(newValue) =>
                      handleDateChange(newValue, "assignDate")
                    }
                    renderInput={(params) => <TextField {...params} />}
                  />
                  {/* <MobileDatePicker
                  label="End Date"
                  inputFormat="DD/MM/YYYY"
                  value={dayjs(Selections.Expense.endDate)}
                  onChange={(newValue) => handleDateChange(newValue, "endDate")}
                  renderInput={(params) => <TextField {...params} />}
                /> */}

                  <FormControl fullWidth>
                    <InputLabel>Assign</InputLabel>
                    <Select
                      value={Selections.Expense.assign}
                      onChange={(e) => {
                        setSelections({
                          ...Selections,
                          Expense: {
                            ...Selections.Expense,
                            assign: e.target.value,
                          },
                        });
                      }}
                      label="Assign"
                    >
                      {/* <MenuItem value={10}>Ten</MenuItem>
                      <MenuItem value={20}>Twenty</MenuItem>
                      <MenuItem value={30}>Thirty</MenuItem> */}
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
                      value={Selections.Expense.type}
                      onChange={(e) => {
                        setSelections({
                          ...Selections,
                          Expense: {
                            ...Selections.Expense,
                            type: e.target.value,
                          },
                        });
                      }}
                      label="Assign"
                    >
                      {/* <MenuItem value={10}>Ten</MenuItem>
                      <MenuItem value={20}>Twenty</MenuItem>
                      <MenuItem value={30}>Thirty</MenuItem> */}
                      {/* {allUserProfile?.map((user: any) => (
                        <MenuItem key={user._id} value={user._id}>
                        {user.name}
                        </MenuItem>
                      ))} */}
                      <MenuItem value={"644fdc16eb5a7e005afdd8f6"}>
                        New
                      </MenuItem>
                      {/* //TODO : Work needed here for rendering type after getting type api */}
                    </Select>
                  </FormControl>
                  <TextField
                    label="Special Instructions"
                    variant="filled"
                    value={Selections.Expense.specialInstructions}
                    onChange={(e) => {
                      setSelections({
                        ...Selections,
                        Expense: {
                          ...Selections.Expense,
                          specialInstructions: e.target.value,
                        },
                      });
                    }}
                  />
                  <Button
                    disabled={
                      createExpense.isLoading ||
                      Selections.Expense.assign === "" ||
                      Selections.Expense.cost === "" ||
                      Selections.Expense.assignDate === null ||
                      Selections.Expense.type === ""
                    }
                    onClick={() =>
                      createExpense.mutate({
                        body: {
                          edit: false,
                          assigneeId: Selections.Expense.assign,
                          restaurantId: restaurant.restaurantInfo._id,
                          expenseType: Selections.Expense.type,
                          amount: Selections.Expense.cost,
                          date: Selections.Expense.assignDate.toISOString(),
                          specialInstruction:
                            Selections.Expense.specialInstructions,
                        },
                        headerAuth: user.jwtToken,
                      })
                    }
                  >
                    Add
                  </Button>
                </>
              )}
              {/* <Button
                onClick={() => {
                  updateCat.mutate({
                    body: {
                      expenseTypeId: "644fdc16eb5a7e005afdd8f6",
                      edit: true,
                      expenseType: "Some New Name",
                    },
                    headerAuth: user.jwtToken,
                  });
                }}
              >
                Some Update
              </Button> */}
            </Stack>
          </LocalizationProvider>
        )}
      </BasicModal>
    </>
  );
};

export default ExpenseOptions;

// "644fcb010d12ec005b256723"
