import React from 'react';
import { signup } from '../APIHelpers/Users'
import { Form, Input, InputNumber, Row, Col, Button, Typography } from 'antd';

function Signup() {
    React.useEffect(() => {
        let data = {
            fname: "shoaib",
            lname: "ismail",
            phone: "03142279909",
            email: "chockwadi.shoaib@gmail.com"
        }
        signup(data)
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])
    return (
        <>
            <Row>
                <Col xs={2} sm={2} md={6} lg={6}></Col>
                <Col  xs={20} sm={20} md={12} lg={12}>
                    <div id='signupform'>
                        <h3 style={{textAlign: "center"}}>Login with Your Account</h3>
                        <Form layout="vertical" name="userForm">
                            <Form.Item name="fname" label="Email" rules={[{ required: true }]}>
                                <Input />
                            </Form.Item>
                            <Form.Item name="password" label="Password" rules={[{ required: true }]}>
                                <Input />
                            </Form.Item>
                            <Button type="primary" block>Login</Button>
                        </Form>
                    </div>
                </Col>
            </Row>
        </>
    )
}

export default Signup