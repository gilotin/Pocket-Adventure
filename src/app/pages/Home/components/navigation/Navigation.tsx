import styles from "./Navigation.module.css";
import { ToggleBtnMobile } from "./toggleButtonMobile/ToggleBtnMobile";

export type NavProps = {
    isNavOpen: boolean;
    toggleNav: () => void;
};

export function Navigation({ isNavOpen, toggleNav }: NavProps) {
    return (
        <>
            <nav
                id="mobile-navigation"
                aria-label="Main navigation"
                className={`${styles.nav} ${isNavOpen ? styles.navOpen : ""}`}
            >
                <ul onClick={toggleNav} className={styles.list}>
                    <li className={styles.item}>
                        <a className={styles.links} href="#home">
                            Home
                        </a>
                    </li>
                    <li className={styles.item}>
                        <a className={styles.links} href="#about">
                            About
                        </a>
                    </li>
                    <li className={styles.item}>
                        <a className={styles.links} href="#feature">
                            Featured Works
                        </a>
                    </li>
                    <li className={styles.item}>
                        <a className={styles.links} href="#projects">
                            Projects
                        </a>
                    </li>
                    <li className={styles.item}>
                        <a className={styles.links} href="#roadmap">
                            Roadmap
                        </a>
                    </li>
                    <li className={styles.item}>
                        <a className={styles.links} href="#contacts">
                            Contacts
                        </a>
                    </li>
                </ul>
            </nav>
            <div className={styles.mobileBtn}>
                <ToggleBtnMobile isNavOpen={isNavOpen} toggleNav={toggleNav} />
            </div>
        </>
    );
}
