import { useState } from "react";
import type { ItemStore } from "../../../types/gameTypes";

export function useInventory() {
    const [inventoryItems, setInventoryItems] = useState<ItemStore>([]);
    const [activeItemId, setActiveItemId] = useState<string | null>(null);
    const [showDetailsCard, setShowDetailsCard] = useState(false);

    const activeItem = inventoryItems.find((item) => item.itemId === activeItemId) ?? null;

    const deleteItemById = (itemId: string) => {
        setInventoryItems((prev) => {
            const updated = prev.filter((item) => {
                item.itemId !== itemId;
            });
            return updated;
        });
        setActiveItemId(null);
        setShowDetailsCard(false);
    };

    const selectItem = (itemId: string | null) => {
        if (!itemId) {
            setActiveItemId(null);
            setShowDetailsCard(false);
            return;
        }

        setActiveItemId(itemId);
        setShowDetailsCard(true);
    };

    const sellItem = (itemId: string): number => {
        let itemPrice = 0;
        setInventoryItems((prev) => {
            const item = prev.find((i) => i.itemId === itemId);
            if (!item) return prev;

            itemPrice = item.itemValue;
            return prev.filter((i) => i.itemId !== itemId);
        });

        setActiveItemId(null);
        setShowDetailsCard(false);

        return itemPrice;
    };

    // TODO : equipItem and unequipItem

    return {
        inventoryItems,
        activeItem,
        showDetailsCard,
        deleteItemById,
        selectItem,
        sellItem,
        setInventoryItems,
    };
}
