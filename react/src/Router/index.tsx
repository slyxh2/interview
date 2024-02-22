import { useEffect, useState } from 'react';
import { createBrowserRouter, useNavigate, Link, Outlet, useOutlet, useLocation } from 'react-router-dom';
import { KeepAlive, OffscreenPlacer } from '../components/KeepAlive/Offscreen';

const Home = () => {
    const navigate = useNavigate();
    const [num, setNum] = useState(0);
    useEffect(() => {
        console.log('Home enter');
        return () => {
            console.log('Home destory');
        }
    }, [])
    const handleNav = () => {
        navigate('/menu')
    }
    return <>
        <div onClick={() => setNum(num + 1)}>This is Home</div>
        <h2>{num}</h2>
        <button onClick={handleNav}>Go To Menu</button>
        <Link to="/menu">Link To Menu</Link>
    </>
}

const Menu = () => {
    const navigate = useNavigate();
    useEffect(() => {
        console.log('Menu enter');
        return () => {
            console.log('Menu destory')
        }
    }, [])
    const handleNav = () => {
        navigate('/home')
    }
    return <>
        <div>This is Menu</div>
        <button onClick={handleNav}>Go Home</button>

    </>
}

const obj = {
    '/menu': <Menu />,
    '/home': <Home />
}

const Layout = () => {
    const location = useLocation();
    const ol = useOutlet();
    useEffect(() => {
        console.log('Layout enter');
        console.log(location);
        console.log(ol);
    }, [])
    return <>
        <h1>This is Layout</h1>
        <Outlet />
        {/* @ts-ignore */}
        {Object.keys(obj).map(path => <OffscreenPlacer key={path} path={path} children={obj[path]}></OffscreenPlacer>)}
    </>
}

const Profile = () => {
    const [num, setNum] = useState(0);
    return <>
        <div onClick={() => setNum(num + 1)}>This is Profile</div>
        <h2>{num}</h2>
    </>
}

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [{
            path: '/menu',
            element: <KeepAlive key={'/menu'} />
        }, {
            path: '/home',
            element: <KeepAlive key={'/home'} />
        }, {
            path: '/profile',
            element: <Profile />
        }]
    }
])

export default router;