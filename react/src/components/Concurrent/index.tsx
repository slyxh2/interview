import { useState, useTransition } from "react";
const Concurrent = () => {
    const [num1, setNum1] = useState(100);
    const [num2, setNum2] = useState(200);
    const [num3, setNum3] = useState(300);
    const [flag, startTransition] = useTransition();
    const handleLow = () => {
        startTransition(() => {
            setNum2(num2 + 1);
            setNum2(num2 + 1);
        })
    };
    const handleNormal = () => {
        setNum1(num1 + 1);
        setNum1(num1 + 1);
    }
    const handleMix = () => {
        startTransition(() => {
            setNum3((num) => {
                console.log('transition:', num);
                return num + 1;
            });
        })
        setNum3((num) => {
            console.log('normal priority', num);
            return num + 1;
        });
    }
    return <>
        <h1>This is Concurrent</h1>
        <h2>{num1}</h2>
        <h2>{num2}</h2>
        <h2>{num3}</h2>
        <button onClick={handleNormal}>handle normal</button>
        <button onClick={handleLow}>handle low</button>
        <button onClick={handleMix}>handle mix</button>


    </>
};

export default Concurrent;