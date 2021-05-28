import { render, screen, fireEvent, getByText } from '@testing-library/react';
import { act } from 'react-dom/test-utils'
import { configure, mount, shallow } from 'enzyme';
import Chrono from './Chrono.js';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

configure({ adapter: new Adapter() });


describe("Chrono", () => {
    const mock = jest.fn()
    let wrapper
    beforeEach(() => {
        wrapper = mount(<Chrono mock={mock} />)
    })

    xtest("must display a title", () => {
        render(<Chrono />);
        expect(screen.queryByText(/chronometer/i)).toBeInTheDocument();
    })

    xtest("must display a timer", () => {
        expect(wrapper.find(".numbersChrono").debug()).not.toBe("")
    })

    xtest("the timer must start at zero", () => {
        expect(wrapper.find(".numbersChrono").text()).toBe("00 : 00 : 00")
    })

    xtest("start button must start the timer", async () => {

        let span

        await act(async () => {

            wrapper.find(".buttonStart").simulate("click")

            await new Promise(res => setTimeout(res, 500))
                .then(() => {
                    span = wrapper.find(".numbersChrono").text()
                })
        })

        expect(Number(span.slice(-2))).not.toBe(0)

    })


    test("pause button must pause the timer", async () => {

        //Al renderizar Chrono, el botón Pause está oculto, y al buscarlo con un find no se encuentra.
        //Entonces para el test se va a usar el mismo botón Start el cual usa la misma función que el botón Pause,
        //la cual varía dependiendo del estado del trigger.

        let span

        await act(async () => {
            wrapper.find(".buttonStart").simulate("click")            
        })

        await act(async () => {

            async function pause () {
                setTimeout(async()=>{
                    wrapper.find(".buttonStart").simulate("click")
                    span = wrapper.find(".numbersChrono").text()
                },500)
            }

            await pause() 

            // const prom = async () => {
            //     await new Promise(res => setTimeout(res, 500))
            //         .then(async() => {
            //             await act(async () => {
            //                 wrapper.find(".buttonFinish").simulate("click")            
            //             })
            //             span = wrapper.find(".numbersChrono").text()
            //         })
            // }

            // await new Promise(res => setTimeout(res,500))
            //     .then(async()=>await prom())
        })

        expect(span).toBe("00 : 00 : 50")
    })

    xtest("finish button must reset the timer", () => { })

    xtest("finish button must save the time in the state", () => { })

    xtest("clear all button must delete all the times", () => { })

    xtest("X button must delete the corresponding time", () => { })

})