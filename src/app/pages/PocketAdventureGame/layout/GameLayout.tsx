import styles from "./GameLayout.module.css";
import { PocketAdventurePage } from "../PocketAdventurePage";

export function GameLayout() {
    return (
        <div className={styles.layoutBackground}>
            <div className={styles.gameWrapper}>
                <header className={styles.gameHeader}>
                    <p>profiles</p>
                    <p>Stats</p>
                </header>
                <main className={styles.mainGame}>
                    <PocketAdventurePage />
                </main>
                <footer>
                    <p>Test footer. All bla bla reserved. 2025</p>
                    {/* placeholder */}
                </footer>
            </div>
        </div>
    );
}
