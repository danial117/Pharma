import React, { useEffect } from 'react';
import './Spinner.css'; // We'll define the styles here

const SpinnerRotating = () => {
    useEffect(()=>{
        document.body.classList.add('no-scroll');
        return () => {
            
            document.body.classList.remove('no-scroll');
        };

    },[])
    return (
        <div className="spinner-overlay">
            <div className="spinner-circle"></div>
        </div>
    );
};

export default SpinnerRotating;







