import { useEffect, useState } from "react";
import type { Item } from "../../../types/gameTypes";
import { loadStorageData, saveToStorage } from "../../../services/storageOperations";
import { SHOP_KEY, STORAGE_KEY } from "../../../constants/gameConstants";

type Shop = {
    items: Item[];
    timer: number | null;
};
export function useShop() {
    const [shop, setShop] = useState<Shop>({ items: [], timer: null });

    useEffect(() => {
        const storedShop = loadStorageData(SHOP_KEY, { items: [], timer: null });

        setShop(storedShop);
    }, []);

    const updateShop = (nextShop: Shop) => {
        saveToStorage(SHOP_KEY, nextShop);
        setShop(nextShop);
    };

    const removeItem = (itemId: string) => {
        const selectedItem = shop.items.find((item) => item.itemId === itemId);

        setShop((prev) => {
            const updatedShopList = prev.items.filter((item) => item.itemId !== itemId);
            saveToStorage(SHOP_KEY, updatedShopList);
            return { ...prev, items: updatedShopList };
        });

        return selectedItem;
    };

    return { shop, updateShop, removeItem };
}
