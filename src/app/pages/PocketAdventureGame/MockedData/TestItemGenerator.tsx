import type React from "react";
import { loadStorageData, saveItems } from "../services/storageOperations";

/* ======================
   Types
====================== */

type Item = {
    itemId: number;
    name: string;
    type: string;
    quantity: number;
};
export const STORAGE_KEY = "spawnedData";

function idGenerator() {
    // latter this will be removed latter so magic numbers for now are OK!
    const idTime = Number(new Date());
    const randomIdNumber = Math.ceil(Math.random() * 1000);
    const itemId = idTime + randomIdNumber;
    return itemId;
}

export function TestItemGenerator() {
    const createItems = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const form = new FormData(e.currentTarget);

        const itemName = form.get("itemName");
        const itemType = form.get("itemType");
        const quantity = form.get("quantity");
        const itemId = idGenerator();

        if (
            typeof itemName !== "string" ||
            typeof itemType !== "string" ||
            typeof quantity !== "string"
        ) {
            return;
        }

        const newItem: Item = {
            itemId: Number(itemId),
            name: itemName,
            type: itemType,
            quantity: Number(quantity),
        };

        const currentItems = loadStorageData(STORAGE_KEY);
        const updatedItems = [...currentItems, newItem];

        saveItems(STORAGE_KEY, updatedItems);
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
            <input type="number" min={0} max={100} name="quantity" />

            <button type="submit">Create</button>
        </form>
    );
}
