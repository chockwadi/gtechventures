import React from 'react';
import { Row, Col } from 'antd';
import { useHistory } from "react-router-dom";
import quadss from '../quads.json'

function Home(props) {
    let history = useHistory();

    React.useEffect(() => {
        let chargSattions = localStorage.getItem("chargingstations")
        if (chargSattions == null) {
            chargSattions = [
                {
                    station: "1",
                    quads: [...quadss.quads.slice(0, 7)]
                },
                {
                    station: "2",
                    quads: [...quadss.quads.slice(8, 14)]
                },
                {
                    station: "3",
                    quads: [...quadss.quads.slice(15, 20)]
                },
            ]
            localStorage.setItem("chargingstations", JSON.stringify(chargSattions))
        }
    }, [])
    const clickHandler = (v) => {
        history.push("charging-station/" + v)
    }
    return (
        <>
            <h3 style={{ textAlign: "center" }}>Charging Stations</h3>
            <Row>
                <Col xs={24} sm={24} md={8} lg={8}>
                    <div className="chargSattion" onClick={() => clickHandler(1)}>
                        <p>Charging Station 2</p>
                    </div>
                </Col>
                <Col xs={24} sm={24} md={8} lg={8} >
                    <div className="chargSattion" onClick={() => clickHandler(2)}>
                        <p>Charging Station 3</p>
                    </div>
                </Col>
                <Col xs={24} sm={24} md={8} lg={8}>
                    <div className="chargSattion" onClick={() => clickHandler(3)}>
                        <p>Charging Station 3</p>
                    </div>
                </Col>
            </Row>
        </>
    )
}

export default Home