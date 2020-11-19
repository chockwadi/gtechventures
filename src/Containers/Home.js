import React from 'react';
import { Form, Input, InputNumber, Row, Col, Button, Typography } from 'antd';

function Home() {

    return (
        <>
            <Row>
                <Col xs={2} sm={2} md={2} lg={2}></Col>
                <Col  xs={20} sm={20} md={6} lg={6}>
                    <div className="chargSattion">
                        <p>Charging Station 2</p>
                    </div>
                </Col>
                <Col xs={2} sm={2} md={2} lg={2}></Col>
                <Col  xs={20} sm={20} md={6} lg={6}>
                    <div className="chargSattion">
                        <p>Charging Station 3</p>
                    </div>
                </Col>
                <Col xs={2} sm={2} md={2} lg={2}></Col>
                <Col  xs={20} sm={20} md={6} lg={6}>
                    <div className="chargSattion">
                        <p>Charging Station 3</p>
                    </div>
                </Col>
            </Row>
        </>
    )
}

export default Home