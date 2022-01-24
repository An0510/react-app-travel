import {lazy,LazyExoticComponent} from "react";

export interface RouteType {
    pathname: string;
    component: LazyExoticComponent<any>;
    exact: boolean;
    title?: string;
    icon?: string;
    children?: RouteType[];
}

const publicPath = "/travel"

export const ProductRouters: RouteType[] = [
    {
        pathname: publicPath,
        component: lazy(():any => import('../src/pages/home/HomePage')),
        exact: true,
        title: '主页'
    },
    {
        pathname: `${publicPath}/signIn`,
        component: lazy(():any => import('../src/pages/signIn/SignInPage')),
        exact: true,
        title: '登录'
    },
    // {
    //     pathname: `${publicPath}/register`,
    //     component: lazy(() => import(RegisterPage)),
    //     exact: true,
    //     title: '注册'
    // },
    // {
    //     pathname: publicPath,
    //     component: lazy(() => import(HomePage)),
    //     exact: true,
    //     title: '主页'
    // },
    // {
    //     pathname: `${publicPath}/signIn`,
    //     component: lazy(() => import(SignInPage)),
    //     exact: true,
    //     title: '登录'
    // },
    // {
    //     pathname: `${publicPath}/register`,
    //     component: lazy(() => import(RegisterPage)),
    //     exact: true,
    //     title: '注册'
    // }
]
