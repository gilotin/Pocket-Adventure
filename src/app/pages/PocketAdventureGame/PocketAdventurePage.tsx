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
import { DetailsCard } from "./components/detailsCard/DetailsCard";

export type GameMenuState = "crafting" | "garden" | "missions" | "shop" | "inventory";

type GameMenuStateKey = Exclude<GameMenuState, null>;

type Item = {
    itemId: number;
    name: string;
    type: string;
    quantity: number;
    itemValue: number;
};

type InventoryType = Item[];

export function PocketAdventurePage() {
    const [gameNavigation, setGameNavigation] = useState<GameMenuState>("inventory");
    const [inventoryItems, setInventoryItems] = useState<InventoryType>([]);
    const [showDetailsCard, setShowDetailsCard] = useState<boolean>(false);
    const [activeItemId, setActiveItemId] = useState<number | null>(null);

    useEffect(() => {
        setInventoryItems(loadStorageData(STORAGE_KEY));
    }, []);

    const handleDeleteItem = (itemId: number) => {
        deleteItem(STORAGE_KEY, itemId);
        setInventoryItems(loadStorageData(STORAGE_KEY));

        setActiveItemId(null);
        setShowDetailsCard(false);
    };

    const handleActiveItemState = (itemId: number | null) => {
        if (itemId === null) {
            setActiveItemId(null);
            setShowDetailsCard(false);
            return;
        }
        setActiveItemId(itemId);
        setShowDetailsCard(true);
    };

    const featureMap: Record<GameMenuStateKey, JSX.Element> = {
        crafting: <Crafting />,
        inventory: (
            <Inventory
                inventoryItems={inventoryItems}
                onDeleteItem={handleDeleteItem}
                handleActiveItemState={handleActiveItemState}
            />
        ),
        missions: <Missions />,
        garden: <Garden />,
        shop: <Shop />,
    };

    const activeItem = inventoryItems.find((item) => item.itemId === activeItemId) ?? null;

    return (
        <>
            <GameNavigation setGameNavigation={setGameNavigation} gameNavigation={gameNavigation} />

            <section className={styles.gamePanelSection}>
                {gameNavigation && featureMap[gameNavigation]}
            </section>
            {showDetailsCard && <DetailsCard activeItem={activeItem} />}
        </>
    );
}
