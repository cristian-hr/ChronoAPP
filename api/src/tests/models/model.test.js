import db from "../../db.js";

beforeAll(async () => {
    await db.conn.sync({ force: true });
});

test('time record', async () => {
    expect.assertions(2);
    const time1 = await db.Chronometer.create({
        time: "00:01:67"
    });
    const time2 = await db.Chronometer.create({
        time: "05:02:98"
    });
    expect(time1.time).toEqual("00:01:67");
    expect(time2.time).toEqual("05:02:98");
});

test('get times', async () => {
    expect.assertions(1);
    const times = await db.Chronometer.findAll();
    expect(times.length).toEqual(2)
});

test('delete time', async () => {
    expect.assertions(1);
    await db.Chronometer.destroy({
        where: {
            id: 1
        }
    });
    const time = await db.Chronometer.findByPk(1);
    expect(time).toBeNull();
});

afterAll(async () => {
    await db.conn.close();
});