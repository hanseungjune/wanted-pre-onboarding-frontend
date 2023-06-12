import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../App";
import styles from "../styles/signin.module.css";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isEmailValid, setEmailValid] = useState(false);
  const [isPasswordValid, setPasswordValid] = useState(false);
  const navigate = useNavigate();

  // 토큰이 존재하면 /todo 페이지로 이동
  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");
    if (accessToken) {
      navigate("/todo");
    }
  }, [navigate]);

  // 이메일 입력값 받기 및 유효성 검사
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailValid(e.target.value.includes("@"));
  };

  // 비밀번호 입력값 받기 및 유효성 검사
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordValid(e.target.value.length >= 8);
  };

  // 이메일과 비밀번호 검사 후 로그인 요청을 보내고, 성공 시 todo 페이지로 이동
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/auth/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      if (response.status === 200) {
        const data = await response.json();
        const accessToken = data.access_token;
        localStorage.setItem("access_token", accessToken);
        navigate("/todo");
      } else {
        console.log("Login failed");
      }
    } catch (error) {
      console.error("Error occurred during login:", error);
    }
  };

  return (
    <div className={styles["signup-container"]}>
      {/* 로그인 제목 */}
      <h2>SignIn</h2>
      <form onSubmit={handleSubmit} className={styles["signup-form"]}>
        {/* 이메일 입력 필드 */}
        <input
          type="email"
          value={email}
          onChange={handleEmailChange}
          placeholder="이메일"
          data-testid="email-input"
          className={styles["input"]}
        />

        {/* 비밀번호 입력 필드 */}
        <input
          type="password"
          value={password}
          onChange={handlePasswordChange}
          placeholder="비밀번호"
          data-testid="password-input"
          className={styles["input"]}
        />

        {/* 로그인 버튼 */}
        <button
          type="submit"
          data-testid="signup-button"
          disabled={!isEmailValid || !isPasswordValid}
          className={styles["button"]}
        >
          Submit
        </button>

        {/* 회원가입 페이지로 이동하는 버튼 */}
        <button
          className={styles["button"]}
          onClick={() => {
            navigate("/signup");
          }}
        >
          SignUp Page
        </button>
      </form>
    </div>
  );
};

export default Signin;
