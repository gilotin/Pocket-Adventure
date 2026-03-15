import styles from "./Navigation.module.css";

export function Navigation() {
    return (
        <nav className={styles.navWrapper}>
            <ul className={styles.list}>
                <li className={styles.item}>
                    <a href="#home">Home</a>
                </li>
                <li className={styles.item}>
                    <a href="#about">About</a>
                </li>
                <li className={styles.item}>
                    <a href="#feature">Featured Works</a>
                </li>
                <li className={styles.item}>
                    <a href="#projects">Projects</a>
                </li>
                <li className={styles.item}>
                    <a href="#roadmap">Roadmap</a>
                </li>
                <li className={styles.item}>
                    <a href="#contacts">Contacts</a>
                </li>
            </ul>
        </nav>
    );
}
