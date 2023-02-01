import { Button, CircularProgress, Divider, Grid, Stack, Typography } from "@mui/material";
import TopBar from "common/topBar/TopBar";
import React, { useState } from "react";
import ManageMenuCard from "./ManageCategoryCard";
import AddIcon from '@mui/icons-material/Add';
import BasicModal from "common/modalGenerator/Modal";
import AddModal from "./modal/AddModal";
import { QueryClient, useQuery } from "@tanstack/react-query";
import { userestaurantStore } from "store/restaurant/restaurantStore";
import { getWorkMenu } from "store/api/axiosSetup";
import { useUserStore } from "store/user/userzustandstore";
const ManageMenuHome = () => {
  const  [open, setOpen] = useState(false);
  const  [isItem, setisItem] = useState(false);

  const userToken = useUserStore(state=>state.user);
  const restroState = userestaurantStore(state=>state);
  const { isLoading, isError, data, error } = useQuery(
    {
      enabled: !!restroState && !!userToken,
      queryKey:['getWorkMenu'], 
      queryFn:()=>getWorkMenu({
        restaurantId:restroState.restaurant.restaurantInfo._id,
        headerAuth:userToken.jwtToken
      }),
      onSuccess:(data)=>{
        console.log({data:data?.data?.data})
        
        restroState.setCategories(data?.data?.data?.category);
  
      }
  })
  return (
    
    <Stack
      sx={{
        height: "100vh",
        width: "100%",
        pt: 3,
        p: {
            xs:1,
            md:2
        },
        overflow: "hidden",
      }}
    >
      <TopBar title={"Manage Menu"} home={true} backUrl={"/"}/>
        {isLoading?
        <><CircularProgress/></>
        :
        <Stack width={"100%"} direction={{
          xs:"column",
          md:"row"
        }} sx={{
          overflow:"hidden"
        }}>
          <Stack sx={{
              width:{
                  xs:"100%",
                  md:"40%"
              },
              height:{
                  xs:"45%",
                  md:"100%"
              }

          }}>
              <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"} px={{
                  xs:0,
                  md:2
              }}  py={1}>
                  <Typography variant="h4">Categories</Typography>
                  <Button
                      variant="contained"
                      onClick={()=>{
                        setOpen(true);
                        setisItem(false);
                      }}
                      sx={{
                      borderRadius: 1,
                      mx: 1,
                      }}
                  >
                      <AddIcon />
                      Add Category
                  </Button>
              </Stack>
            <Stack direction={"row"} sx={{
              
              flexWrap:"wrap",
              maxHeight:"100%",
              width:{
                  xs:"100%"
              },
              overflowY:"auto",
              overflowX:"hidden",
              pt:3,
              pb:10,
              px:2,
              gap:2
            }}>
              {restroState.restaurant.categories.map((category, index) => {
                  return (<><ManageMenuCard key={index} isCategory={true} menuVal={category} /></>);
              })}

            </Stack>
          </Stack>
          <Stack sx={{
              width:{
                  xs:"100%",
                  md:"45%"
              },
              height:{
                  xs:"45%",
                  md:"100%"
              },
              flex:1,
          }}>
              <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"} px={{
                  xs:0,
                  md:2
              }} py={1}>
                  <Typography variant="h4">Items</Typography>
                  <Button
                      variant="contained"
                      onClick={()=>{
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
                  </Button>
              </Stack>
              <Stack direction={"row"} sx={{
              
              flexWrap:"wrap",
              height:"100%",
              width:{
                  xs:"100%"
              },
              overflowY:"auto",
              overflowX:"hidden",
              pt:3,
              pb:10,
              px:2,
              gap:2
            }}>
              {"Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem mollitia quia laborum aspernatur non illum. Ex perspiciatis modi ducimus sed quia magnam ab quasi. Laudantium itaque corporis voluptate nihil aspernatur?"
                  .split(" ")
                  .map(() => {
                      return <ManageMenuCard />;
                  })}

            </Stack>
          </Stack>
        </Stack>
        }
        <BasicModal open={open} setOpen={setOpen} title={isItem?"Item":"Category"}
        >
          <AddModal isItem={isItem}/>
        </BasicModal>
    </Stack>
  );
};

export default ManageMenuHome;
