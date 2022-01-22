import React from 'react';
import styles from "./App.module.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { HomePage, SignInPage, RegisterPage, DetailPage,SearchPage } from "./pages";

function App() {
  // 与服务器路径一致
  const publicPath = "/travel/"
  return (
    <div className={styles.App}>
      <BrowserRouter>
        <Switch>
          <Route exact path={publicPath} component={HomePage} />
          <Route path={`${publicPath}/signIn`} component={SignInPage} />
          <Route path={`${publicPath}/register`} component={RegisterPage} />
          <Route path={`${publicPath}/detail/:touristRouteId`} component={DetailPage} />
          <Route path={`${publicPath}/search/:keywords?`} component={SearchPage} />
          <Route render={() => <h1>404 not found 页面去火星了 ！</h1>} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
