import { useState, useEffect } from "react"
import axios from "axios";
import "./Chrono.css";

function Chrono() {

    var back_url

    if (process.env.BACKEND_DOCKER_URL) {        
        back_url = process.env.BACKEND_DOCKER_URL
    }
    else {
        back_url = process.env.REACT_APP_BACK_URL
    }

    const initialTimer = { min: 0, sec: 0, ms: 0 }
    const initialRecord = []
    const initialTrigger = { start: false, pause: true, finish: false }

    const [timer, setTimer] = useState(initialTimer)
    const [record, setRecord] = useState(initialRecord)
    const [trigger, setTrigger] = useState(initialTrigger)

    let newMin = timer.min;
    let newSec = timer.sec;
    let newMs = timer.ms;

    //Get data from DB
    useEffect(() => {
        axios.get(back_url)
            .then((res) => setRecord(res.data))
            .catch((err) => console.log(err))
    }, [])

    useEffect(() => {

        let interval = null
        //Start timer
        if (trigger.start) {
            interval = setInterval(() => {

                if (newMs === 100) { newSec++; newMs = 0 }
                if (newSec === 60) { newMin++; newSec = 0 }
                if (newMin === 100) newMin = 0;

                newMs++

                setTimer({ min: newMin, sec: newSec, ms: newMs });

            }, 10);
        }
        //Finish timer and saved it in the DB
        if (trigger.finish) {
            axios.post(back_url,
                {
                    time:
                        ("0" + timer.min).slice(-2) + ":" +
                        ("0" + timer.sec).slice(-2) + ":" +
                        ("0" + timer.ms).slice(-2)
                }
            )
                .then((res) => {
                    setRecord([...record, res.data])
                })
                .then(() => setTimer(initialTimer))
                .then(() => setTrigger({ ...trigger, finish: false }))
                .catch((err) => console.log(err))
        }
        else {
            return () => clearInterval(interval);
        }

    }, [trigger])

    //Trigger handle
    function handleTrigger() {
        if (trigger.start) setTrigger({ ...trigger, start: false })
        else setTrigger({ ...trigger, start: true })
    }

    //Finish handle
    function handleFinish() {
        if (timer.min || timer.sec || timer.ms) setTrigger({ start: false, finish: true })
    }

    //Clear all records
    function clearRecords() {
        axios.delete(back_url, { data: { id: "All" } })
            .catch(err => console.log(err))
        setRecord(initialRecord)
    }

    //Delete record
    function deleteRecord(time) {
        axios.delete(back_url, { data: { id: time.id } })
            .catch(err => console.log(err))
        setRecord([...record.filter(record => record.id !== time.id)])
    }

    return (
        <div className="chronoCont">
            <h1>Chronometer</h1>
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
                <button className="buttonFinish" onClick={handleFinish}>Finish</button>
            </div>
            <div className="divRecordedTimesChrono">
                <span className="recordedTimesChrono">Recorded times</span>
                <button className="clearAllButtonChrono" onClick={clearRecords}>Clear all</button>
            </div>
            <div className="divTimesChrono">
                {
                    record.map((times, index) => {
                        return <div className="divSingleTimeChrono">
                            <div>
                                <span className="recordNumberChrono">{index + 1}.</span>
                                <span>{times.time.slice(0, 2)} : </span>
                                <span>{times.time.slice(3, 5)} : </span>
                                <span>{times.time.slice(6, 8)}</span>
                            </div>
                            <div className="divDeleteRecordButton">
                                <button className="deleteRecordButton" onClick={() => deleteRecord(times)}> X </button>
                            </div>
                        </div>

                    })
                }
            </div>
        </div>
    )
}

export default Chrono;
