// @ts-ignore
import { useState, use, useContext, useEffect } from "react";
import { ThemeContext } from "./context";


function App() {
    const [num, setNum] = useState(0);
    if (num % 2 === 1) {
        const theme = use();
        console.log(theme);
    }

    return (<>
        <h1 onClick={() => { setNum(num + 1) }}>This is App</h1>
        <h2>{num}</h2>
    </>
    )
}


export default App;