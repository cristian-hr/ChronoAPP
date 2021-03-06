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

    const initialTimer = { min: 0, sec: 0, hun: 0, allHun: 0 }
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

        let hun = timer.allHun
        let interval = null

        //Start timer
        if (trigger.start) {
            interval = setInterval(() => {

                let newHun = hun % 100
                let newSec = Math.floor(hun / 100) % 60
                let newMin = Math.floor(hun / 6000) % 100
                hun++

                setTimer({ min: newMin, sec: newSec, hun: newHun, allHun: hun });

            }, 10);
        }
        //Finish timer and save it in the DB
        if (trigger.finish) {
            axios.post(back_url,
                {
                    time:
                        ("0" + timer.min).slice(-2) + ":" +
                        ("0" + timer.sec).slice(-2) + ":" +
                        ("0" + timer.hun).slice(-2)
                }
            )
                .then((res) => setRecord([...record, res.data]))
                .then(() => setTimer(initialTimer))
                .then(() => setTrigger({ ...trigger, finish: false }))
                .catch((err) => console.log(err))
        }

        return () => clearInterval(interval);

    }, [trigger])

    //Trigger handle
    function handleTrigger() {
        if (trigger.start) setTrigger({ ...trigger, start: false })
        else setTrigger({ ...trigger, start: true })
    }

    //Finish handle
    function handleFinish() {
        if (timer.min || timer.sec || timer.hun) setTrigger({ start: false, finish: true })
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
                <span className="numbersChrono">
                    {("0" + timer.min).slice(-2) + " : "}
                    {("0" + timer.sec).slice(-2) + " : "}
                    {("0" + timer.hun).slice(-2)}
                </span>
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
                        return <div key={index} className="divSingleTimeChrono">
                            <div>
                                <span className="recordNumberChrono">{index + 1}.</span>
                                <span>
                                    {times.time.slice(0, 2) + " : "}
                                    {times.time.slice(3, 5) + " : "}
                                    {times.time.slice(6, 8)}
                                </span>
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
