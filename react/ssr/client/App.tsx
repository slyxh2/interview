import React from "react";
import { useState, Suspense } from "react";

const getAll = async () => {
    const prev = performance.now();
    while (performance.now() - prev < 2000) { }
    return Promise.resolve([1, 2, 3]);
};

function App() {
    return <>
        <Suspense fallback={<h1>I am in suspense</h1>}>
            <List />
        </Suspense>
    </>
}

async function List() {
    const all = await getAll();
    return (
        <ul>
            {
                all.map((item, index) => <li key={index}>{item}</li>)
            }
        </ul>

    );
}

export default App;