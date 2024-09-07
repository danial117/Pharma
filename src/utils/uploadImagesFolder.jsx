import  { useState } from 'react';
import { Menu, MenuItem, Button } from '@mui/material';
import SpinnerRotating from '../skeletons/spinner';
import { useResourceContext } from 'react-admin';


const FolderUploadMenu = ({ anchorE2, handleClose }) => {
    const apiUrl = process.env.VITE_API_URL;
    const [files, setFiles] = useState([]);
    const token = localStorage.getItem('token');
    const [loading,setLoading]=useState(false);
    const resource=useResourceContext()

    const handleFolderChange = (event) => {
        const selectedFiles = Array.from(event.target.files);
        setFiles(selectedFiles);
        uploadFiles(selectedFiles);
    };

    const uploadFiles = (files) => {
        const formData = new FormData();
        files.forEach((file, index) => {
            formData.append(`file_${index}`, file);
        });
        setLoading(true)
        let endpoint;
        alert(resource)
        switch(resource) {
            
            case 'products':
                endpoint = 'products/uploadFolder';
                break;
            case 'brands':
                endpoint = 'brands/uploadFolder';
                break;
            case 'news':
                endpoint = 'news/uploadFolder';
                break;
            default:
                endpoint = 'default/uploadFolder'; // Fallback to a default endpoint
        }

        fetch(`${apiUrl}/admin/${endpoint}`, {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${token}` },
            body: formData
        })
        .then(response => response)
        .then((response) => {
            if(response.status === 200){
                setLoading(false)
            }

        })
        .catch((error) => {
            setLoading(false)
        }).finally(()=>{
            setLoading(false)

        })
    };

    return (
        <Menu
            anchorEl={anchorE2}
            open={Boolean(anchorE2)}
            onClose={handleClose}
        >
        {
        loading && <SpinnerRotating/>
        }
            <MenuItem>
                <input
                    type="file"
                    webkitdirectory="true"
                    mozdirectory="true"
                    directory="true"
                    onChange={handleFolderChange}
                    style={{ display: 'none' }}
                    id="upload-folder"
                />
                <label htmlFor="upload-folder">
                    <Button
                        variant="contained"
                        color="primary"
                        component="span"
                    >
                        Upload Images Folder
                    </Button>
                </label>
            </MenuItem>
        </Menu>
    );
};

export default FolderUploadMenu;