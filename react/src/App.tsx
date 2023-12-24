import { useEffect, useState, useLayoutEffect } from "react";

function App() {

    console.log('app');
    const [num, updateNum] = useState(0);
    useEffect(() => {
        console.log('App mount');
    }, []);
    Promise.resolve().then(() => {
        console.log("promise");
    })

    useLayoutEffect(() => {
        console.log('useLayoutEffect')
    }, [])

    useEffect(() => {
        console.log('num change create', num);
        return () => {
            console.log('num change destroy', num);
        };
    }, [num]);

    return (
        <div onClick={() => updateNum(num + 1)}>
            {num === 0 ? <Child /> : 'noop'}
        </div>
    );
}

function Child() {
    useEffect(() => {
        console.log('Child mount');
        return () => console.log('Child unmount');
    }, []);

    return 'i am child';
}

export default App;