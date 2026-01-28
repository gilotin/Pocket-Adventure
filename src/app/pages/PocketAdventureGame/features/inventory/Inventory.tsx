import type { Dispatch, SetStateAction } from "react";
import styles from "./Inventory.module.css";
import type { Item } from "../../types/gameTypes";
import { ItemCard } from "../../components/itemCard/ItemCard";

type InventoryProps = {
    inventoryItems: Item[];
    onDeleteItem: (itemId: number) => void;
    handleActiveItemState: (itemId: number | null) => void;
    handleSellItems: (itemId: number) => void;
    setConfirmAction: Dispatch<SetStateAction<(() => void) | null>>;
    equipItem: () => void;
};

export function Inventory({
    inventoryItems,
    onDeleteItem,
    handleActiveItemState,
    handleSellItems,
    setConfirmAction,
    equipItem,
}: InventoryProps) {
    const handleMouseEnter = (itemId: number) => () => {
        handleActiveItemState(itemId);
    };

    const handleMouseLeave = () => {
        handleActiveItemState(null);
    };

    const confirmDeleteItem = (itemId: number) => {
        setConfirmAction(() => () => onDeleteItem(itemId));
    };

    const handleEquipItem = () => {
        equipItem();
    };

    const inventorySpace = inventoryItems?.map((item) => {
        {
            if (!item.isEquipped) {
                return (
                    <ItemCard
                        item={item}
                        handleMouseEnter={handleMouseEnter}
                        handleMouseLeave={handleMouseLeave}
                        handleSellItems={handleSellItems}
                        confirmDeleteItem={confirmDeleteItem}
                        handleEquipItem={handleEquipItem}
                    />
                );
            }
        }
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
