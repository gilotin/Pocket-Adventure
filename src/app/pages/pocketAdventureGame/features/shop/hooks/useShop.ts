import { useEffect, useState } from "react";
import type { Item } from "../../../types/gameTypes";
import { loadStorageData } from "../../../services/storageOperations";
import { SHOP_KEY } from "../../../constants/gameConstants";

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

    // updateShop - to update the shop list and timer when the timer reaches "0"

    // forceUpdateShop - future premium option paid with premium currency

    // buyShopItems - on successful buy will pass the item to the inventory, filter the item from shop and update the localStorage

    // OnSale - will randomly lower the price of one item

    return { shop };
}
