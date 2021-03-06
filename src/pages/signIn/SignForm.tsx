import React,{useEffect} from 'react';
import {Form,Button,Input,Checkbox} from "antd";
import styles from "./SignForm.module.css"
import {signIn} from "../../redux/user/slice";
import {useDispatch} from "react-redux";
import {useSelector} from "../../redux/hooks";
import {useHistory} from "react-router-dom";

export const SignForm: React.FC = () => {
    const publicPath = "/travel"
    const history = useHistory()
    const loading = useSelector(s => s.user.loading)
    const jwt = useSelector(s => s.user.token)
    const error = useSelector(s => s.user.error)
    const dispatch = useDispatch()
    const onFinish = (values: any) => {
        console.log('Success:', values);
        dispatch(signIn({
            email:values.username,
            password:values.password,
        }))
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    useEffect(() => {
        if (jwt!==null){
            history.push(`${publicPath}/`)
        }
    },[jwt])
    return (
        <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            className={styles['signIn-form']}
        >
            <Form.Item
                label="Username"
                name="username"
                rules={[{ required: true, message: 'Please input your username!' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
                <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit" loading={loading}>
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
};
