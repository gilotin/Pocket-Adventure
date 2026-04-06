import type { Item } from "../../types/gameTypes";
import styles from "./ItemCard.module.css";

type ItemCardProps = {
    item: Item;
    handleMouseEnter: (itemid: string) => void;
    handleMouseLeave: () => void;
    handleSellItems: (itemId: string) => void;
    confirmDeleteItem: (itemId: string) => void;
    handleEquipItem: () => void;
    handleUnequipItem: () => void;
};

export function ItemCard({
    item,
    handleMouseEnter,
    handleMouseLeave,
    handleSellItems,
    confirmDeleteItem,
    handleEquipItem,
}: ItemCardProps) {
    return (
        <div
            className={styles.itemCard}
            key={item.itemId}
            onMouseEnter={() => handleMouseEnter(item.itemId)}
            onMouseLeave={handleMouseLeave}
        >
            <div>Name:{item.name}</div>
            <div>Type: {item.type}</div>
            <div>Qty:{item.quantity}</div>

            {item.type === "equipment" && <button onClick={handleEquipItem}>Equip</button>}
            <button onClick={() => handleSellItems(item.itemId)}>Sell</button>
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    confirmDeleteItem(item.itemId);
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
}
