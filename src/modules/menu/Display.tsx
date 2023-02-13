import React, { useEffect, useState } from "react";
import Categories from "./Categories";
import items from "./data";
import MenuCard from "./MenuCard";
import { Stack, TextField } from "@mui/material";
import { flexBox, size } from "theme/defaultFunction";

const Display = ({val, setValue, variableip, menuInfo, setmenuInfo}) => {

    const [activeCategory, setActiveCategory] = useState({
        _id:"ALL",
        categoryName:"All"
    });
    
    const [menuItems, setMenuItems] = useState(()=>{
        let newMenu:any[] =[];
        menuInfo.categories.forEach(cate=>{
            newMenu.concat(cate.menu);
        })
        return newMenu;
    });
    const [searchMenuItem, setsearchMenuItem] = useState(()=>{
        return ({
            menuItem:[],
            open:false,
            value:""
        })
    });
    const filterItems = (category) => {

        setActiveCategory(category);
        if (category._id == "ALL") {
            let newMenu:any[] =[];
            for(let i = 0;i<menuInfo?.categories?.length;i++){
                newMenu.concat(menuInfo?.categories[i]?.menu);
            }
            setMenuItems(newMenu);
        }else{
            // let newItems= menuInfo.categories.filter(cate=>{
            //     if(cate._id == category._id){
            //         return cate.menu;
            //     }
            // })
            let newMenu=[];
            // console.log(newMenu, menuInfo, category);
            for(let i = 0;i<menuInfo?.categories?.length;i++){
                if(menuInfo?.categories[i]?._id==category._id){
                    newMenu = [...newMenu, ...menuInfo?.categories[i]?.menu];
                }
            }
            setMenuItems(newMenu);

        }
    };

    const changeEventHandler = (event)=>{
        if(event.target.value != ""){
            console.log({
                menuItems,
                activeCategory,
                menuInfo,
                value:event.target.value
            })
            let newMenuInfo = [];
            const regex = new RegExp(event.target.value, 'i');
            menuInfo.categories.filter(value=>{
                value.menu.map(valMenu=>{
                    console.log({
                       iName: valMenu?.itemName.match(regex),
                       i2Name:valMenu?.itemAttributeid.match(regex),
                       i3Name: valMenu?.itemShortName.match(regex),
                       valMenu,
                       regex
                    })
                    if(valMenu?.itemName.match(regex)){
                        newMenuInfo.push({...valMenu});
                    }
                    else if(valMenu?.itemAttributeid.match(regex)){
                        newMenuInfo.push({...valMenu});
                        
                    }else if(valMenu?.itemShortName.match(regex)){
                        newMenuInfo.push({...valMenu});
                    }
                })
                return false;
            })
            console.log({
                newMenuInfo
            })
            // menuItems(newMenuInfo);
            setActiveCategory({
                _id:"ALL",
                categoryName:"All"
            })
            // setMenuItems(newMenuInfo);
            //Logic:
            
            setsearchMenuItem({
                ...searchMenuItem,open:true,
                menuItem:newMenuInfo,
                value:event.target.value

            })
        }else{
            
            setsearchMenuItem({
                ...searchMenuItem,open:false,
                value:event.target.value

            })
        }
    }
    
    useEffect(()=>{
        // console.log("useEffect Called", menuInfo, activeCategory);
        if (activeCategory._id == "ALL") {
            let newMenu:any[] =[];
            for(let i = 0;i<menuInfo?.categories?.length;i++){
                newMenu = [...newMenu, ...menuInfo?.categories[i]?.menu];
            }
            setMenuItems(newMenu);
        }else{
            let newMenu=[];
            // console.log(newMenu, menuInfo, activeCategory);
            for(let i = 0;i<menuInfo?.categories?.length;i++){
                if(menuInfo?.categories[i]?._id==activeCategory._id){
                    newMenu = [...newMenu, ...menuInfo?.categories[i]?.menu];
                }
            }
            setMenuItems(newMenu);

        }
    },[activeCategory, menuInfo.categories])
    return (
        <Stack sx={{
            // border:"4px solid green",
            overflowY:"auto",
            ...size("100%","100%"),
            width:{
                xs:"100%",
                md:"70%",
            },
            maxWidth:{
                xs:"100%",
                md:"70%",
            },
            overflowX:"hidden",
            alignItems:{
                xs:"center",
                md:"flex-start",
            },
            // flex:1,
            maxHeight:"100%",
            pt:1
        }}>
            <Stack sx={{
                height:'5rem',
                p:1,
                width:"100%"
            }}>
                <TextField label={"search"} value={searchMenuItem.value} onChange={(e)=>changeEventHandler(e)}/>
            </Stack>
            <Stack sx={{
                height:'5rem',
                width:"100%",
            }}>
                <Categories
                    setsearchMenuItem ={setsearchMenuItem}
                    categories={menuInfo.categories}
                    activeCategory={activeCategory}
                    filterItems={filterItems}
                />
            </Stack>
            <Stack sx={{
                height:"100%",
                maxHeight:"100%",
                width:"100%",
                maxWidth:"100%",

                OverflowX:"hidden",
                overflowY:"auto",
                flexWrap:{
                    xs:"nowrap",
                    md:"wrap"
                },
                // border:"5px solid blue",
                gap:2,
                padding:2,
                flexDirection:{
                    xs:"column",
                    md:"row",
                },
                pb:25
            }}>
                {
                    (searchMenuItem.open && searchMenuItem.menuItem.length > 0)?
                    searchMenuItem?.menuItem?.map((item, key) => <MenuCard variableip={variableip}  val={val} setValue={setValue} key={key} items={item}/>)

                    :
                    menuItems?.map((item, key) => <MenuCard variableip={variableip}  val={val} setValue={setValue} key={key} items={item}/>)
                }
                {/* {
                } */}
                {/* <MenuCard items={menuItems} /> */}
            </Stack>
        </Stack>
    );
};
export default Display;
