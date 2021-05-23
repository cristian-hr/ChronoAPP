import { useState, useEffect } from "react"
import "./Chrono.css";

function Chrono() {

    const initialTimer = { min: 0, sec: 0, ms: 0 }
    const initialRecord = []
    const initialTrigger = { start: false, pause: true, finish: false, count: 0 }

    const [timer, setTimer] = useState(initialTimer)
    const [record, setRecord] = useState(initialRecord)
    const [trigger, setTrigger] = useState(initialTrigger)

    let newMin = timer.min;
    let newSec = timer.sec;
    let newMs = timer.ms;

    useEffect(() => {
        let interval = null
        if (trigger.start) {
            interval = setInterval(() => {

                if (newMin === 100) newMin = 0;
                if (newSec === 60) { newMin++; newSec = 0 }
                if (newMs === 100) { newSec++; newMs = 0 }

                newMs++

                setTimer({ min: newMin, sec: newSec, ms: newMs });

            }, 10);
        }
        if (trigger.finish) {
            setRecord([...record, { id: trigger.count, time: timer }])
            setTimer(initialTimer)
            setTrigger({...trigger, finish: false})
        }
        return () => clearInterval(interval);

    }, [trigger])

    function handleTrigger() {
        if (trigger.start) setTrigger({ ...trigger, start: false })
        else setTrigger({ ...trigger, start: true })
    }

    function finish() {
        if (timer.min || timer.sec || timer.ms ) setTrigger({ start: false, finish: true, count: trigger.count+1 })
    }

    return (
        <div className="chronoCont">
            <h1>Chrono</h1>
            <div className="timerChrono">
                <span className="numbersChrono">{("0" + timer.min).slice(-2)} :</span>
                <span className="numbersChrono">{("0" + timer.sec).slice(-2)} :</span>
                <span className="numbersChrono">{("0" + timer.ms).slice(-2)}</span>
            </div>
            <div className="buttonsChrono">
                {trigger.start ?
                    <button className="buttonPause" onClick={handleTrigger}>Pause</button>
                    :
                    <button className="buttonStart" onClick={handleTrigger}>Start</button>}
                <button className="buttonFinish" onClick={finish}>Finish</button>
            </div>
            <div>
                {
                    record.map((times, index) => {
                        return <div>
                            <span className="recordNumberChrono">{index+1}.</span>
                            <span>{("0"+times.time.min).slice(-2)}: </span>
                            <span>{("0"+times.time.sec).slice(-2)}: </span>
                            <span>{("0"+times.time.ms).slice(-2)}</span>
                        </div>

                    })
                }

            </div>
        </div>
    )
}

export default Chrono;
