import React from 'react';
import { Row, Col } from 'antd';
import { useRouteMatch } from "react-router-dom";

function ChStation(props) {
    const match = useRouteMatch();
    const[quads, setQuads] = React.useState([])

    React.useEffect(() => {
        let quadsArr = JSON.parse(localStorage.getItem("chargingstations"))
        if(quadsArr && quadsArr.length > 0 ){
            console.log(quadsArr)
            if(quadsArr.filter(i => i.station == match.params.id).length > 0 )
                setQuads([...quadsArr.filter(i => i.station == match.params.id)[0].quads])
        }
    }, [])
    return (
        <>
            <h3 style={{textAlign:"center"}}>Quads at Charging station {match.params.id}</h3>
            <Row>
                {console.log(quads)}
                {
                    quads.length > 0 &&
                    quads.map((quad, index) => {
                        return <Col key={index} xs={24} sm={24} md={8} lg={8}>
                            <div className="quadsdiv">
                                <p><span style={{fontWeight: "bolder"}}>Manufacturer </span>{quad.manufacturer}</p>
                                <p><span style={{fontWeight: "bolder"}}>Model </span>{quad.model}</p>
                                <p><span style={{fontWeight: "bolder"}}>Charge </span>{quad.charge}</p>
                                <p><span style={{fontWeight: "bolder"}}>Max Flight Time </span>{quad.maxFlightTime}</p>
                            </div>
                        </Col>
                    })
                }
            </Row>
        </>
    )
}

export default ChStation