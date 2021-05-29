import React from 'react';
import { act } from 'react-dom/test-utils'
import { configure, mount } from 'enzyme';
import Chrono from './Chrono.js';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

configure({ adapter: new Adapter() });

describe("Chrono", () => {
    const callback = jest.fn()
    jest.setTimeout(10000)
    let wrapper
    beforeEach(() => {
        jest.useFakeTimers();
        wrapper = mount(<Chrono callback={callback} />)
    })

    test("must display a title", () => {
        expect(wrapper.find("h1").debug()).not.toBe("")
    })

    test("must display a timer", () => {
        expect(wrapper.find(".numbersChrono").debug()).not.toBe("")
    })

    test("the timer must start at zero", () => {
        expect(wrapper.find(".numbersChrono").text()).toBe("00 : 00 : 00")
    })

    test("start button must start the timer", async () => {
        await act(async () => {
            wrapper.find(".buttonStart").simulate("click")
        })
        expect(setInterval).toHaveBeenCalledTimes(1)
    })

    test("pause button must pause the timer", async () => {
        /* Al renderizar Chrono, el botón Pause está oculto, y al buscarlo con un find no se encuentra.
        Entonces para el test se va a usar el mismo botón Start el cual usa la misma función handleTrigger que el botón Pause,
        la cual varía dependiendo del estado del trigger. */
        let timer;

        await act(async () => {
            wrapper.find(".buttonStart").simulate("click")
        })

        //En los test hay un retraso de 1 centesima, por lo que se agrega en el timer.
        //Ej: 510 en vez de 500
        await act(async () => {
            jest.advanceTimersByTime(510);
            wrapper.find(".buttonStart").simulate("click")
        })

        //Avanzo 100 ms despues de haber apretado el botón pause para verificar que efectivamente funcionó
        await act(async () => {
            jest.advanceTimersByTime(100);
        })

        await act(async () => {
            timer = wrapper.find(".numbersChrono").text()
        })

        await expect(setInterval).toHaveBeenCalledTimes(1)

        await expect(timer).toBe("00 : 00 : 50")
    })

    test("finish button must reset the timer", async () => {
        //Parto el timer
        await act(async () => {
            wrapper.find(".buttonStart").simulate("click")
        })
        //Espero una centecima de segundo y paro el timer
        await act(async () => {
            jest.advanceTimersByTime(510);
            wrapper.find(".buttonStart").simulate("click")
        })
        //Verifico que el timer esté correctamente en "00:00:50"
        await expect(wrapper.find(".numbersChrono").text()).toBe("00 : 00 : 50")

        //Apreto el botón finish
        await act(async () => {
            wrapper.find(".buttonFinish").simulate("click")
        })

        jest.useRealTimers()
        await new Promise(res => setTimeout(res, 1000))
        // //Verifico que el timer esté en "00:00:00"  
        expect(wrapper.find(".numbersChrono").text()).toBe("00 : 00 : 00")
    })

    test("finish button must save the time in the state", async () => {
        //Parto el timer
        await act(async () => {
            wrapper.find(".buttonStart").simulate("click")
        })
        //Lo dejo correr por 830ms
        await act(async () => {
            jest.advanceTimersByTime(830);
            wrapper.find(".buttonFinish").simulate("click")
        })

        jest.useRealTimers()
        await new Promise(res => setTimeout(res, 1000))
        wrapper.update()

        //Verifico que el timer exista el tiempo "00:00:82"
        let times = wrapper.find("span").map(span => span.text())
        let time = times.find(time => time === "00 : 00 : 82")

        expect(time).not.toBe(undefined)
    })

    test("X button must delete the corresponding time", async () => {

        //Parto el primer timer
        await act(async () => {
            wrapper.find(".buttonStart").simulate("click")
        })
        //Lo dejo correr por 490ms
        await act(async () => {
            jest.advanceTimersByTime(490);
            wrapper.find(".buttonFinish").simulate("click")
        })
        wrapper.update()
        jest.useRealTimers()
        await new Promise(res => setTimeout(res, 500))

        jest.useFakeTimers()
        //Parto el segundo timer
        await act(async () => {
            wrapper.find(".buttonStart").simulate("click")
        })
        //Lo dejo correr por 350ms
        await act(async () => {
            jest.advanceTimersByTime(350);
            wrapper.find(".buttonFinish").simulate("click")
        })
        wrapper.update()

        jest.useRealTimers()
        await new Promise(res => setTimeout(res, 1000))
        wrapper.update()

        //Borro el último tiempo guardado que corresponde al "00:00:34"
        await act(async () => {
            wrapper.find(".deleteRecordButton").at(1).simulate("click")
        })
        wrapper.update()
        //Verifico que el time "00:00:34" se haya borrado
        let times = wrapper.find("span").map(span => span.text())
        let time = times.find(time => time === "00 : 00 : 34")

        expect(time).toBe(undefined)
    })

    test("clear all button must delete all the times", async () => {
        //Parto el primer timer
        await act(async () => {
            wrapper.find(".buttonStart").simulate("click")
        })
        //Lo dejo correr por 310ms
        await act(async () => {
            jest.advanceTimersByTime(310);
            wrapper.find(".buttonFinish").simulate("click")
        })
        wrapper.update()
        jest.useRealTimers()
        await new Promise(res => setTimeout(res, 500))

        jest.useFakeTimers()
        //Parto el segundo timer
        await act(async () => {
            wrapper.find(".buttonStart").simulate("click")
        })
        //Lo dejo correr por 290ms
        await act(async () => {
            jest.advanceTimersByTime(290);
            wrapper.find(".buttonFinish").simulate("click")
        })
        wrapper.update()

        jest.useRealTimers()
        await new Promise(res => setTimeout(res, 1000))
        wrapper.update()

        //Borro todos los tiempos
        await act(async () => {
            wrapper.find(".clearAllButtonChrono").simulate("click")
        })
        wrapper.update()
        //Verifico que todos los tiempos se hayan borrado.
        let times = wrapper.find("span").map(span => span.text())        
        let time = times.includes("00 : 00 : 30", "00 : 00 : 28")
        //Time debería ser false si ninguno de los tiempos existe en el array times
        expect(time).toBe(false)
    })
})