/**
 * Test Dom Update situation in React
 */

import { useState } from "react";
import { useNavigate } from "react-router-dom";


const Update = () => {
    const [num, setNum] = useState(20);
    const navigate = useNavigate();

    let arr = num % 2 === 0
        ? [<li key="1">1</li>, <li key="2">2</li>, <li key="3">3</li>]
        : [<li key="4">3</li>, <li key="5">2</li>, <li key="1">1</li>]
    return <>
        <ul onClick={() => setNum(num + 1)}>{arr}</ul>
        <button onClick={() => navigate(-1)}>Go Back Home</button>
    </>
}

export default Update;