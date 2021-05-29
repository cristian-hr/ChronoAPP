import db_test from "../db-test.js";
import server from "../app-test.js"
import supertest from 'supertest'

describe("Route testing", () => {

    beforeAll(async () => {
        await db_test.conn.sync({ force: true });
    });

    test("GET should bring all the times", async () => {
        await supertest(server).post("/")
            .send({ time: "00:02:22" })
        await supertest(server).post("/")
            .send({ time: "00:01:11" })
        await supertest(server).post("/")
            .send({ time: "00:03:33" })

        const res = await supertest(server).get("/")

        expect(res.statusCode).toEqual(200) 
        expect(res.body.length).toBe(3)
    });

    test("POST showld make a new time", async () => {
        const res = await supertest(server).post("/")
            .send({ time: "00:01:99" })

        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty("time")
    })    

    test("DELETE should delete an specific time if an ID is sended", async () => {
        await supertest(server).post("/")
            .send({ time: "00:05:10" })
        await supertest(server).post("/")
            .send({ time: "00:07:10" })
        await supertest(server).post("/")
            .send({ time: "00:09:10" })

        await supertest(server).delete("/").send({id: 2})

        const res = await supertest(server).get("/")

        let time = res.body.find(time => time.id === 2)

        expect(res.statusCode).toEqual(200) 
        expect(time).toBe(undefined)
    });

    test("DELETE should delete all times if nothing is sended", async () => {
        await supertest(server).post("/")
            .send({ time: "11:11:11" })
        await supertest(server).post("/")
            .send({ time: "22:22:22" })
        await supertest(server).post("/")
            .send({ time: "33:33:33" })

        await supertest(server).delete("/")

        const res = await supertest(server).get("/")

        expect(res.statusCode).toEqual(200) 
        expect(res.body.length).toBe(0)
    });

    afterAll(async () => {
        await db_test.conn.close();
    })
})
