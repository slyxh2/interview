import type { FunctionComponent, ReactElement } from "react";
import React, { Suspense, useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

export interface OffscreenProps {
    visible: boolean;
    children: ReactElement
}
export interface OffscreenHandler {
    setMount: (() => void) | null
    setUnmount: (() => void) | null
}
export interface ComponentPathMapObject {
    Offscreen: FunctionComponent<OffscreenProps>
    handler: OffscreenHandler
}
export interface OffscreenPlacerProps {
    children: JSX.Element,
    path: string
}
export interface KeepAliveProps {
    children: ReactElement
}
const memoHandlerMap = new Map<string, React.Dispatch<any>>();
const OffscreenImpl: FunctionComponent<OffscreenProps> = (props) => {
    const { visible, children } = props;
    const resolveRef = useRef<Function>();
    if (resolveRef.current) {
        resolveRef.current();
        resolveRef.current = void 0;
    }
    if (!visible) {
        throw new Promise((resolve) => resolveRef.current = resolve);
    }
    return <>
        {children}
    </>
}
export const getComponentPathMapObject = (): ComponentPathMapObject => {
    const handler: {
        setMount: (() => void) | null
        setUnmount: (() => void) | null
    } = {
        setMount: null,
        setUnmount: null
    };
    const OffscreenInner: FunctionComponent<{ children: ReactElement }> = ({ children }) => {
        const [visible, setVisible] = useState(true);
        handler['setMount'] = () => setVisible(true);
        handler['setUnmount'] = () => setVisible(false);
        return <Offscreen visible={visible}>
            {children}
        </Offscreen>
    }
    return { handler, Offscreen: OffscreenInner }
}
export const Offscreen: FunctionComponent<OffscreenProps> = (props) => {
    const { visible, children } = props;

    return <Suspense>
        <OffscreenImpl visible={visible}>
            {children}
        </OffscreenImpl>
    </Suspense>
};

export const OffscreenPlacer: FunctionComponent<OffscreenPlacerProps> = (props) => {
    const { path, children } = props;
    const [visible, setVisible] = useState(false);
    memoHandlerMap.set(path, setVisible);
    return <Offscreen visible={visible}>
        {children}
    </Offscreen>
};

export const KeepAlive: FunctionComponent = () => {
    const { pathname } = useLocation();
    useEffect(() => {
        const handler = memoHandlerMap.get(pathname)
        if (handler) {
            handler(true);
        }
        return () => {
            if (handler) {
                console.log('keep unmount')
                handler(false);
            }
        }
    }, [])
    return null;
};

export default Offscreen;