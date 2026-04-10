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

export function saveToStorage(storageKey: string, items: ItemStore) {
    return localStorage.setItem(storageKey, JSON.stringify(items));
}
