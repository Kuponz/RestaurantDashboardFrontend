import React, { useState } from "react";
import Categories from "./Categories";
import items from "./data";
import MenuCard from "./MenuCard";
import { Stack, TextField } from "@mui/material";
import { flexBox, size } from "theme/defaultFunction";
const allCategories = ["all","all","all","all","all","all","all","all","all","all","all","all","all","all","all","all","all","all","all","all","all","all","all","all","all","all","all","all","all","all","all", ...new Set(items.map((item) => item.category))];

const Display = () => {

    const [menuItems, setMenuItems] = useState(items);
    const [activeCategory, setActiveCategory] = useState("");
    const [categories, setCategories] = useState(allCategories);

    const filterItems = (category) => {
        setActiveCategory(category);
        if (category === "all") {
            setMenuItems(items);
            return;
        }

        const newItems = items.filter((item) => item.category === category);
        setMenuItems(newItems);
    };

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
                <TextField label={"search"}/>
            </Stack>
            <Stack sx={{
                height:'5rem',
                width:"100%",
            }}>
                <Categories
                    categories={categories}
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
                    items.map((item, key) => <MenuCard key={key} items={item}/>)
                }
                {/* <MenuCard items={menuItems} /> */}
            </Stack>
        </Stack>
    );
};
export default Display;
