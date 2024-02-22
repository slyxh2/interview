import React, { useState, lazy, useEffect } from "react";
import { RouterProvider, createBrowserRouter, useNavigate } from 'react-router-dom'

import AliveDemo from "./Demo/AliveDemo";
import { getHello, login } from "./api";
const Bar = lazy(() => import("./components/Bar"));
const Update = lazy(() => import("./components/Update"));

import './style/index.css';

function LoginForm() {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleLogin = (event: React.FormEvent) => {
        event.preventDefault();
        login(username, password);
    }
    return <form onSubmit={(e) => handleLogin(e)}>
        <label htmlFor="username">UserName</label>
        <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <label htmlFor="password">Password</label>
        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <input type="submit" value="Login" />
    </form>
}

function RequestComponent() {
    const [isLoading, setLoading] = useState<boolean>(true);
    const [str, setStr] = useState<string>('');
    const sendHello = () => {
        getHello().then((res) => {
            console.log(res);
            setStr(res?.data || 'Not Login');
            setLoading(false);
        })
    }
    useEffect(() => {
        sendHello();
    }, [])
    if (isLoading) return <div>Loading...</div>
    return <div>
        <h1 onClick={sendHello}>RequestComponent</h1>
        <h2>{str}</h2>
        <LoginForm />
    </div>
}

function Main() {
    const [flag, setFlag] = useState(false);
    const navigate = useNavigate();
    return <>
        <h1>APP</h1>
        <button onClick={() => setFlag(!flag)}>CHANGE</button>
        {
            flag ? <div>FALSE</div> : <AliveDemo />
        }
        <button onClick={() => navigate('/update')}>Go to Update</button>
        <button onClick={() => navigate('/bar')}>Go to Bar</button>
        <RequestComponent />
    </>
}
const router = createBrowserRouter([
    {
        path: '/',
        element: <Main />
    },
    {
        path: '/bar',
        element: <Bar />
    },
    {
        path: '/update',
        element: <Update />
    }
])
function App() {
    return <RouterProvider router={router} />
}

export default App;