import type { ItemStore } from "../types/gameTypes";

export function loadStorageData<T>(storageKey: string, fallback: T): T {
    const rawData = localStorage.getItem(storageKey);
    if (!rawData) {
        return fallback;
    }

    try {
        return JSON.parse(rawData);
    } catch {
        return fallback;
    }
}

export function saveItems(storageKey: string, items: ItemStore) {
    return localStorage.setItem(storageKey, JSON.stringify(items));
}

export function deleteItem(storageKey: string, itemId: string) {
    const itemDataArray = loadStorageData<ItemStore>(storageKey, []);

    const updatedArray = itemDataArray.filter((item: { itemId: string }) => {
        return item.itemId !== itemId;
    });

    localStorage.setItem(storageKey, JSON.stringify(updatedArray));

    return;
}
