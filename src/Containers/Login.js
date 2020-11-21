import React from 'react';
import { Form, Input, message, Row, Col, Button, Typography } from 'antd';
import { useHistory } from "react-router-dom";

function Signup() {
    let history = useHistory();

    const formHandler = (values) => {
        if(localStorage.getItem("users")){
            let users =  JSON.parse(localStorage.getItem("users"))
           if(users.filter(i => i.email == values.email).length > 0 ){
            if(users.filter(i => i.email == values.email && i.password == values.password).length > 0 ){
                localStorage.setItem("logedInUser", JSON.stringify({...values}))
                history.push("/")
            }else{
                message.error("wrong password...")
            }
           }else{
               message.error("user does not exists. please signup....")
           }
        }else{
            message.error("user does not exists. please signup....")
        }
    }
    return (
        <>
            <Row>
                <Col xs={2} sm={2} md={6} lg={6}></Col>
                <Col  xs={20} sm={20} md={12} lg={12}>
                    <div id='signupform'>
                        <h3 style={{textAlign: "center"}}>Login with Your Account</h3>
                        <Form layout="vertical" name="userForm" onFinish={formHandler}>
                            <Form.Item name="email" label="Email" rules={[{ required: true }]}>
                                <Input />
                            </Form.Item>
                            <Form.Item name="password" label="Password" rules={[{ required: true }]}>
                                <Input />
                            </Form.Item>
                            <Button type="primary" htmlType="submit" block>Login</Button>
                        </Form>
                    </div>
                </Col>
            </Row>
        </>
    )
}

export default Signup