import styles from "./Inventory.module.css";

type Item = {
    itemId: number;
    name: string;
    type: string;
    quantity: number;
};

type InventoryProps = {
    inventoryItems: Item[];
    onDeleteItem: (itemId: number) => void;
};

export function Inventory({ inventoryItems, onDeleteItem }: InventoryProps) {
    const inventorySpace = inventoryItems?.map((item) => {
        return (
            <div className={styles.inventoryItem} key={item.itemId}>
                <div>Name:{item.name}</div>
                <div>Type: {item.type}</div>
                <div>Qty:{item.quantity}</div>
                <button onClick={() => onDeleteItem(item.itemId)}>remove item</button>
            </div>
        );
    });

    return (
        <>
            <section className={styles.inventoryWrapper}>
                <h3 className={styles.inventoryHeader}>Inventory Bag</h3>
                {inventorySpace.length > 0 ? (
                    <div className={styles.inventorySpace}>{inventorySpace}</div>
                ) : (
                    <p>The bag is empty</p>
                )}
            </section>
        </>
    );
}
