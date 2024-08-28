import React, { useState } from 'react';
import { Menu, MenuItem, Button } from '@mui/material';
import { CSVLink } from 'react-csv';
import SpinnerRotating from '../skeletons/spinner';




const CsvMenu = ({ anchorEl, handleClose }) => {
    const apiUrl = process.env.VITE_API_URL;
    const [csvData, setCsvData] = useState([]);
    const [file, setFile] = useState(null);
    const token = localStorage.getItem('token');
   const [loading,setLoading]=useState(false);
    const handleGenerateCsv = () => {
        const data = [
            [
                'name',
                'brand',
                'productImage',
                'category',
                'option',
                'price',
                'Description',
                'Warnings',
                'More',
                'DietaryRestrictions',
                'Certifications'
            ],
        ];
        setCsvData(data);
    };

    const handleFileChange = (event) => {
        
        const selectedFile = event.target.files[0];
        setFile(selectedFile);
        if (selectedFile) {
            handleUpload(selectedFile);
        }
    };

    const handleUpload = (fileToUpload) => {
        const formData = new FormData();
        formData.append('file', fileToUpload);
        setLoading(true)
        fetch(`${apiUrl}/admin/CsvFile`, {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${token}` },
            body: formData
        })
        .then(response => response)
        .then((response) => {
           
            if(response.status===200)
        {

            setLoading(false)
        }else{
            alert('An error occured while uploading the file')
        }
        })
        .catch((error) => {setLoading(false);
            alert('An error occured while uploading')
        })
        .finally(()=>{
            setLoading(false)
        })
    };

    return (
        <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
        >
            {loading && <SpinnerRotating />}
            <MenuItem>
                <input
                    type="file"
                    accept=".csv"
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                    id="upload-csv"
                />
                <label htmlFor="upload-csv">
                    <Button
                        variant="contained"
                        color="primary"
                        component="span"
                       
                    >
                        Upload CSV
                    </Button>
                </label>
            </MenuItem>

            <MenuItem>
                <CSVLink
                    data={csvData}
                    filename={"products.csv"}
                    className="btn btn-primary"
                    onClick={handleGenerateCsv}
                >
                   Genrate CSV File
                </CSVLink>
            </MenuItem>
        </Menu>
    );
};

export default CsvMenu;
