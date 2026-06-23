import type { GameMenuState } from "../types/gameTypes";
import styles from "./GameNavigation.module.css";

type GameNavigationProps = {
    setGameNavigation: (menu: GameMenuState) => void;
    gameNavigation: GameMenuState;
};

export function GameNavigation({ setGameNavigation, gameNavigation }: GameNavigationProps) {
    const menuList: { label: string; value: GameMenuState }[] = [
        { label: "Crafting", value: "crafting" },
        { label: "Garden", value: "garden" },
        { label: "Missions", value: "missions" },
        { label: "Merchant", value: "merchant" },
        { label: "Inventory", value: "inventory" },
        { label: "Character", value: "character" },
    ];

    const handleClickMenu = (menu: GameMenuState) => {
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
