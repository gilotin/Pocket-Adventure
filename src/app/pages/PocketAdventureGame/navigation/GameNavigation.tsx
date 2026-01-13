import styles from "./GameNavigation.module.css";

type NavigationMenu = "crafting" | "garden" | "missions" | "shop" | "inventory";
type GameNavigationProps = {
    setGameNavigation: (menu: NavigationMenu) => void;
};

export function GameNavigation({ setGameNavigation }: GameNavigationProps) {
    const handleClickMenu = (menu: NavigationMenu) => {
        return setGameNavigation(menu);
    };

    return (
        <nav className={styles.gameNavigation}>
            <button onClick={() => handleClickMenu("crafting")}>Crafting</button>
            <button onClick={() => handleClickMenu("garden")}>Garden</button>
            <button onClick={() => handleClickMenu("missions")}>Missions</button>
            <button onClick={() => handleClickMenu("shop")}>Shop</button>
            <button onClick={() => handleClickMenu("inventory")}>Inventory</button>
        </nav>
    );
}
