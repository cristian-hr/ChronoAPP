import { Router } from 'express';
import db from "../db-test";

const router = Router();

router.get("/", async (req, res) => {

    try {
        const records = await db.Chronometer.findAll({})
        res.json(records)
    } catch (error) {
        console.log(error)
    }
})

router.post("/", async (req, res) => {

    const { time } = req.body

    try {
        const newTime = await db.Chronometer.create({ time })
        res.json(newTime)

    } catch (error) {
        console.log(error)
    }
})

router.delete("/", async (req, res) => {

    const { id } = req.body

    try {
        if (typeof id === "number") {
            const deleteTime = await db.Chronometer.destroy({ where: { id } })
            res.json(deleteTime)
        }
        else {            
            await db.Chronometer.destroy({
                where: {},
                truncate: true
            })
            res.json({msg:"All times where deleted"})
        }
        
    } catch (error) {
        console.log(error)
    }
})

export default router;
