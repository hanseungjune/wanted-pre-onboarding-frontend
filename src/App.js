import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Signin from "./pages/SignIn";
import Todo from "./pages/Todo";

// 전역 스타일 정의
const GlobalStyle = createGlobalStyle`
  body, #root, #root > div {
    width: 100vw;
    height: 100vh;
    margin: 0;
    padding: 0;
  }

  * {
    margin: 0;
    box-sizing: border-box;
  }
`;

export const API_URL = `https://www.pre-onboarding-selection-task.shop`;

function App() {
  return (
    <Router>
      <>
        <GlobalStyle /> {/* 전역 스타일 적용 */}
        <Routes>
          <Route path="/" element={<Home />} /> {/* 홈 페이지 */}
          <Route path="/signup" element={<Signup />} /> {/* 회원가입 페이지 */}
          <Route path="/signin" element={<Signin />} /> {/* 로그인 페이지 */}
          <Route path="/todo" element={<Todo />} /> {/* 할 일 관리 페이지 */}
        </Routes>
      </>
    </Router>
  );
}

export default App;
