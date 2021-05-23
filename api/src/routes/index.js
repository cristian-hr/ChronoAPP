// "use strict";
import { Router } from 'express';
import { Chronometer } from "../db.js";
// import "babel-core/register";
// import "babel-polyfill";

const router = Router();

router.get("/", async (req, res) => {

    try {

        const records = await Chronometer.findAll({})

        res.json(records)

    } catch (error) {
        console.log(error)
    }
})

router.post("/", async (req, res) => {

    const { time, idFront } = req.body

    try {

        const newTime = await Chronometer.create({ idFront, time })

        res.json(newTime)

    } catch (error) {
        console.log(error)
    }
})

router.delete("/", async (req, res) => {

    const { id } = req.body

    try {

        if (typeof id === "number") {

            const deleteTime = await Chronometer.destroy({ where: { id } })

            res.json(deleteTime)
        }

        else {
            
            await Chronometer.destroy({
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
