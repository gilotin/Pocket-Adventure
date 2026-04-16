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

export function saveToStorage<T>(storageKey: string, data: T) {
    localStorage.setItem(storageKey, JSON.stringify(data));
}
