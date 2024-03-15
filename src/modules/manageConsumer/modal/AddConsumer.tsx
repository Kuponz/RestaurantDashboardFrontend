import { Alert, Button, CircularProgress, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Stack, Switch, TextField, Typography, FormControlLabel, Checkbox } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import React, { useState } from 'react';
import { createUser, uploadUserInfo } from 'store/api/axiosSetup';
import { useUserStore } from 'store/user/userzustandstore';
import { userestaurantStore } from "store/restaurant/restaurantStore";
import { ToastContainer, toast } from 'react-toastify';
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";

const info = [
    {
        title: "Mobile Number",
        name: "mobileNumber",
        multiline: false,
        type: "text",
    },
    {
        title: "WhatsApp Number same as above",
        name: "isSameWhatsappNumber",
        multiline: false,
        type: "checkbox",
    },
    {
        title: "Name",
        name: "name",
        multiline: false,
        type: "text"
    },
    {
        title: "Date of Birth",
        name: "dateOfBirth",
        multiline: false,
        type: "date", // Use "date" type for the date picker
    },
    {
        title: "Balance Amount",
        name: "balanceAmount",
        multiline: false,
        type: "number",
    },
];

const AddConsumer = ({ setNewUser, setAllUserProfile, setOpen }) => {
    const [addUser, setAddUser] = useState({
        userData: {
            name: "",
            mobileNumber: "",
            isSameWhatsappNumber: false,
            balanceAmount: 0,
            dateOfBirth: "",
        },
        viewForm: info,
    });
    const restaurant = userestaurantStore((state) => state.restaurant);
    const user = useUserStore(state => state.user);
    const [err, setError] = useState("");
    const { mutate, isLoading, error } = useMutation(uploadUserInfo, {
        onSuccess: (data, variables, context) => {
            console.log("The data is :");
            console.log({
                data: data.data.data,
                variables,
            });

            toast.success("Consumer Added Successfully");
            setAllUserProfile(alp => [...alp, data?.data?.data]);
            setNewUser(false);
            setOpen(false);
        },
        onError: (error, variables, context) => {
            toast.error("Error in Adding Consumer");
            setError(error.response ? error.response.data.message : String(error.response));
        },
    });

    const handleChange = (event: SelectChangeEvent<string>, name: string | number | any) => {
        const value = info.find(field => field.name === name)?.type === "checkbox" ? event.target.checked : event.target.value;
        setAddUser({ ...addUser, userData: { ...addUser.userData, [name]: value } });
    };

    const submitChanges = () => {
        const props = {
            restaurantId: restaurant.restaurantInfo._id,
            token: user.jwtToken,
            ...addUser.userData,
            orderId: null,
        };
        mutate(props);
    };

    return (
        isLoading ? (
            <Stack sx={{ width: "100%", textAlign: "center" }}>
                <CircularProgress />
            </Stack>
        ) : (
            <Stack>
                {error && (<Alert>{err}</Alert>)}
                {addUser.viewForm.map((field, index) => (
                    <div key={index}>
                        {field.type === "checkbox" ? (
                            <FormControl sx={{ my: 1, mx: 2, minWidth: 120 }}>
                                <FormControlLabel
                                    control={<Checkbox
                                        checked={addUser.userData[field.name]}
                                        onChange={(e) => handleChange(e, field.name)}
                                        name={field.name}
                                        color="primary"
                                        disabled={field.disabled}
                                        fullWidth
                                    />}
                                    label={field.title}
                                />
                            </FormControl>
                        ) : field.type === "date" ? (
                            <Stack sx={{ my: 1 }}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <MobileDatePicker
                                        label={field.title}
                                        inputFormat="MM/DD/YYYY"
                                        value={addUser.userData[field.name] || null}
                                        onChange={(newValue) => handleChange({ target: { value: newValue } }, field.name)}
                                        renderInput={(params) => <TextField {...params} variant='filled' />}
                                        disabled={field.disabled}
                                    />
                                </LocalizationProvider>
                            </Stack>
                        ) : (
                            <TextField
                                sx={{ my: 1 }}
                                key={index}
                                value={addUser.userData[field.name]}
                                onChange={(e) => handleChange(e, field.name)}
                                variant='filled'
                                label={field.title}
                                type={field.type}
                                multiline={field.multiline}
                                rows={field.multiline ? 5 : 1}
                                fullWidth
                                disabled={field.disabled}
                            />
                        )}
                    </div>
                ))}

                <Button sx={{ m: 1, mx: 2 }} variant='contained' onClick={submitChanges}>
                    Submit
                </Button>

            </Stack>
        )
    );
};

export default AddConsumer;
