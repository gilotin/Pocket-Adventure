import type { Shop } from "../../types/gameTypes";
import styles from "./Shop.module.css";

type ShopProps = {
    shop: Shop;
    onBuyItem: (itemId: string) => void;
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

export function Shop({ shop, onBuyItem }: ShopProps) {
    const handleFormFilter = (input: React.ChangeEvent<HTMLInputElement>) => {
        const filteredValue = input.currentTarget.value;
        console.log(filteredValue);
    };

    const handleBuyItem = (itemId: string) => {
        onBuyItem(itemId);
    };

    const shopInventory = shop.items.map((item) => {
        return (
            <div className={styles.itemCard} key={item.itemId}>
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
                        <legend className={styles.filterLegend}>Filter:</legend>
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
                                id="consumables"
                                value="consumables"
                                name="shop"
                            />
                            <label className={styles.formLabel} htmlFor="consumables">
                                Consumables
                            </label>
                        </div>

                        <div className={styles.inputGroup}>
                            <input
                                onChange={handleFormFilter}
                                type="radio"
                                id="items"
                                value="items"
                                name="shop"
                            />
                            <label className={styles.formLabel} htmlFor="items">
                                Items
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
