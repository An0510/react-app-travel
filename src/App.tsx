import React, {Suspense, lazy, ComponentType} from 'react';
import styles from "./App.module.css";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {Order,HomePage, SignInPage, RegisterPage, DetailPage, SearchPage, ShoppingCart} from "./pages";
import {Redirect} from "react-router-dom";
import {useSelector} from "./redux/hooks";


// 与服务器路径一致
const publicPath = "/travel"
// 结构组件位置,是否授权,其他属性
const PrivateRoute = ({component, isAuthenticated, ...rest}) => {
    const routeComponent = (props) => {
        return isAuthenticated ? (
            React.createElement(component, props)
        ) : (
            <Redirect to={{pathname: `${publicPath}/signIn`}}/>
        )
    }
    return <Route render={routeComponent} {...rest}/>
}

const App = () => {
    const jwt = useSelector(s => s.user.token)
    return (
        <div className={styles.App}>
            <BrowserRouter>
                <Switch>
                    <Route exact path={publicPath} component={HomePage}/>
                    <Route path={`${publicPath}/signIn`} component={SignInPage}/>
                    <Route path={`${publicPath}/register`} component={RegisterPage}/>
                    <Route path={`${publicPath}/detail/:touristRouteId`} component={DetailPage}/>
                    <Route path={`${publicPath}/search/:keywords?`} component={SearchPage}/>
                    <PrivateRoute
                        isAuthenticated={jwt!==null}
                        path={`${publicPath}/shoppingCart`} component={ShoppingCart}/>
                    <PrivateRoute
                        isAuthenticated={jwt!==null}
                        path={`${publicPath}/order`} component={Order}/>
                    <Route render={() => <h1>404 not found 页面去火星了 ！</h1>}/>
                </Switch>
            </BrowserRouter>
        </div>
    );
}

export default App;
