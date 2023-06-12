import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Signin from "./pages/SignIn";
import Todo from "./pages/Todo";

const GlobalStyle = createGlobalStyle`
  body, #root, #root > div {
    width: 100vw;
    height: 100vh;
    margin: 0;
    padding: 0;
  }
`;

export const API_URL = `https://www.pre-onboarding-selection-task.shop`;

function App() {
  return (
    <Router>
      <>
        <GlobalStyle />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/todo" element={<Todo />} />
        </Routes>
      </>
    </Router>
  );
}

export default App;
