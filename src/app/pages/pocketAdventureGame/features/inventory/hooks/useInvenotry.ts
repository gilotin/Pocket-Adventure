import { useState } from "react";
import type { Item, ItemStore } from "../../../types/gameTypes";

export function useInventory() {
    const [inventoryItems, setInventoryItems] = useState<ItemStore>([]);
    const [activeItemId, setActiveItemId] = useState<string | null>(null);
    const [showDetailsCard, setShowDetailsCard] = useState(false);

    const activeItem = inventoryItems.find((item) => item.itemId === activeItemId) ?? null;

    const deleteItemById = (itemId: string) => {
        setInventoryItems((prev) => {
            const updated = prev.filter((item) => {
                return item.itemId !== itemId;
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

    // TODO : unequipItem
    const equipItem = () => {
        if (!activeItemId) return;

        setInventoryItems((prev) => {
            const activeItem = prev.find((item) => item.itemId === activeItemId);

            if (!activeItem) return prev;
            if (activeItem.type !== "equipment") return prev;
            if (!activeItem.equipmentSlot) return prev;

            const updatedInventory = prev.map((item) => {
                if (item.itemId === activeItem.itemId) {
                    return { ...item, isEquipped: true };
                }
                if (item.equipmentSlot === activeItem.equipmentSlot && item.isEquipped) {
                    return { ...item, isEquipped: false };
                }

                return item;
            });

            return updatedInventory;
        });

        setShowDetailsCard(false);
    };

    const unequipItem = () => {
        if (!activeItemId) return;
        setInventoryItems((prev) => {
            const activeItem = prev.find((item) => item.itemId === activeItemId);

            if (!activeItem) return prev;

            const updatedInventory = prev.map((item) => {
                if (item.itemId === activeItemId) {
                    return { ...item, isEquipped: false };
                }
                return item;
            });
            return updatedInventory;
        });

        setShowDetailsCard(false);
    };

    return {
        inventoryItems,
        activeItem,
        showDetailsCard,
        deleteItemById,
        selectItem,
        sellItem,
        setInventoryItems,
        equipItem,
        unequipItem,
    };
}
