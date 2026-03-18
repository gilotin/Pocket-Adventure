import styles from "./ToggleBtnMobile.module.css";

type ToggleBtnMobileProps = {
    isNavOpen: boolean;
    toggleNav: () => void;
};

export function ToggleBtnMobile({ isNavOpen, toggleNav: toggleNav }: ToggleBtnMobileProps) {
    return (
        <>
            <button
                aria-controls="mobile-navigation"
                aria-expanded={isNavOpen}
                onClick={toggleNav}
                className={`${styles.navBtn} ${isNavOpen ? styles.navActiveBtn : ""}`}
            >
                <i className="fa-solid fa-angle-left icon"></i>
            </button>
        </>
    );
}
