import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Signin from "./pages/SignIn";
import { createGlobalStyle } from "styled-components";

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
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/" element={<Signup />} />
        </Routes>
      </>
    </Router>
  );
}

export default App;
