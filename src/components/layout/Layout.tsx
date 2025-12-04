import styles from "./Layout.module.css";
import { Outlet } from "react-router";

export function MainLayout() {
    return (
        <div className={styles.appWrapper}>
            <aside className={styles.aside}>{/* Navigation here */}</aside>
            <main className={styles.main}>{<Outlet />}</main>
            <footer className={styles.footer}>{/* Here we will place footer */}</footer>
        </div>
    );
}
