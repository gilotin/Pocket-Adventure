import { useState } from "react";
import styles from "./MobileNav.module.css";

export function MobileNav() {
    const [isNavOpen, setIsNavOpen] = useState<boolean>(false);

    const buttonStateHandler = () => setIsNavOpen((prev) => !prev);

    return (
        <>
            <button
                aria-controls="mobile-navigation"
                aria-expanded={isNavOpen}
                onClick={buttonStateHandler}
                className={`${styles.navBtn} ${isNavOpen ? styles.navActiveBtn : ""}`}
            >
                <i className="fa-solid fa-angle-left icon"></i>
            </button>
        </>
    );
}
