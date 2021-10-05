import { BrowserRouter as Router, Switch } from "react-router-dom";

import { useState, useEffect } from "react";
import PrivateRoute from "./pages/helpers/PrivateRoute";
import PublicRoute from "./pages/helpers/PublicRoute";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import LandingPage from "./pages/landing-page/landing-page";
import Login from "./pages/auth/login/login";
import Register from "./pages/auth/register/register";
import ChatList from "./pages/chat-list/chat-list";

import io from "socket.io-client";

function App() {
  const [socket, setSocket] = useState(null);
  const setUpSocket = () => {
    const newSocket = io.connect("https://talkagram-backend.herokuapp.com", {
      path: "/backend3/socket.io",
    });
    newSocket.on("connect", () => {
      console.log("Connected socket client!");
    });
    setSocket(newSocket);
  };

  useEffect(() => {
    setUpSocket();
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <PublicRoute path="/landing-page" exact component={LandingPage} />
          <PublicRoute
            path="/login"
            restricted={true}
            exact
            component={Login}
          />
          <PublicRoute
            path="/register"
            restricted={true}
            exact
            component={Register}
          />
          <PrivateRoute
            socket={socket}
            path="/chat-list"
            exact
            component={ChatList}
          />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
