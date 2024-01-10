import { useEffect, useLayoutEffect, useState } from "react";
import Layout from "./layout";

const Order = () => {
    const [num, setNum] = useState(0);
    // return <>
    //     <button onClick={() => setNum(1)}>click</button>
    //     {num === 0 ? <Child /> : <div>22</div>}
    // </>
    return <Layout />
}
const Child = () => {
    useEffect(() => {
        console.log('useEffect run');
        return () => {
            console.log('useEffect unmount')
        }
    })
    useLayoutEffect(() => {
        console.log('useLayoutEffect run');
        return () => {
            console.log('useLayoutEffect unmount')
        }
    })
    return <div>
        Child
    </div>
}
export default Order;