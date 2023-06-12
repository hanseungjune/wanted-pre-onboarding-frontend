import { useNavigate } from "react-router-dom";

const Signin = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h2>홈</h2>
      <button onClick={() => navigate("/signup")}>회원가입</button>
      <button onClick={() => navigate("/signin")}>로그인</button>
    </div>
  );
};

export default Signin;
