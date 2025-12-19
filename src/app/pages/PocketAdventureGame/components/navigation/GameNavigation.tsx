import styles from "./GameNavigation.module.css";

export function GameNavigation() {
    return (
        <nav className={styles.gameNavigation}>
            <button>Crafting</button>
            <button>Garden</button>
            <button>Missions</button>
            <button>Shop</button>
            <button>Inventory</button>
        </nav>
    );
}
