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
    handleActiveItemState: (itemId: number | null) => void;
    handleSellItems: (itemId: number) => void;
};

export function Inventory({
    inventoryItems,
    onDeleteItem,
    handleActiveItemState,
    handleSellItems,
}: InventoryProps) {
    const handleMouseEnter = (itemId: number) => () => {
        handleActiveItemState(itemId);
    };

    const handleMouseLeave = () => {
        handleActiveItemState(null);
    };

    const inventorySpace = inventoryItems?.map((item) => {
        return (
            <div
                className={styles.inventoryItem}
                key={item.itemId}
                onMouseEnter={handleMouseEnter(item.itemId)}
                onMouseLeave={handleMouseLeave}
            >
                <div>Name:{item.name}</div>
                <div>Type: {item.type}</div>
                <div>Qty:{item.quantity}</div>

                <button onClick={() => handleSellItems(item.itemId)}>Sell</button>
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onDeleteItem(item.itemId);
                    }}
                >
                    <img
                        // for testing purposes !!!
                        style={{ width: 24, height: 24 }}
                        src="icons/trash-can.svg"
                        alt="discard"
                    />
                </button>
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
