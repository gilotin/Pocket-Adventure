import type { ItemStore } from "../types/gameTypes";

export function loadStorageData(storageKey: string) {
    const rawData = localStorage.getItem(storageKey);
    if (!rawData) {
        return [];
    }

    try {
        return JSON.parse(rawData);
    } catch {
        return [];
    }
}

export function saveItems(storageKey: string, items: ItemStore) {
    return localStorage.setItem(storageKey, JSON.stringify(items));
}

export function deleteItem(storageKey: string, itemId: number) {
    const itemDataArray = loadStorageData(storageKey);

    const updatedArray = itemDataArray.filter((item: { itemId: number }) => {
        return item.itemId !== itemId;
    });

    localStorage.setItem(storageKey, JSON.stringify(updatedArray));

    return;
}
