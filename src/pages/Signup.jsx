import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../App";
import styles from "../styles/signup.module.css";

const Signup = () => {
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

  // 이메일과 비밀번호 검사 후 회원가입 요청을 보내고, 성공 시 로그인 페이지로 이동
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEmailValid && isPasswordValid) {
      try {
        const response = await fetch(`${API_URL}/auth/signup`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        });
        if (response.status === 201) {
          console.log("Signup successful");
          navigate("/signin");
        } else {
          console.log("회원가입 실패");
        }
      } catch (error) {
        console.error("회원가입 에러:", error);
      }
    }
  };

  return (
    <div className={styles["signup-container"]}>
      {/* 회원가입 제목 */}
      <h2>SignUp</h2>

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

        {/* 회원가입 버튼 */}
        <button
          type="submit"
          data-testid="signup-button"
          disabled={!isEmailValid || !isPasswordValid}
          className={styles["button"]}
        >
          Submit
        </button>

        {/* 로그인 페이지로 이동하는 버튼 */}
        <button
          className={styles["button"]}
          onClick={() => {
            navigate("/signin");
          }}
        >
          SignIn Page
        </button>
      </form>
    </div>
  );
};

export default Signup;
