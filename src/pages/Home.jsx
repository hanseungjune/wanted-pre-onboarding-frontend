import { useNavigate } from "react-router-dom";
import styles from "../styles/home.module.css";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className={styles["signin-container"]}>
      {/* 홈 제목 */}
      <h2>Home</h2>

      {/* 회원가입 버튼 */}
      <button className={styles["button"]} onClick={() => navigate("/signup")}>
        SignUp
      </button>

      {/* 로그인 버튼 */}
      <button className={styles["button"]} onClick={() => navigate("/signin")}>
        SignIn
      </button>
    </div>
  );
};

export default Home;
