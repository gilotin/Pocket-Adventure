import type { Item } from "../../types/gameTypes";
import styles from "./DetailsCard.module.css";

type FilterItemDataProps = {
    activeItem: Item | null;
};

export function DetailsCard({ activeItem }: FilterItemDataProps) {
    return (
        <div className={styles.wrapper}>
            <section className={styles.detailsCard}>
                <h1 className={styles.header}>{activeItem?.name}</h1>
                <div className={styles.description}>
                    <p>
                        item type:
                        {activeItem?.type === "equipment"
                            ? activeItem.equipmentSlot
                            : activeItem?.type}
                    </p>
                    <p>{activeItem?.itemLevel}</p>
                </div>
                {activeItem?.stats && (
                    <div className={styles.stats}>
                        <p>ATT:{activeItem?.stats?.attack}</p>
                        <p>Armor:{activeItem?.stats?.armor}2</p>
                        <p>Elemental Protection:{activeItem?.stats?.elementalProtection}</p>
                        <p>Recovery: {activeItem?.stats?.recovery}</p>
                        <p>Drop chance: {activeItem?.stats?.dropChance}</p>
                    </div>
                )}
                <div className={styles.flavorText}></div>
                <p>quantity:{activeItem?.quantity}</p>
                <p>value:{activeItem?.itemValue} gold</p>
            </section>
        </div>
    );
}
