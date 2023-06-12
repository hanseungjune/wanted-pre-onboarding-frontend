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

  // 토큰 있으면, /todo로 가기
  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");
    if (accessToken) {
      navigate("/todo");
    }
  }, [navigate]);

  // 입력값 받기 및 유효성 검사
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailValid(e.target.value.includes("@"));
  };

  // 입력값 받기 및 유효성 검사
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordValid(e.target.value.length >= 8);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // 유효성 검사 및 회원가입 처리 로직 구현
    // 이메일과 비밀번호 검사 후 회원가입 요청을 보내고, 성공 시 로그인 페이지로 이동
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
          console.log("Signup failed");
        }
      } catch (error) {
        console.error("Error occurred during signup:", error);
      }
    }
  };

  return (
    <div className={styles["signup-container"]}>
      <h2>SignUp</h2>
      <form onSubmit={handleSubmit} className={styles["signup-form"]}>
        <input
          type="email"
          value={email}
          onChange={handleEmailChange}
          placeholder="이메일"
          data-testid="email-input"
          className={styles["input"]}
        />
        <input
          type="password"
          value={password}
          onChange={handlePasswordChange}
          placeholder="비밀번호"
          data-testid="password-input"
          className={styles["input"]}
        />
        <button
          type="submit"
          data-testid="signup-button"
          disabled={!isEmailValid || !isPasswordValid}
          className={styles["button"]}
        >
          Submit
        </button>
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
