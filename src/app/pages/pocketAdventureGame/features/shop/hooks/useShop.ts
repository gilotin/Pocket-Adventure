import { useEffect, useState } from "react";
import type { Shop } from "../../../types/gameTypes";
import { loadStorageData, saveToStorage } from "../../../services/storageOperations";
import { SHOP_KEY } from "../../../constants/gameConstants";

export function useShop() {
    const [shop, setShop] = useState<Shop>({ items: [], timer: null });
    const [isLoaded, setIsLoaded] = useState<boolean>(false);

    useEffect(() => {
        const storedShop = loadStorageData(SHOP_KEY, { items: [], timer: null });

        setShop(storedShop);
        setIsLoaded(true);
    }, []);

    const updateShop = (nextShop: Shop) => {
        saveToStorage(SHOP_KEY, nextShop);
        setShop(nextShop);
    };

    const removeItem = (itemId: string) => {
        const selectedItem = shop.items.find((item) => item.itemId === itemId);

        setShop((prev) => {
            const updatedShopList = prev.items.filter((item) => item.itemId !== itemId);

            saveToStorage(SHOP_KEY, { ...prev, items: updatedShopList });
            return { ...prev, items: updatedShopList };
        });
    };

    return { shop, updateShop, removeItem, isLoaded };
}
