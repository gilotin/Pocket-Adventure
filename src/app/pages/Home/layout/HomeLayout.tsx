import { useEffect, useState } from "react";
import { Navigation } from "../components/navigation/Navigation";
import styles from "./HomeLayout.module.css";
import { Outlet } from "react-router";

export function MainLayout() {
    const [isNavOpen, setIsNavOpen] = useState<boolean>(false);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 786) {
                setIsNavOpen(false);
            }
        };
        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    });

    const toggleNav = () => setIsNavOpen((prev: boolean) => !prev);

    return (
        <div className={styles.layoutBackground}>
            <div className={styles.appWrapper}>
                <aside className={styles.navigation}>
                    <Navigation toggleNav={toggleNav} isNavOpen={isNavOpen} />
                </aside>

                <main className={styles.main}>
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
