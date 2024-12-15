import styles from "./Loader.module.css";

const Loader = () => {
  return (
    <div className="absolute left-[45vw] top-1/2">
      <div className={styles.loader}></div>
    </div>
  );
};

export default Loader;
