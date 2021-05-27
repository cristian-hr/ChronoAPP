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

    const initialTimer = { min: 0, sec: 0, cen: 0, allCen: 0 }
    const initialRecord = []
    const initialTrigger = { start: false, finish: false }

    const [timer, setTimer] = useState(initialTimer)
    const [record, setRecord] = useState(initialRecord)
    const [trigger, setTrigger] = useState(initialTrigger)

    //Get data from DB
    useEffect(() => {
        axios.get(back_url)
            .then((res) => setRecord(res.data))
            .catch((err) => console.log(err))
    }, [back_url])

    useEffect(() => {

        let cen = timer.allCen
        let interval = null

        //Start timer
        if (trigger.start) {
            interval = setInterval(() => {

                let newCen = cen % 100
                let newSec = Math.floor(cen / 100) % 60
                let newMin = Math.floor(cen / 6000) % 100
                cen++

                setTimer({ min: newMin, sec: newSec, cen: newCen, allCen: cen });
                
            }, 10);
        }
        //Finish timer and saved it in the DB
        if (trigger.finish) {
            axios.post(back_url,
                {
                    time:
                        ("0" + timer.min).slice(-2) + ":" +
                        ("0" + timer.sec).slice(-2) + ":" +
                        ("0" + timer.cen).slice(-2)
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
        // eslint-disable-next-line
    }, [trigger])

    //Trigger handle
    function handleTrigger() {
        if (trigger.start) setTrigger({ ...trigger, start: false })
        else setTrigger({ ...trigger, start: true })
    }

    //Finish handle
    function handleFinish() {
        if (timer.min || timer.sec || timer.cen) setTrigger({ start: false, finish: true })
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
                <span className="numbersChrono">{("0" + timer.cen).slice(-2)}</span>
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
