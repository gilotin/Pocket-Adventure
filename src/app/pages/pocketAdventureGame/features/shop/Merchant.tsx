import { useState } from "react";
import type { Merchant } from "../../types/gameTypes";
import styles from "./Merchant.module.css";

type MerchantProps = {
    merchant: Merchant;
    onBuyItem: (itemId: string) => void;
    selectActiveMerchantItem: (itemId: string | null) => void;
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

export function Merchant({
    merchant,
    onBuyItem,
    selectActiveMerchantItem: selectActiveMerchantItem,
}: MerchantProps) {
    const [itemFilter, setItemFilter] = useState("allItems");

    const handleFormFilter = (input: React.ChangeEvent<HTMLInputElement>) => {
        const filterType = input.currentTarget.value;

        return setItemFilter(filterType);
    };

    const handleBuyItem = (itemId: string) => {
        onBuyItem(itemId);
    };

    const handleMouseEnter = (itemId: string) => {
        selectActiveMerchantItem(itemId);
    };

    const handleMouseLeave = () => {
        selectActiveMerchantItem(null);
    };

    const merchantInventory = merchant.items
        .filter((item) => {
            if (itemFilter === "allItems") {
                return true;
            }
            return item.type === itemFilter;
        })
        .map((item) => {
            return (
                <article
                    onMouseEnter={() => handleMouseEnter(item.itemId)}
                    onMouseLeave={handleMouseLeave}
                    className={styles.itemCard}
                    key={item.itemId}
                >
                    <div className={styles.itemIcon}>
                        <img src={`icons/${item.icon}.png`} alt={item.icon} />
                    </div>
                    <div className={styles.itemName}>Name:{item.name}</div>
                    <div>Qty:{item.quantity}</div>
                    <div className={styles.iconGroup}>
                        <button
                            className={styles.buyBtn}
                            type="button"
                            onClick={() => handleBuyItem(item.itemId)}
                        >
                            <img src="/icons/money-bag.png" alt="buy item" />
                        </button>
                    </div>
                </article>
            );
        });

    return (
        <section className={styles.merchantSpace}>
            <div>
                <form className={styles.filterForm}>
                    <fieldset className={styles.fieldset}>
                        <div className={styles.inputGroup}>
                            <input
                                onChange={handleFormFilter}
                                type="radio"
                                id="allItems"
                                value="allItems"
                                name="merchant"
                                checked={itemFilter === "allItems"}
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
                                name="merchant"
                                checked={itemFilter === "materials"}
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
                                name="merchant"
                                checked={itemFilter === "consumable"}
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
                                name="merchant"
                                checked={itemFilter === "equipment"}
                            />
                            <label className={styles.formLabel} htmlFor="equipment">
                                Equipment
                            </label>
                        </div>
                    </fieldset>
                </form>
            </div>
            <div>
                <p className={styles.timerInfo}>
                    Time before merchant reset: {calculateRemainingTime(merchant.timer)}
                </p>

                <div>
                    {merchant.items.length
                        ? merchantInventory
                        : "Merchant inventory is currently empty. Try again latter."}
                </div>
            </div>
            {/* <img src="/assets/merchant.png" alt="" /> */}
        </section>
    );
}
