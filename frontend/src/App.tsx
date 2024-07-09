import React, { useEffect } from "react";
import { Provider, useDispatch } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import Home from "./pages/Home";
import Login from "./pages/Login";
import News from "./pages/News";
import Profile from "./pages/Profile";
import Contact from "./pages/Contact";
import Legal from "./pages/Legal";
import Subscription from "./pages/Subscription";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import store from "./app/store";
import Success from "./pages/Success";
import Account from "./pages/Account";
import Dashboard from "./pages/Dashboard";
import { initializeUser } from "./features/auth/authSlice";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
//import "@ionic/react/css/normalize.css";
//import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";

/* Theme variables */
import "./theme/variables.css";

setupIonicReact();

const Initializer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeUser());
  }, [dispatch]);

  return <>{children}</>;
};

const App: React.FC = () => (
  <Provider store={store}>
    <IonApp>
      <IonReactRouter>
        <Initializer>
          <IonRouterOutlet>
            <Route path="/login" component={Login} exact={true} />
            <Route path="/signin" component={Signin} exact={true} />
            <Route path="/signup" component={Signup} exact={true} />
            <Route path="/home" component={Home} exact={true} />
            <Route path="/news" component={News} exact={true} />
            <Route path="/profile" component={Profile} exact={true} />
            <Route path="/contact" component={Contact} exact={true} />
            <Route path="/legal" component={Legal} exact={true} />
            <Route path="/subscription" component={Subscription} exact={true} />
            <Route path="/success" component={Success} exact={true} />
            <Route path="/account" component={Account} />
            <Route path="/dashboard" component={Dashboard} />
            <Route exact path="/">
              <Redirect to="/home" />
            </Route>
          </IonRouterOutlet>
        </Initializer>
      </IonReactRouter>
    </IonApp>
  </Provider>
);

export default App;
