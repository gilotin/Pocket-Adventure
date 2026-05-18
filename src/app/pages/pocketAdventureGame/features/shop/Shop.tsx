import { useState } from "react";
import type { Shop } from "../../types/gameTypes";
import styles from "./Shop.module.css";

type ShopProps = {
    shop: Shop;
    onBuyItem: (itemId: string) => void;
    selectActiveShopItem: (itemId: string | null) => void;
};

function calculateRemainingTime(time: number | null) {
    const currentTime = Date.now();

    if (!time || currentTime > time) {
        return "estimating time...";
    }

    if (currentTime <= time) {
        const remainingTime = time - currentTime;
        const convertedTime = Math.floor(remainingTime / (1000 * 60));
        return `~ ${convertedTime} minutes`;
    }
}

export function Shop({ shop, onBuyItem, selectActiveShopItem }: ShopProps) {
    const [itemFilter, setItemFilter] = useState("");

    const handleFormFilter = (input: React.ChangeEvent<HTMLInputElement>) => {
        const filterType = input.currentTarget.value;
        if (filterType === "allItems") {
            return setItemFilter("");
        }
        return setItemFilter(filterType);
    };

    const handleBuyItem = (itemId: string) => {
        onBuyItem(itemId);
    };

    const handleMouseEnter = (itemId: string) => {
        selectActiveShopItem(itemId);
    };

    const handleMouseLeave = () => {
        selectActiveShopItem(null);
    };

    const shopInventory = shop.items
        .filter((item) => {
            if (itemFilter === "") {
                return true;
            }
            return item.type === itemFilter;
        })
        .map((item) => {
            return (
                <div
                    onMouseEnter={() => handleMouseEnter(item.itemId)}
                    onMouseLeave={handleMouseLeave}
                    className={styles.itemCard}
                    key={item.itemId}
                >
                    <div>Name:{item.name}</div>
                    <div>Type: {item.type}</div>
                    <div>Qty:{item.quantity}</div>
                    <button onClick={() => handleBuyItem(item.itemId)}>buy</button>
                </div>
            );
        });

    return (
        <>
            <div>
                <form className={styles.filterForm}>
                    <fieldset className={styles.fieldset}>
                        <div className={styles.inputGroup}>
                            <input
                                onChange={handleFormFilter}
                                type="radio"
                                id="allItems"
                                value="allItems"
                                name="shop"
                            />
                            <label className={styles.formLabel} htmlFor="allItems">
                                All
                            </label>
                        </div>

                        <div className={styles.inputGroup}>
                            <input
                                onChange={handleFormFilter}
                                type="radio"
                                id="materials"
                                value="materials"
                                name="shop"
                            />
                            <label className={styles.formLabel} htmlFor="materials">
                                Materials
                            </label>
                        </div>

                        <div className={styles.inputGroup}>
                            <input
                                onChange={handleFormFilter}
                                type="radio"
                                id="consumable"
                                value="consumable"
                                name="shop"
                            />
                            <label className={styles.formLabel} htmlFor="consumable">
                                Consumables
                            </label>
                        </div>

                        <div className={styles.inputGroup}>
                            <input
                                onChange={handleFormFilter}
                                type="radio"
                                id="equipment"
                                value="equipment"
                                name="shop"
                            />
                            <label className={styles.formLabel} htmlFor="equipment">
                                Equipment
                            </label>
                        </div>
                    </fieldset>
                </form>
            </div>
            <div className={styles.shopWrapper}>
                <p>Time before shop reset: {calculateRemainingTime(shop.timer)}</p>

                <div>
                    {shop.items.length
                        ? shopInventory
                        : "Shop is currently empty. Try again latter."}
                </div>
            </div>
        </>
    );
}
