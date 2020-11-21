import React, { useState } from 'react'

function Timer(props) {
    const [time, setTime] = React.useState(null)
    React.useEffect(() => {
        var stTime = new Date(props.startTime);
        stTime.setSeconds(stTime.getSeconds() + props.time);
        stTime = stTime.getTime();
        let handle = setInterval(() => {
            var now = new Date().getTime();
            var distance = stTime - now;
            if(distance < 0) {
                props.getFlyingDrones()
                clearInterval(handle)
            }
            var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((distance % (1000 * 60)) / 1000)
            setTime(`${hours}:${minutes}:${seconds}`)
        }, 1000);    
    },[])
    return (
    <p>{time}</p>
    )
}
export default Timer