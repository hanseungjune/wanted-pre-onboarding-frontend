import { Link } from "react-router-dom";
import styles from "../styles/home.module.css";

const Home = () => {
  return (
    <div className={styles["signin-container"]}>
      {/* 홈 제목 */}
      <h2>Home</h2>

      {/* 회원가입 버튼 */}
      <Link to="/signup" className={styles["button"]}>
        SignUp
      </Link>

      {/* 로그인 버튼 */}
      <Link to="/signin" className={styles["button"]}>
        SignIn
      </Link>
    </div>
  );
};

export default Home;
