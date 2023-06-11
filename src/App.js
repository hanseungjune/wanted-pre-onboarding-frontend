import React from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import Signup from "./pages/Signup";
import Signin from "./pages/SignIn";

function App() {
  return (
    <Router>
      <Route exact path="/">
        <Redirect to="/signup" />
      </Route>
      <Route path="/signup" component={Signup} />
      <Route path="/signin" component={Signin} />
    </Router>
  );
}

export default App;
