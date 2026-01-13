import { useState } from "react";
import { GameNavigation } from "./navigation/GameNavigation";
import styles from "./PocketAdventurePage.module.css";

type GameMenuState = "crafting" | "garden" | "missions" | "shop" | "inventory" | null;

export function PocketAdventurePage() {
    const [gameNavigation, setGameNavigation] = useState<GameMenuState>(null);

    console.log(gameNavigation);

    return (
        <>
            <GameNavigation setGameNavigation={setGameNavigation} />

            <div>
                <section className=""></section>
            </div>
        </>
    );
}
