import React from 'react';
import { Row, Col, Button, message, Progress } from 'antd';
import { useRouteMatch } from "react-router-dom";
import Navbar from '../Components/Navbar'
import { useHistory } from "react-router-dom";

function ChStation(props) {
    const match = useRouteMatch();
    const [quads, setQuads] = React.useState([])
    const [chargingQuads, setChargingQuads] = React.useState([])
    const [land, setLand] = React.useState(false)
    let history = useHistory();
    React.useEffect(() => {
        let quadsArr = JSON.parse(localStorage.getItem("chargingstations"))
        if (quadsArr && quadsArr.length > 0) {
            if (quadsArr.filter(i => i.station == match.params.id).length > 0)
                setQuads([...quadsArr.filter(i => i.station == match.params.id)[0].quads])
        }
    }, [])
    React.useEffect(() => {
        if (localStorage.getItem("flyingDrones") && localStorage.getItem("logedInUser")) {
            let flyingDrones = JSON.parse(localStorage.getItem("flyingDrones"))
            let logedInUser = JSON.parse(localStorage.getItem("logedInUser"))
            if (flyingDrones.filter(i => i.email == logedInUser.email).length > 0) {
                setLand(true)
            }
        }
    }, [])
    React.useEffect(() => {
        if (localStorage.getItem("droneCharging")) {
            let droneCharging = JSON.parse(localStorage.getItem("droneCharging"))
            setChargingQuads(droneCharging)
        }
    },[])
    const renting = (quad, index) => {
        if (Number(quad.charge.split("%")[0]) < 10) {
            message.error("Drone Has Less than 10% bettry charge")
            return false
        }
        if (localStorage.getItem("logedInUser") && JSON.parse(localStorage.getItem("logedInUser")).isBlock) {
            message.error("you have been blocked from renting ")
            return false
        }
        if (localStorage.getItem("logedInUser")) {
            if (localStorage.getItem("flyingDrones")) {
                let flyingDrones = JSON.parse(localStorage.getItem("flyingDrones"))
                if (flyingDrones.filter(i => i.email == JSON.parse(localStorage.getItem("logedInUser")).email).length > 0) {
                    message.error("Only one rental is allowed at once.")
                } else {
                    let obj = { ...quad, ...JSON.parse(localStorage.getItem("logedInUser")) }
                    obj.startTime = new Date()
                    obj.isCrash = false
                    obj.time = (Number(quad.maxFlightTime.split("m")[0]) * 60 / 100) * Number(quad.charge.replace("%", ""))
                    flyingDrones.push(obj)
                    saveRentObjToLocalStorage(flyingDrones, obj, index)
                }
            } else {
                if ((Number(quad.maxFlightTime.split("m")[0]) * 60 / 100) * Number(quad.charge.replace("%", "")) > 0) {
                    let obj = { ...quad, ...JSON.parse(localStorage.getItem("logedInUser")) }
                    obj.startTime = new Date()
                    obj.time = (Number(quad.maxFlightTime.split("m")[0]) * 60 / 100) * Number(quad.charge.replace("%", ""))
                    obj.isCrash = false
                    let flyingDrones = []
                    flyingDrones[0] = { ...obj }
                    saveRentObjToLocalStorage(flyingDrones, obj, index)
                } else {
                    message.error("Dron has 0% charge")
                }
            }
        } else {
            message.error("please login/signup to rend a drone")
        }
    }
    const saveRentObjToLocalStorage = (flyingDrones, obj, index) => {
        let endTime = obj.time * 1000
        localStorage.setItem("flyingDrones", JSON.stringify(flyingDrones))
        setTimeout(() => {
            planCrash(obj)
        }, endTime)
        let chargingstations = JSON.parse(localStorage.getItem("chargingstations"))
        chargingstations[match.params.id - 1].quads[index] = null
        localStorage.setItem("chargingstations", JSON.stringify(chargingstations))
        setQuads(chargingstations[match.params.id - 1].quads)
        setLand(true)
    }
    const planCrash = (obj) => {
        let flyingDrones = JSON.parse(localStorage.getItem("flyingDrones"))
        let users = JSON.parse(localStorage.getItem("flyingDrones"))
        if (JSON.parse(localStorage.getItem("flyingDrones")).filter(i => i.email == JSON.parse(localStorage.getItem("logedInUser")).email).length > 0) {
            let index = JSON.parse(localStorage.getItem("flyingDrones")).findIndex(i => i.email == JSON.parse(localStorage.getItem("logedInUser")).email)
            flyingDrones[index].isCrash = true
            localStorage.setItem("flyingDrones", JSON.stringify(flyingDrones))
            let usersIndex = JSON.parse(localStorage.getItem("users")).findIndex(i => i.email == obj.email)
            users[usersIndex].isBlock = true
            localStorage.setItem("users", JSON.stringify(users))
            localStorage.setItem("logedInUser", JSON.stringify(users[usersIndex]))
            crashedPlanGoBackToChargingStation(obj)
        }
    }
    const crashedPlanGoBackToChargingStation = (obj) => {
        let drone = {
            charge: "0%",
            manufacturer: obj.manufacturer,
            maxFlightTime: obj.maxFlightTime,
            model: obj.model,
        }
        let chargingstations = JSON.parse(localStorage.getItem("chargingstations"))
        for (let i = 0; i < chargingstations.length; i++) {
            if (chargingstations[i].quads.findIndex(i => i == null) != -1) {
                chargingstations[i].quads[chargingstations[i].quads.findIndex(i => i == null)] = { ...drone }
                localStorage.setItem("chargingstations", JSON.stringify(chargingstations))
                return false
            }
        }
    }
    const landPlab = (quad, index) => {
        let flyingDrones = JSON.parse(localStorage.getItem("flyingDrones"))
        let logedInUser = JSON.parse(localStorage.getItem("logedInUser"))
        if (flyingDrones.filter(i => i.email == logedInUser.email && i.isCrash == false).length > 0) {
            let drone = flyingDrones.filter(i => i.email == logedInUser.email && i.isCrash == false)[0]
            var stTime = new Date(drone.startTime);
            stTime.setSeconds(stTime.getSeconds() + drone.time);
            stTime = stTime.getTime();
            var now = new Date().getTime();
            var distance = stTime - now;
            let charge = Math.round((Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)) / Number(drone.maxFlightTime.split("m")[0])) * 100)
            let obj = {
                charge: charge + "%",
                manufacturer: drone.manufacturer,
                maxFlightTime: drone.maxFlightTime,
                model: drone.model,
            }
            let chargingstations = JSON.parse(localStorage.getItem("chargingstations"))
            chargingstations[match.params.id - 1].quads[index] = { ...obj }
            setQuads(chargingstations[match.params.id - 1].quads)
            localStorage.setItem("chargingstations", JSON.stringify(chargingstations))
            localStorage.setItem("flyingDrones", JSON.stringify(JSON.parse(localStorage.getItem("flyingDrones")).filter(i => i.email != JSON.parse(localStorage.getItem("logedInUser")).email)))
        } else {
            message.error("There is no drone to land")
        }
    }
    const charge = (quad, index) => {
        let maxFlightTime = Number(quad.maxFlightTime.split("m")[0])
        let minutesToChargeFull = maxFlightTime - (maxFlightTime * (Number(quad.charge.split("%")[0] / 100)));
        let obj = { ...quad }
        let time = minutesToChargeFull * 60 * 1000
        if (localStorage.getItem("droneCharging")) {
            let droneCharging = JSON.parse(localStorage.getItem("droneCharging"))
            droneCharging.push(quad)
            localStorage.setItem("droneCharging", JSON.stringify(droneCharging))
            setChargingQuads(droneCharging)
            setTimeout(() => {
                droneHasCharged(quad, match.params.id -1)
            }, 1500)
        } else {
            let arr = []
            arr[0] = { ...quad }
            localStorage.setItem("droneCharging", JSON.stringify(arr))
            setChargingQuads(arr)
            setTimeout(() => {
                droneHasCharged(quad, match.params.id -1)
            }, 1500)
        }
    }
    const droneHasCharged = (quad, index) => {
        if(localStorage.getItem("chargingstations") && JSON.parse(localStorage.getItem("chargingstations"))[index].quads.filter(i => i && i.model ==  quad.model).length > 0 ){
            let chargingstations = JSON.parse(localStorage.getItem("chargingstations"))
            let droneCharging = JSON.parse(localStorage.getItem("droneCharging"))
            let indexx =  chargingstations[index].quads.findIndex(i => i && i.model ==  quad.model)
            chargingstations[index].quads[indexx].charge = "100%"
            droneCharging = droneCharging.filter(i => i.model != quad.model)
            localStorage.setItem("chargingstations", JSON.stringify(chargingstations))
            localStorage.setItem("droneCharging", JSON.stringify(droneCharging))
            setQuads(chargingstations[match.params.id -1 ].quads)
            setChargingQuads(droneCharging)
        }
        //
    }
    return (
        <>
            <Navbar />
            <h3 style={{ textAlign: "center" }}>Quads at Charging station {match.params.id}</h3>
            <Row>
                {
                    quads.length > 0 &&
                    quads.map((quad, index) => {
                        return <Col key={index} xs={24} sm={24} md={8} lg={8}>
                            {
                                quad ?
                                    <div className="quadsdiv">
                                        <p><span style={{ fontWeight: "bolder" }}>Manufacturer </span>{quad.manufacturer}</p>
                                        <p><span style={{ fontWeight: "bolder" }}>Model </span>{quad.model}</p>
                                        <p><span style={{ fontWeight: "bolder" }}>Charge </span>{
                                            quad.charge && <Progress percent={Number(quad.charge.split("%")[0])} trailColor="#fff" strokeColor="rgb(74 160 64 / 83%)" size="small" />}</p>
                                        <p><span style={{ fontWeight: "bolder" }}>Max Flight Time </span>{quad.maxFlightTime}</p>
                                        {
                                            chargingQuads.filter(i => i.model == quad.model).length > 0 ?
                                            <p className="chargingText">Its Charging........... Please Wait </p>
                                                :
                                                <>
                                                    <Button type={"primary"} onClick={() => renting(quad, index)} >Rent</Button>
                                                    {quad.charge && Number(quad.charge.split("%")[0]) < 91 && <Button type={"primary"} style={{ marginLeft: "10px" }} onClick={() => charge(quad, index)} >Charge Drone</Button>}
                                                </>
                                        }
                                    </div>
                                    :
                                    <div className="quadsdiv">
                                        <p>Free Slot</p>
                                        {
                                            land &&
                                            <Button type="primary" onClick={() => landPlab(quad, index)}>Land Here</Button>
                                        }
                                    </div>
                            }
                        </Col>
                    })
                }
            </Row>
        </>
    )
}

export default ChStation