import type React from "react";

/* ======================
   Types
====================== */

type Item = {
    name: string;
    type: string;
    quantity: number;
};

type ItemStore = Item[];

const STORAGE_KEY = "spawnedData";

/* ======================
   Storage helpers
====================== */

function loadItems(): ItemStore {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return [];

    try {
        return JSON.parse(data) as ItemStore;
    } catch {
        return [];
    }
}

function saveItems(items: ItemStore) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

/* ======================
   Component
====================== */

export function TestItemGenerator() {
    const createItems = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const form = new FormData(e.currentTarget);

        const itemName = form.get("itemName");
        const itemType = form.get("itemType");
        const quantity = form.get("quantity");

        if (
            typeof itemName !== "string" ||
            typeof itemType !== "string" ||
            typeof quantity !== "string"
        ) {
            return;
        }

        const newItem: Item = {
            name: itemName,
            type: itemType,
            quantity: Number(quantity),
        };

        const currentItems = loadItems();
        const updatedItems = [...currentItems, newItem];

        saveItems(updatedItems);
    };

    return (
        <form onSubmit={createItems}>
            <label>Item Name:</label>
            <input type="text" name="itemName" />

            <label>Choose type:</label>
            <select name="itemType">
                <option value="armor">armor</option>
                <option value="potion">potion</option>
                <option value="material">material</option>
                <option value="weapon">weapon</option>
            </select>

            <label>Quantity:</label>
            <input type="number" max={10} name="quantity" />

            <button type="submit">Create</button>
        </form>
    );
}
