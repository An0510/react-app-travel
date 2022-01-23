import React from "react";
import { UserLayout } from "../../layout/userLayout";
import {RegisterForm} from "./RegisterForm"
export const RegisterPage : React.FC = () => {
    return (
        <UserLayout>
            <h1 style={{color:"#1890ff"}}>注册</h1>
            <RegisterForm/>
        </UserLayout>
    );
}
