import { Navigation } from "../ui/navigation/Navigation";
import styles from "./MainLayout.module.css";
import { Outlet } from "react-router";

export function MainLayout() {
    return (
        <div className={styles.layoutBackground}>
            <div className={styles.appWrapper}>
                <aside className={styles.sidebar}>{<Navigation />}</aside>
                <main className={styles.main}>{<Outlet />}</main>
                <footer className={styles.footer}>
                    <p>Test footer. All bla bla reserved. 2025</p>
                </footer>
            </div>
        </div>
    );
}
