import { Router } from 'express';
import { Chronometer } from "../../db.js"

const router = Router();

router.get("/", async (req, res) => {

    try {

        const records = Chronometer.findAll({
            attributes: ["time"]
        })

        res.json(records)

    } catch (error) {
        console.log(error)
    }
})

router.post("/", async (req, res) => {

    const { time } = req.body

    try {

        const newTime = Chronometer.create({ time })

        res.json(newTime)

    } catch (error) {
        console.log(error)
    }
})

