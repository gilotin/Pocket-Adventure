/**
 * Manages inventory state, selection, and item interactions.
 * All mutations are persisted to localStorage.
 *
 * This hook is the single entry point for modifying inventory data.
 */

import { useEffect, useState } from "react";
import type { Item, ItemStore } from "../../../types/gameTypes";
import { loadStorageData, saveToStorage } from "../../../services/storageOperations";
import { STORAGE_KEY } from "../../../constants/gameConstants";

export function useInventory() {
    const [inventoryItems, setInventoryItems] = useState<ItemStore>([]);
    const [activeItemId, setActiveItemId] = useState<string | null>(null);
    const [showDetailsCard, setShowDetailsCard] = useState(false);

    useEffect(() => {
        const loadedInventoryData = loadStorageData<ItemStore>(STORAGE_KEY, []);
        setInventoryItems(Array.isArray(loadedInventoryData) ? loadedInventoryData : []);
    }, []);

    const activeItem = inventoryItems.find((item) => item.itemId === activeItemId) ?? null;

    const deleteItemById = (itemId: string) => {
        setInventoryItems((prev) => {
            const updatedInventory = prev.filter((item) => item.itemId !== itemId);
            saveToStorage(STORAGE_KEY, updatedInventory);
            return updatedInventory;
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

    /**
     * Removes an item from inventory and returns its gold value.
     *
     * @param itemId - ID of the item to sell
     * @returns Gold earned from the item (0 if not found)
     */

    const sellItem = (itemId: string): number => {
        const item = inventoryItems.find((item) => item.itemId === itemId);
        //0 indicates invalid sell operation (item not found)
        const itemPrice = item?.itemValue ?? 0;

        setInventoryItems((prev) => {
            const updatedInventory = prev.filter((i) => i.itemId !== itemId);
            saveToStorage(STORAGE_KEY, updatedInventory);
            return updatedInventory;
        });

        setActiveItemId(null);
        setShowDetailsCard(false);
        return itemPrice;
    };

    /**
     * Equips the currently selected item.
     * Ensures only one item per equipment slot is active at a time.
     */

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
            saveToStorage(STORAGE_KEY, updatedInventory);
            return updatedInventory;
        });

        setShowDetailsCard(false);
    };

    const unequipItem = () => {
        if (!activeItemId) return;
        setInventoryItems((prev) => {
            const updatedInventory = prev.map((item) => {
                if (item.itemId === activeItemId) {
                    return { ...item, isEquipped: false };
                }
                return item;
            });
            saveToStorage(STORAGE_KEY, updatedInventory);
            return updatedInventory;
        });

        setShowDetailsCard(false);
    };

    /**
     * Merges new items into an existing inventory.
     * Items with the same name and type are stacked by increasing quantity.
     */
    const mergeInventory = (prevInventory: ItemStore, newItems: ItemStore): ItemStore => {
        const updatedInventory = prevInventory.map((item) => ({ ...item }));

        newItems.forEach((newItem) => {
            const existingItem = updatedInventory.find(
                (item) => item.name === newItem.name && item.type === newItem.type,
            );

            if (existingItem) {
                existingItem.quantity += newItem.quantity;
            } else {
                updatedInventory.push({ ...newItem });
            }
        });

        return updatedInventory;
    };

    /**
     * Adds new items to the inventory, merging with existing ones
     * based on item name and type.
     */

    const addItems = (newItemList: ItemStore) => {
        setInventoryItems((prev) => {
            const updatedInventory = mergeInventory(prev, newItemList);

            saveToStorage(STORAGE_KEY, updatedInventory);

            return updatedInventory;
        });
    };

    const addItem = (newItem: Item) => {
        addItems([newItem]);
    };

    return {
        inventoryItems,
        activeItem,
        showDetailsCard,
        deleteItemById,
        selectItem,
        sellItem,
        addItems,
        addItem,
        equipItem,
        unequipItem,
    };
}
