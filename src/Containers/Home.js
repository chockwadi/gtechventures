import React from 'react';
import { Row, Col } from 'antd';
import { useHistory } from "react-router-dom";
import quadss from '../quads.json'
import Timer from '../Components/Timer'
import Navbar from '../Components/Navbar'
function Home(props) {
    let history = useHistory();
    const [flyingDrones, setFlyingDrones] = React.useState([])
    React.useEffect(() => {
        let chargSattions = localStorage.getItem("chargingstations")
        if (chargSattions == null) {
            chargSattions = [
                {
                    station: "1",
                    quads: new Array(10)
                },
                {
                    station: "2",
                    quads: new Array(10)
                },
                {
                    station: "3",
                    quads: new Array(10)
                },
            ]
            for(let j = 0; j < quadss.quads.slice(0, 7).length; j++){
                chargSattions[0].quads[j] = quadss.quads.slice(0, 7)[j]
            }
            for(let j = 0; j < quadss.quads.slice(8, 14).length; j++){
                chargSattions[1].quads[j] = quadss.quads.slice(8, 14)[j]
            }   
            for(let j = 0; j < quadss.quads.slice(15, 20).length; j++){
                chargSattions[2].quads[j] = quadss.quads.slice(15, 20)[j]
            }
            localStorage.setItem("chargingstations", JSON.stringify(chargSattions))
        }
        getFlyingDrones()
    }, [])
    const clickHandler = (v) => {
        history.push("charging-station/" + v)
    }
    const getFlyingDrones = (i) => {
        if (i && localStorage.getItem("flyingDrones")) {
            let flyingDrones = JSON.parse(localStorage.getItem("flyingDrones"))
            flyingDrones[i].isCrash = true
            localStorage.setItem("flyingDrones", JSON.stringify(flyingDrones))
            setFlyingDrones(flyingDrones)
        }else{
            if(JSON.parse(localStorage.getItem("flyingDrones"))){
                let flyingDrones = JSON.parse(localStorage.getItem("flyingDrones"))
                setFlyingDrones(flyingDrones)
            }
        }
    }
    return (
        <>
            <Navbar />
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
            <Row>
                <Col span={24}><h3 style={{ textAlign: "center", margin: "20px 0px" }}>Flying Drones</h3></Col>
                {
                    flyingDrones.length > 0 &&
                    flyingDrones.map((item, index) => {
                        return <Col xs={24} sm={24} md={8} lg={8}>
                            <div className="quadsdiv" >
                                <p>{item.model}</p><br/>
                                <p>{item.email}</p><br/>
                                {
                                    item.isCrash ? 
                                    <h1>Plan Has Been Crashed.......</h1>
                                    :
                                    <Timer getFlyingDrones={() => getFlyingDrones(index)} time={item.time} startTime={item.startTime}/>
                                }
                            </div>
                        </Col>

                    })
                }
            </Row>
        </>
    )
}

export default Home