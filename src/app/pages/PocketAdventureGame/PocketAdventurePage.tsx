import { useEffect, useState, type JSX } from "react";
import { GameNavigation } from "./navigation/GameNavigation";
import styles from "./PocketAdventurePage.module.css";
import { Crafting } from "./features/crafting/Crafting";
import { Inventory } from "./features/inventory/Inventory";
import { Garden } from "./features/crafting/garden/Garden";
import { Missions } from "./features/missions/Missions";
import { Shop } from "./features/shop/Shop";
import { STORAGE_KEY } from "./MockedData/TestItemGenerator";
import { deleteItem, loadStorageData } from "./services/storageOperations";

export type GameMenuState = "crafting" | "garden" | "missions" | "shop" | "inventory";

type GameMenuStateKey = Exclude<GameMenuState, null>;

type Item = {
    itemId: number;
    name: string;
    type: string;
    quantity: number;
};

type InventoryType = Item[];

export function PocketAdventurePage() {
    const [gameNavigation, setGameNavigation] = useState<GameMenuState>("inventory");
    const [inventoryItems, setInventoryItems] = useState<InventoryType>([]);

    useEffect(() => {
        setInventoryItems(loadStorageData(STORAGE_KEY));
    }, []);

    const handleDeleteItem = (itemId: number) => {
        deleteItem(STORAGE_KEY, itemId);
        setInventoryItems(loadStorageData(STORAGE_KEY));
    };

    const featureMap: Record<GameMenuStateKey, JSX.Element> = {
        crafting: <Crafting />,
        inventory: <Inventory inventoryItems={inventoryItems} onDeleteItem={handleDeleteItem} />,
        missions: <Missions />,
        garden: <Garden />,
        shop: <Shop />,
    };

    return (
        <>
            <GameNavigation setGameNavigation={setGameNavigation} gameNavigation={gameNavigation} />

            <section className={styles.gamePanelSection}>
                {gameNavigation && featureMap[gameNavigation]}
            </section>
        </>
    );
}
