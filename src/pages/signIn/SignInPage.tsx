import React from "react";
import Particles from "react-tsparticles";
import {UserLayout} from "../../layout/userLayout";

export const SignInPage: React.FC = (props) => {
    console.log(props)

    return (
        <div>
            <UserLayout>
                <h1>登录界面</h1>
            </UserLayout>
        </div>
    );
}
