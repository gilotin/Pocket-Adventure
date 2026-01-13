import { useState, type JSX } from "react";
import { GameNavigation } from "./navigation/GameNavigation";
import styles from "./PocketAdventurePage.module.css";
import { Crafting } from "./features/crafting/Crafting";
import { Inventory } from "./features/inventory/Inventory";
import { Garden } from "./features/crafting/garden/Garden";
import { Missions } from "./features/missions/Missions";
import { Shop } from "./features/shop/Shop";

export type GameMenuState = "crafting" | "garden" | "missions" | "shop" | "inventory";

type GameMenuStateKey = Exclude<GameMenuState, null>;

const featureMap: Record<GameMenuStateKey, JSX.Element> = {
    crafting: <Crafting />,
    inventory: <Inventory />,
    missions: <Missions />,
    garden: <Garden />,
    shop: <Shop />,
};

export function PocketAdventurePage() {
    const [gameNavigation, setGameNavigation] = useState<GameMenuState>("inventory");

    return (
        <>
            <GameNavigation setGameNavigation={setGameNavigation} gameNavigation={gameNavigation} />

            <section>{gameNavigation && featureMap[gameNavigation]}</section>
        </>
    );
}
