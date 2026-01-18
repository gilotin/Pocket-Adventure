import { useEffect, useState } from "react";
import styles from "./Inventory.module.css";

type Item = {
    name: string;
    type: string;
    quantity: number;
};

export function Inventory() {
    const [inventoryItems, setInventoryItems] = useState<Item[] | null>(null);

    useEffect(() => {
        const data = localStorage.getItem("spawnedData");

        try {
            if (!data) {
                return;
            } else {
                setInventoryItems(JSON.parse(data));
            }

            return;
        } catch {
            setInventoryItems(null);
            return;
        }
    }, []);

    // const inventorySpace = inventoryItems?.map((x) => {
    //     return <div>

    //     </div>;
    // });

    return (
        <>
            <section className={styles.inventoryWrapper}>
                <h3 className={styles.inventoryHeader}>Inventory Bag</h3>
                <div className={styles.inventorySpace}></div>
            </section>
        </>
    );
}
