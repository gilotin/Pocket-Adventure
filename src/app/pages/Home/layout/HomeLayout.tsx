// import { DetailsModal } from "../../app/pages/Home/components/detailsModal/DetailsModal";
import { DesktopNav } from "../components/navigation/desktopNav/DesktopNav";
import { MobileNav } from "../components/navigation/mobileNav/MobileNav";
import styles from "./HomeLayout.module.css";
import { Outlet } from "react-router";

export function MainLayout() {
    // const [isModalActive, setIsModalActive] = useState(false);

    return (
        <div className={styles.layoutBackground}>
            <div className={styles.appWrapper}>
                <aside className={styles.desktopNav}>
                    <DesktopNav />
                </aside>
                <aside className={styles.mobileNav}>
                    <MobileNav />
                </aside>
                <main className={styles.main}>
                    <Outlet />
                </main>
                {/* <footer className={styles.footer}>
                    <p>Test footer. All bla bla reserved. 2025</p>
                </footer> */}
            </div>
            {/* {isModalActive && (
                <>
                    <div className={styles.backdrop}></div>
                    <DetailsModal />
                </>
            )} */}
        </div>
    );
}
