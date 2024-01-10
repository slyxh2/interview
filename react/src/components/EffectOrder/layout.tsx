import { useLayoutEffect, useState } from "react";

const Layout = () => {
    const [num, setNum] = useState(99);
    useLayoutEffect(() => {
        console.log(22);
        setNum(88);
    }, []);
    return <>
        {num}
    </>
}

export default Layout;