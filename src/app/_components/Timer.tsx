import { useEffect, useState } from "react";

const getSeconds = (time : number) => {
    const seconds = Number(time % 60);
    if(seconds < 10) {
        return "0" + String(seconds);
    } else {
        return String(seconds);
    }
}

const Timer = () => {
    const [time, setTime] = useState(300); // 남은 시간 (단위: 초)
    
    useEffect(() => {
        const timer = setInterval(() => {
            setTime((prev) => prev - 1);
        }, 1000);
        return () => clearInterval(timer);
    }, []);
    
    return (
        <div>
            <h1>남은 시간</h1>
            <div>
                <span>{time / 60}</span>
                <span> : </span>
                <span>{getSeconds(time)}</span>
            </div>
        </div>
    );
}

export default Timer;