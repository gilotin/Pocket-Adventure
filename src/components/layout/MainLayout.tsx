import { useState } from "react";
import { DetailsModal } from "../../app/pages/Home/components/detailsModal/DetailsModal";
import { Navigation } from "../ui/navigation/Navigation";
import styles from "./MainLayout.module.css";
import { Outlet } from "react-router";

export function MainLayout() {
    const [isModalActive, setIsModalActive] = useState(false);

    return (
        <div className={styles.layoutBackground}>
            <div className={styles.appWrapper}>
                <aside className={styles.sidebar}>{<Navigation />}</aside>
                <main className={styles.main}>{<Outlet />}</main>
                <footer className={styles.footer}>
                    <p>Test footer. All bla bla reserved. 2025</p>
                </footer>
            </div>
            {}
            {isModalActive && (
                <>
                    <div className={styles.backdrop}></div>
                    <DetailsModal />
                </>
            )}
        </div>
    );
}
