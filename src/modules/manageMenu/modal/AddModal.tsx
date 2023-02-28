import { Button, CircularProgress, Stack } from "@mui/material";
import React, { useRef, useState } from "react";
import ValueForm from "./ValueForm";
import { useMutation } from "@tanstack/react-query";
import { createCategory, createItem } from "store/api/axiosSetup";
import { useRouter } from "next/router";

// {
//   "categoryName":"Main Course",
//   "isAvailable": true,
//   "categoryRank":3

// }

const AddModal = ({
  isItem,
  userToken,
  viewOne,
  restroState,
  setOpen,
  setErrorOpener,
  errorOpener,
}: {
  isItem: boolean;
}) => {
  const [data, setData] = useState(() => {
    if (isItem) {
      return {
        categoryId: {
          value: viewOne?.viewObj?.categoryId ?? "",
          type: "select",
          name: "categoryId",
          title: "Catgeory",
          selectItem: restroState.restaurant.categories.map((cate) => {
            return {
              name: cate.categoryName,
              id: cate._id,
            };
          }),
        },
        packingCharges: {
          value: viewOne?.viewObj?.packingCharges ?? "0",
          type: "text",
          name: "packingCharges",
          title: "Packing Charges",
        },
        // "itemrank":{
        //   value:"",
        //   type:"text",
        //   name:"itemrank",
        //   title:"Item Rank"
        // },
        ignoreTaxes: {
          value: viewOne?.viewObj?.ignoreTaxes ?? true,
          type: "boolean",
          name: "ignoreTaxes",
        },
        // "favorite":{
        //   value:true,
        //   type:"boolean",
        //   name:"favorite",
        // },
        ignoreDiscounts: {
          value: viewOne?.viewObj?.ignoreDiscounts ?? true,
          type: "boolean",
          name: "ignoreDiscounts",
        },
        available: {
          value: viewOne?.viewObj?.available ?? true,
          type: "boolean",
          name: "available",
        },
        itemName: {
          value: viewOne?.viewObj?.itemName ?? "",
          type: "text",
          name: "itemName",
          title: "Item Name",
        },
        itemShortName: {
          value: viewOne?.viewObj?.itemShortName ?? "",
          type: "text",
          name: "itemShortName",
          title: "Item Short Name",
        },
        itemAttributeid: {
          value: viewOne?.viewObj?.itemAttributeid ?? "",
          type: "text",
          name: "itemAttributeid",
          title: "Item Attribute id",
        },
        variations:{
          value: viewOne?.viewObj?.variations ?? [],
          type: "option",
          name: "variations",
          title: "Variations",
        },
        addons:{
          value: viewOne?.viewObj?.addons ?? [],
          type: "option",
          name: "addons",
          title: "Addons",
        },
        // "itemdescription":{
        //   value:"",
        //   type:"text",
        //   name:"itemdescription",
        //   title:"Item Description"
        // },
        // "minimumpreparationtime":{
        //   value:"",
        //   type:"text",
        //   name:"minimumpreparationtime",
        //   title:"minimumpreparationtime"
        // },
        price: {
          value: viewOne?.viewObj?.price ?? "0",
          type: "text",
          name: "price",
          title: "price",
        },
        itemTax: {
          value: viewOne?.viewObj?.itemTax ?? "0",
          type: "text",
          name: "itemTax",
          title: "itemTax",
        },
      };
    } else {
      return {
        categoryName: {
          value: viewOne?.viewObj?.categoryName ?? "",
          type: "text",
          name: "categoryName",
          title: "Category Name",
        },
        isAvailable: {
          value: viewOne?.viewObj?.isAvailable ?? true,
          type: "boolean",
          name: "isAvailable",
          title: "Available",
        },
        // "categoryRank":{
        //   value:"",
        //   type:"number",
        //   name:"categoryRank",
        //   title:"Category Rank"
        // }
      };
    }
  });
  const router = useRouter();
  const { mutate, isLoading } = useMutation(createCategory, {
    onSuccess: (data, variables, context) => {
      console.log({
        data: data.data.data,
        variables,
        context,
      });
      restroState.setCategories([
        ...restroState.restaurant.categories,
        data.data.data?.categoryResult,
      ]);
      // setNewUser(false);
      setOpen();
      
    },
    onError(error, variables, context) {
      console.log({ error });
      setErrorOpener({
        ...errorOpener,
        message: error?.response?.data?.message,
        open: true,
      });
    },
  });
  const itemMutatation = useMutation(createItem, {
    onSuccess: async (data, variables, context) => {
      let categoryAddedRestro = await restroState?.restaurant?.categories?.map(
        (cat) => {
          if (cat._id == data.data.data.categoryResult._id) {
            return data.data.data.categoryResult;
          } else {
            return cat;
          }
        }
      );
      console.log({
        data: data.data.data,
        variables,
        context,
        categoryAddedRestro,
      });
      restroState.setCategories([...categoryAddedRestro]);
      setOpen();
      if(viewOne?.open){
        router.reload();
        setErrorOpener({
          ...errorOpener,
          message: "SuccesFully Updated a menu Item",
          open: true,
          severity: "success",
        });
      }else{
        router.reload();
        setErrorOpener({
          ...errorOpener,
          message: "SuccesFully Added",
          open: true,
          severity: "success",
        });

      }

      // setNewUser(false);
    },
    onError(error, variables, context) {
      console.log({ error });
      setErrorOpener({
        ...errorOpener,
        message: error?.response?.data?.message ?? error,
        open: true,
        severity: "error",
      });
    },
  });
  return (
    <Stack
      sx={{
        gap: 1,
        p: 1,
        overflowX: "hidden",
      }}
    >
      {Object.keys(data).map((values, index) => (
        <ValueForm
          setData={setData}
          key={index}
          values={data[values]}
          data={data}
        />
      ))}
      <Button
        onClick={() => {
          let sendData = {};
          if (isItem) {
            sendData = {
              categoryId: data.categoryId?.value,
              packingCharges: data.packingCharges?.value,
              itemrank: data.itemrank?.value,
              ignoreTaxes: data.ignoreTaxes?.value,
              favorite: data.favorite?.value,
              ignoreDiscounts: data.ignoreDiscounts?.value,
              available: data.available?.value,
              itemName: data.itemName?.value,
              itemShortName: data.itemShortName?.value,
              itemAttributeid: data.itemAttributeid?.value,
              itemdescription: data.itemdescription?.value,
              minimumpreparationtime: data.minimumpreparationtime?.value,
              price: data.price?.value,
              itemTax: data.itemTax?.value,
              variations:data?.variations?.value,
              addons: data?.addons?.value
            };
            console.log({sendData});
            if(viewOne?.open && viewOne?.viewObj?._id){
              sendData.menuId = viewOne?.viewObj?._id;
              sendData.isEdit = viewOne?.open;
              console.log({
                sendData
              })
              itemMutatation.mutate({
                sendData,
                headerAuth: userToken.jwtToken,
              });

            }else{
              console.log({
                sendData
              })
              itemMutatation.mutate({
                sendData,
                headerAuth: userToken.jwtToken,
              });
            }
          } else {
            sendData = {
              categoryName: data["categoryName"]?.value,
              isAvailable: data.isAvailable?.value,
              categoryRank: data.categoryRank?.value,
            };
            console.log(sendData);
            mutate({
              sendData,
              headerAuth: userToken.jwtToken,
            });
          }
        }}
        variant="contained"
        disabled={isLoading || itemMutatation.isLoading}
      >
        {isLoading || itemMutatation.isLoading ? <CircularProgress /> : "Add"}
      </Button>
    </Stack>
  );
};

export default AddModal;
