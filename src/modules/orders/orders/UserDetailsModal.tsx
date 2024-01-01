import React, { useState, useEffect } from 'react';
import { Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Stack, TextField, FormControlLabel, Checkbox } from '@mui/material';
import { userestaurantStore } from "store/restaurant/restaurantStore";
import { useMutation } from "@tanstack/react-query";
import { checkUserExistance } from "store/api/axiosSetup";
import { useorderStore } from "store/order/orderStore";
import { useUserStore } from "store/user/userzustandstore";
import { toast } from 'react-toastify';
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";

const UserDetailsModal = ({ userDetails, setUserDetails, onSubmitUserInfo }) => {
    const [existingUser, setExistingUser] = useState(true);

    const restaurant = userestaurantStore((state) => state.restaurant);
    const user = useUserStore((state) => state.user);
    
    const { mutate, isLoading } = useMutation(checkUserExistance, {
        onSuccess: (data, variables, context) => {
        console.log("The data is :");
        console.log({
            data: data.data.data,
            variables,
        });

        setUserDetails({
            ...userDetails,
            isSameWhatsappNumber: data.data.data?.isSameWhatsappNumber,
            name: data.data.data?.name,
            balanceAmount: data.data.data?.balanceAmount,
            dateOfBirth: data.data.data?.dateOfBirth,
        });
        },
        onError: (error, variables, context) => {
        // console.log({ error });
        toast.error("User does not exists");
        console.log("User does not exists");
        },
    });

    // Check if the user already exists based on mobileNumber
    useEffect(() => {

        if(userDetails.mobileNumber.length == 10){
            setExistingUser(false);
            let userMobileNumber = userDetails.mobileNumber;
            let userNumberCheck = {
                userMobileNumber,
                restaurantId: restaurant.restaurantInfo._id,
                token: user?.jwtToken,
            }
            // console.log(userNumberCheck);
            mutate(userNumberCheck);
        }
        else {
            // Reset userDetails when mobileNumber length is less than 10
            setExistingUser(true);
            setUserDetails({
                mobileNumber: userDetails.mobileNumber,
                isSameWhatsappNumber: false,
                name: "",
                balanceAmount: 0,
                dateOfBirth: null,
            });
        }
    }, [userDetails.mobileNumber]);

    const userDetailsFields = [
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
            disabled: existingUser, // Disable if the user already exists
        },
        {
            title: "Name",
            name: "name",
            multiline: false,
            type: "text",
            disabled: existingUser, // Disable if the user already exists
        },
        {
            title: "Date of Birth",
            name: "dateOfBirth",
            multiline: false,
            type: "date", // Use "date" type for the date picker
            disabled: existingUser,
        },
        {
            title: "Balance Amount",
            name: "balanceAmount",
            multiline: false,
            type: "number",
            disabled: existingUser, // Disable if the user already exists
        },
    ];

    const handleChange = (event, field) => {
        const value = field.type === "checkbox" ? event.target.checked : event.target.value;

        setUserDetails({
            ...userDetails,
            [field.name]: value
        });
    };

    return (
        <Stack gap={2}>
            {userDetailsFields.map((field, index) => (
                <div key={index}>
                    {field.type === "checkbox" ? (
                        <FormControl sx={{ my: 1, mx: 2, minWidth: 120 }}>
                            <FormControlLabel
                                control={<Checkbox
                                    checked={userDetails[field.name]}
                                    onChange={(e) => handleChange(e, field)}
                                    name={field.name}
                                    color="primary"
                                    disabled={field.disabled}
                                />}
                                label={field.title}
                            />
                        </FormControl>
                    ) :  field.type === "date" ? (
                        <Stack >
                            <LocalizationProvider dateAdapter={AdapterDayjs} >
                                <MobileDatePicker
                                    label={field.title}
                                    inputFormat="MM/DD/YYYY"
                                    value={userDetails[field.name] || null}
                                    onChange={(newValue) => handleChange({ target: { value: newValue } }, field)}
                                    renderInput={(params) => <TextField {...params} />}
                                    disabled={field.disabled}
                                />
                        </LocalizationProvider>
                        </Stack>
                    ) : (
                        <TextField
                            // sx={{ my: 1}}
                            key={index}
                            value={userDetails[field.name]}
                            onChange={(e) => handleChange(e, field)}
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

            <Button sx={{ m: 1, mx: 2 }} variant='contained' onClick={e => onSubmitUserInfo(e)}>
                Submit
            </Button>
        </Stack>
    );
};

export default UserDetailsModal;
