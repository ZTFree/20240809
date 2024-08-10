import styles from "./index.module.css";

function TitleBox() {

    return (
        <div className={styles.titleBox}>
            <h1 className={styles.titleMain}>Rotate PDF Pages</h1>
            <p className={styles.titleDesc}>Simply click on a page to rotate it. You can then download your
                modified
                PDF.</p>
        </div>
    );
}

export default TitleBox;