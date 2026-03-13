// import { DetailsModal } from "../../app/pages/Home/components/detailsModal/DetailsModal";
import { Navigation } from "../components/navigation/Navigation";
import styles from "./HomeLayout.module.css";
import { Outlet } from "react-router";

export function MainLayout() {
    // const [isModalActive, setIsModalActive] = useState(false);

    return (
        <div className={styles.layoutBackground}>
            {/* <nav className={styles.connectionNav}>
                <ul className={styles.navIcons}>
                    <li>
                        <a
                            href="https://www.linkedin.com/in/nikolay-m-toshev/"
                            target="_blank"
                            rel="nofollow"
                        >
                            <i className="fa-brands fa-linkedin"></i>
                        </a>
                    </li>
                    <li>
                        <a href="https://github.com/gilotin" target="_blank" rel="nofollow">
                            <i className="fa-brands fa-github"></i>
                        </a>
                    </li>
                </ul>
            </nav> */}
            <div className={styles.appWrapper}>
                <aside>{<Navigation />}</aside>
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
