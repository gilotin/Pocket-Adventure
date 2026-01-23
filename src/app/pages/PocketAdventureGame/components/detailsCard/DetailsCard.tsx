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
                    <p>Item description:</p>
                    <p>item type:{activeItem?.type}</p>
                    <p>Armor</p>
                    <p>level:5</p>
                </div>
                <div className={styles.stats}>
                    <p>ATT:15</p>
                    <p>Speed:2</p>
                </div>
                <div className={styles.flavorText}></div>
                <p>quantity:{activeItem?.quantity}</p>
                <p>value:{activeItem?.itemValue} gold</p>
            </section>
        </div>
    );
}
