import type { GameMenuState } from "../types/gameTypes";
import styles from "./GameNavigation.module.css";

type NavigationMenu = "crafting" | "garden" | "missions" | "shop" | "inventory" | "character";
type GameNavigationProps = {
    setGameNavigation: (menu: NavigationMenu) => void;
    gameNavigation: GameMenuState;
};

export function GameNavigation({ setGameNavigation, gameNavigation }: GameNavigationProps) {
    const menuList: { label: string; value: NavigationMenu }[] = [
        { label: "Crafting", value: "crafting" },
        { label: "Garden", value: "garden" },
        { label: "Missions", value: "missions" },
        { label: "Shop", value: "shop" },
        { label: "Inventory", value: "inventory" },
        { label: "Character", value: "character" },
    ];

    const handleClickMenu = (menu: NavigationMenu) => {
        return setGameNavigation(menu);
    };

    const navigationMenu = menuList.map((button, index) => {
        return (
            <button
                className={gameNavigation === button.value ? styles.active : ""}
                key={index}
                onClick={() => handleClickMenu(button.value)}
            >
                {button.label}
            </button>
        );
    });

    return <nav className={styles.gameNavigation}>{navigationMenu}</nav>;
}
