import React from "react";
import HelloBootstrap from "../src/HelloBootstrap";
import Detail from "./pages/Signup";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./pages/login";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";


const App = () => (
<div>
    <Router>
  <Switch>
    <Route exact path="/" component={HelloBootstrap} />
    <Route exact path="/signup" component={Detail} />
    <Route exact path="/login" component={Login} />
    <Route exact path="/forgot" component={ForgotPassword} />
    <Route path="/reset/:token" component={ResetPassword} />
  </Switch>
</Router>
</div>

)



export default App;







