import { useState } from 'react';
import Offscreen from '../components/KeepAlive/Offscreen';

function Child1() {
    const [count, setCount] = useState(0);

    return (
        <button type="button" onClick={() => setCount(count + 1)}>
            {count}
        </button>
    )
}

function Child2() {
    const [count, setCount] = useState(0);

    return (
        <button type="button" onClick={() => setCount(count + 1)}>
            {count}
        </button>
    )
}

function AliveDemo() {
    const [bool, setBool] = useState(false);

    return (
        <>
            <button onClick={() => setBool(!bool)}>click</button>
            <Offscreen visible={bool}>
                <Child1 />
            </Offscreen>
            <Offscreen visible={bool}>
                <Child2 />
            </Offscreen>
        </>
    )
}

export default AliveDemo;