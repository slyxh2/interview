import { useEffect, useState, useLayoutEffect } from "react";

function App() {
    const [num, setNum] = useState(0);
    console.log(1);

    useEffect(function innerEffect() {
        console.log(2);
    }, [num]);
    Promise.resolve().then(() => console.log(3));

    setTimeout(() => console.log(4), 0);

    return <>
        <Child />
        <div onClick={() => setNum(num + 1)}>open console to see the logs</div>
        <div>{num}</div>
    </>
}

function Child() {
    useEffect(() => {
        console.log('Child mount');
        return () => console.log('Child unmount');
    }, []);

    return 'i am child';
}

export default App;