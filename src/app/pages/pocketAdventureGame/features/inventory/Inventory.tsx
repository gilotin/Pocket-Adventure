import type { Dispatch, SetStateAction } from "react";
import styles from "./Inventory.module.css";
import type { Item } from "../../types/gameTypes";
import { ItemCard } from "../../components/itemCard/ItemCard";

type InventoryProps = {
    inventoryItems: Item[];
    onDeleteItem: (itemId: string) => void;
    selectActiveItem: (itemId: string | null) => void;
    onSellItem: (itemId: string) => void;
    setConfirmAction: Dispatch<SetStateAction<(() => void) | null>>;
    equipItem: () => void;
    unequipItem: () => void;
};

export function Inventory({
    inventoryItems,
    onDeleteItem,
    selectActiveItem,
    onSellItem,
    setConfirmAction,
    equipItem,
    unequipItem,
}: InventoryProps) {
    const handleMouseEnter = (itemId: string) => {
        selectActiveItem(itemId);
    };

    const handleMouseLeave = () => {
        selectActiveItem(null);
    };

    const confirmDeleteItem = (itemId: string) => {
        setConfirmAction(() => () => onDeleteItem(itemId));
    };

    const handleEquipItem = () => {
        equipItem();
    };

    const handleUnequipItem = () => {
        unequipItem();
    };

    const inventorySpace = inventoryItems
        ?.filter((item) => !item.isEquipped)
        .map((item) => (
            <ItemCard
                key={item.itemId}
                item={item}
                handleMouseEnter={handleMouseEnter}
                handleMouseLeave={handleMouseLeave}
                onSellItem={onSellItem}
                confirmDeleteItem={confirmDeleteItem}
                handleEquipItem={handleEquipItem}
                handleUnequipItem={handleUnequipItem}
            />
        ));

    return (
        <>
            <section className={styles.inventoryWrapper}>
                {inventorySpace.length > 0 ? (
                    <div className={styles.inventorySpace}>{inventorySpace}</div>
                ) : (
                    <p>The bag is empty</p>
                )}
            </section>
        </>
    );
}
