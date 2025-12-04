import styles from "./Layout.module.css";

type ChildrenLayout = {
    children: React.ReactNode;
};

export function Layout({ children }: ChildrenLayout) {
    return (
        <div className={styles.appWrapper}>
            <aside className={styles.aside}>{/* Navigation here */}</aside>
            <main className={styles.main}>{children}</main>
            <footer className={styles.footer}>{/* Here we will place footer */}</footer>
        </div>
    );
}
