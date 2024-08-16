import React from 'react';
import { useRecordContext } from 'react-admin';
import { Button } from '@mui/material';

const CustomButton = ({ id }) => {
    const record = useRecordContext();
    console.log(id
    )
    if (!record) return null;
    const handleClick = () => {
        // Handle custom action
        alert(`Record ID: ${record.id}`);
    };

    return <p style={{color:'red',padding:'25px'}} onClick={handleClick}>Custom Button</p>;
};

export default CustomButton;