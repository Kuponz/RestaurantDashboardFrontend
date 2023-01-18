import React, { useState } from "react";
import Categories from "../MenuListPage/Categories";
import items from "../MenuListPage/data";
import MenuCard from "../MenuListPage/Menucard";
const allCategories = ["all", ...new Set(items.map((item) => item.category))];

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
        <main>
            <section className="menu section">

                <Categories
                    categories={categories}
                    activeCategory={activeCategory}
                    filterItems={filterItems}
                />
                <MenuCard items={menuItems} />
            </section>
        </main>
    );
};
export default Display;
