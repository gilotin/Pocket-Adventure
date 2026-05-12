import type { Shop } from "../../types/gameTypes";
import styles from "./Shop.module.css";

type ShopProps = {
    shop: Shop;
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

export function Shop({ shop }: ShopProps) {
    const shopInventory = shop.items.map((item) => {
        return (
            <div className={styles.itemCard} key={item.itemId}>
                <div>Name:{item.name}</div>
                <div>Type: {item.type}</div>
                <div>Qty:{item.quantity}</div>
                <button>buy</button>
            </div>
        );
    });

    return (
        <>
            <div>
                <form>
                    <fieldset>
                        <legend>Filter:</legend>
                        <input type="radio" id="materials" value="materials" name="shop" />
                        <label htmlFor="materials">Materials</label>

                        <input type="radio" id="consumables" value="consumables" name="shop" />
                        <label htmlFor="consumables">Consumables</label>

                        <input type="radio" id="items" value="items" name="shop" />
                        <label htmlFor="items">Items</label>
                    </fieldset>
                </form>
            </div>
            <div className={styles.shopWrapper}>
                <p>Time before shop reset: {calculateRemainingTime(shop.timer)}</p>

                <div>{shopInventory}</div>
            </div>
        </>
    );
}
