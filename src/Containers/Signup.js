import React from 'react';
import { Form, message, Input, InputNumber, Row, Col, Button, Typography } from 'antd';
import { useHistory } from "react-router-dom";

function Signup() {
    let history = useHistory();

    const formHandler = (value) => {
        let values = value
        values.isBlock = false
        if(localStorage.getItem("users")){
            let users = JSON.parse(localStorage.getItem("users"))
            if(users.filter(i => i.email == values.email).length > 0 ){
                message.error("user already exists")
            }else{
                users.push({...values})
                localStorage.setItem("users", JSON.stringify(users))
                localStorage.setItem("logedInUser", JSON.stringify({...values}))
                history.push("/")
            }
        }else{
            let users = []
            users[0] = {...values}
            localStorage.setItem("users", JSON.stringify(users))
            localStorage.setItem("logedInUser", JSON.stringify({...values}))
            history.push("/")
        }
    }
    return (
        <>
            <Row>
                <Col xs={2} sm={2} md={6} lg={6}></Col>
                <Col  xs={20} sm={20} md={12} lg={12}>
                    <div id='signupform'>
                        <h3 style={{textAlign: "center"}}>Register Your Account</h3>
                        <Form layout="vertical" name="userForm" onFinish={formHandler}>
                            <Form.Item name="fname" label="First Name" rules={[{ required: true }]}>
                                <Input />
                            </Form.Item>
                            <Form.Item name="lname" label="Last Name" rules={[{ required: true }]}>
                                <Input />
                            </Form.Item>
                            <Form.Item name="email" label="Email Address" 
                              rules={[
                                {
                                  type: 'email',
                                  message: 'The input is not valid E-mail!',
                                },
                                {
                                  required: true,
                                  message: 'Please input your E-mail!',
                                },
                              ]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item name="phone" label="Emergency Phone Number" rules={[{ required: true }]}>
                                <Input />
                            </Form.Item>
                            <Form.Item name="password" label="Password" rules={[{ required: true }]}>
                                <Input.Password  />
                            </Form.Item>
                            <Button type="primary" htmlType="submit" block>Register</Button>
                        </Form>
                    </div>
                </Col>
            </Row>
        </>
    )
}

export default Signup