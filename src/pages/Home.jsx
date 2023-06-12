import { useNavigate } from "react-router-dom";
import styles from "../styles/home.module.css";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className={styles["signin-container"]}>
      <h2>Home</h2>
      <button className={styles["button"]} onClick={() => navigate("/signup")}>
        SignUp
      </button>
      <button className={styles["button"]} onClick={() => navigate("/signin")}>
        SignIn
      </button>
    </div>
  );
};

export default Home;
