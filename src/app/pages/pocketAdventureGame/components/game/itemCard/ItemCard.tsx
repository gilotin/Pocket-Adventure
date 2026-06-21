import type { Item } from "../../../types/gameTypes";
import styles from "./ItemCard.module.css";

type ItemCardProps = {
    item: Item;
    handleMouseEnter: (itemid: string) => void;
    handleMouseLeave: () => void;
    onSellItem: (itemId: string) => void;
    confirmDeleteItem: (itemId: string) => void;
    onEquipItem: () => void;
};

export function ItemCard({
    item,
    handleMouseEnter,
    handleMouseLeave,
    onSellItem,
    confirmDeleteItem,
    onEquipItem,
}: ItemCardProps) {
    return (
        <article
            className={styles.itemCard}
            onMouseEnter={() => handleMouseEnter(item.itemId)}
            onMouseLeave={handleMouseLeave}
        >
            <div className={styles.itemIcon}>
                <img src={`icons/${item.icon}.png`} alt={item.icon} />
            </div>
            <div className={styles.itemName}>{item.name}</div>

            <div className={styles.iconGroup}>
                {item.type === "equipment" && (
                    <button className={styles.iconEquip} onClick={onEquipItem}>
                        <img src="/icons/plus.png" alt="equip item" />
                    </button>
                )}
                <button
                    type="button"
                    className={styles.sellBtn}
                    onClick={() => onSellItem(item.itemId)}
                >
                    <img src="icons/money-bag.png" alt="sell item" />
                </button>
                <button
                    type="button"
                    className={styles.deleteBtn}
                    onClick={(e) => {
                        e.stopPropagation();
                        confirmDeleteItem(item.itemId);
                    }}
                >
                    <img src="icons/delete.png" alt="discard item" />
                </button>
            </div>
        </article>
    );
}
