import React from "react";
import Particles from "react-tsparticles";
import {UserLayout} from "../../layout/userLayout";
import {SignForm} from "./SignForm";

export const SignInPage: React.FC = (props) => {
    console.log(props)

    return (
        <div>
            <UserLayout>
                <h1 style={{color:"#1890ff"}}>登录</h1>
                <SignForm/>
            </UserLayout>
        </div>
    );
}
