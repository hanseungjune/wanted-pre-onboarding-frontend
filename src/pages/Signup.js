import React, { useState } from "react";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isEmailValid, setEmailValid] = useState(false);
  const [isPasswordValid, setPasswordValid] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailValid(e.target.value.includes("@"));
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordValid(e.target.value.length >= 8);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 유효성 검사 및 회원가입 처리 로직 구현
    if (isEmailValid && isPasswordValid) {
      console.log("Signup successful");
    } else {
      console.log("Signup Failure");
    }
    // 이메일과 비밀번호 검사 후 회원가입 요청을 보내고, 성공 시 로그인 페이지로 이동
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h2>회원가입</h2>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <input
          type="email"
          value={email}
          onChange={handleEmailChange}
          placeholder="이메일"
          data-testid="email-input"
        />
        <input
          type="password"
          value={password}
          onChange={handlePasswordChange}
          placeholder="비밀번호"
          data-testid="password-input"
        />
        <button
          type="submit"
          data-testid="signup-button"
          disabled={!isEmailValid || !isPasswordValid}
        >
          회원가입
        </button>
      </form>
    </div>
  );
};

export default Signup;
