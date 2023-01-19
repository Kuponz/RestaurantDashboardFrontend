import React from "react";

const Menu = ({ items }) => {
    return (
        <div className="section-center">
            {items.map((item) => {
                const { id, title, price } = item;
                return (
                    <article key={id} className="menu-item">
                        <div className="item-info">
                            <header>
                                <h4>{title}</h4>
                                <h4 className="price">Rs. {price}</h4>
                            </header>
                        </div>
                    </article>
                );
            })}
        </div>
    );
};
export default Menu;