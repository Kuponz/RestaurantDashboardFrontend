import {
    Button,
    CircularProgress,
    Modal,
    Paper,
    Stack,
    Typography,
  } from "@mui/material";
  import React, { useState,useEffect } from "react";
  import { useUserStore } from "store/user/userzustandstore";
  import ConsumerCard from "./ConsumerCard";
  import AddIcon from "@mui/icons-material/Add";
  import TopBar from "common/topBar/TopBar";
  import BasicModal from "common/modalGenerator/Modal";
  import ViewUserModal from "./modal/ViewUserModal";
  import AddConsumer from "./modal/AddConsumer";
  import { useMutation, useQuery } from "@tanstack/react-query";
  import { userestaurantStore } from "store/restaurant/restaurantStore";
  import { getAllConsumers, deleteConsumer,editConsumer } from "store/api/axiosSetup";
  import { ToastContainer, toast } from 'react-toastify';

  const ManageCustomersHome = () => {
    const restaurant = userestaurantStore((state) => state.restaurant);
    const user = useUserStore((state) => state.user);

    const { isLoading, isError, data, error } = useQuery({
      enabled: !!restaurant.restaurantInfo,
      queryKey: ["getAllConsumers"],
      refetchOnWindowFocus: false,
      queryFn: () =>
        getAllConsumers({
          restaurantId: restaurant.restaurantInfo._id,
          headerAuth: user.jwtToken,
        }),
      onSuccess: (data) => {
        // console.log({data:data?.data?.data})
        setAllUserProfile(data?.data?.data?.consumers);
      },
    });
    const [edit, setEdit] = useState(false);
    const [open, setOpen] = useState(false);
    const [newUser, setNewUser] = useState(false);
    const [allUserProfile, setAllUserProfile] = useState([]);
    console.log({ allUserProfile });
  
    const [userIndex, setuserIndex] = useState<{
      user: {
        mobileNumber: string;
        name: string;
        balanceAmount: Number;
        _id: string;
        isSameWhatsappNumber: boolean;
      };
      index: number;
    }>();
  
    const deletUsermut = useMutation(deleteConsumer, {
      onSuccess: (data) => {
        // console.log("The data after deletion is :");
        // const temp = data?.data?.data;
        // console.log({ temp });

        toast.success("Customer Deleted Successfully");
        setAllUserProfile(
          allUserProfile.filter(
            (elm) => elm._id != data?.data?.data?.deletedConsumer?._id
          )
        );
      },
    });
    const editUserMut = useMutation(editConsumer, {
      onSuccess: (data) => {
        toast.success("Customer Updated Successfully");
        console.log("The data after updation is :");
        const temp = data?.data?.data;
        console.log({ temp });
        let allP = allUserProfile.map((elm) => {
          if (elm._id == data?.data?.data?.updatedConsumer?._id) {
            return data?.data?.data?.updatedConsumer;
          } else {
            return elm;
          }
        });
        setAllUserProfile(allP);
        setEdit(false);
        setOpen(false);
      },
    });

    // useEffect(() => {
    //     if(restaurant.restaurantInfo){
    //         getAllConsumers({
    //         restaurantId: restaurant.restaurantInfo._id,
    //         headerAuth: user.jwtToken,
    //         }).then((data)=>{
    //         console.log({data})
    //         setAllUserProfile(data?.data?.data?.consumers);
    //         })
    //     }
    // }, []);

    // console.log(user);
    return (
      <Stack
        sx={{
          width: "100%",
          height: "100vh",
          overflow: "hidden",
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          gap: 3,
          p: 3,
          flexWrap: "wrap",
        }}
      >
        <TopBar title={"Manage Customers"} home={true} backUrl={"/"}>
          <Button
            variant="contained"
            onClick={() => {
              setNewUser(true);
              setOpen(true);
            }}
            sx={{
              borderRadius: 1,
            }}
          >
            <AddIcon />
            Add Customer
          </Button>
        </TopBar>
        <Stack
          sx={{
            width: "100%",
            height: "100%",
            overflowY: "auto",
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            gap: 3,
            pb: 20,
            flexWrap: "wrap",
          }}
        >
          {isLoading ? (
            <>
              <CircularProgress />
            </>
          ) : (
            allUserProfile.map((user, index) => (
              <>
                <ConsumerCard
                  key={index}
                  deletUsermut={deletUsermut}
                  setNewUser={setNewUser}
                  index={index}
                  user={user}
                  open={open}
                  setOpen={setOpen}
                  setuserIndex={setuserIndex}
                />
              </>
            ))
          )}
        </Stack>
        <BasicModal
          open={open}
          setOpen={setOpen}
          title={newUser ? "Add Customer" : edit ? "Edit Customer" : "View Customer"}
        >
          {newUser ? (
            <AddConsumer
              setAllUserProfile={setAllUserProfile}
              setOpen={setOpen}
              setNewUser={setNewUser}
              allUserProfile = {allUserProfile}
            />
          ) : (
            <ViewUserModal
              editUserMut={editUserMut}
              setuserIndex={setuserIndex}
              setAllUserProfile={setAllUserProfile}
              userIndex={userIndex}
              edit={edit}
              setEdit={setEdit}
            />
          )}
        </BasicModal>
      </Stack>
    );
  };
  
  export default ManageCustomersHome;