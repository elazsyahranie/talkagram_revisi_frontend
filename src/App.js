import { BrowserRouter as Router, Switch } from "react-router-dom";

import PublicRoute from "./pages/helpers/PublicRoute";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import Login from "./pages/auth/login/login";
import Register from "./pages/auth/register/register";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <PublicRoute path="/login" exact component={Login} />
          <PublicRoute path="/register" exact component={Register} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
