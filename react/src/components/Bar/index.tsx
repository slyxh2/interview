import React from 'react';
import { useNavigate } from 'react-router-dom';

const Bar = () => {
    const navigate = useNavigate();
    return <>
        <div>Bsdsars</div>
        <button onClick={() => navigate(-1)}>Go Back Home</button>
    </>

}

export default Bar;