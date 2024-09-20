import  { useState } from 'react';
import { Menu, MenuItem, Button, LinearProgress, Box, Typography } from '@mui/material';
import SpinnerRotating from '../skeletons/spinner';
import { useResourceContext } from 'react-admin';

const FolderUploadMenu = ({ anchorE2, handleClose }) => {
    const apiUrl = process.env.VITE_API_URL;
    const [files, setFiles] = useState([]);
    const token = localStorage.getItem('token');
    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState(0); // State for progress tracking
    const [uploadedCount, setUploadedCount] = useState(0); // State for tracking uploaded files
    const resource = useResourceContext();

    // Function to split files into chunks
    const chunkFiles = (filesArray, chunkSize) => {
        const chunks = [];
        for (let i = 0; i < filesArray.length; i += chunkSize) {
            chunks.push(filesArray.slice(i, i + chunkSize));
        }
        return chunks;
    };

    const handleFolderChange = (event) => {
        const selectedFiles = Array.from(event.target.files);
        setFiles(selectedFiles);
        uploadFilesInChunks(selectedFiles);
    };

    const uploadFilesInChunks = async (files) => {
        const chunkSize = 1; // Number of files per chunk
        const fileChunks = chunkFiles(files, chunkSize); // Split files into chunks
        setLoading(true);
        setProgress(0); // Reset progress when starting a new upload
        setUploadedCount(0);

        let endpoint;
        switch (resource) {
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

        try {
            let totalFilesUploaded = 0;
            for (let chunkIndex = 0; chunkIndex < fileChunks.length; chunkIndex++) {
                const formData = new FormData();
                fileChunks[chunkIndex].forEach((file, index) => {
                   
                    const encodedFileName = encodeURIComponent(file.name);
                   
                    const newFile = new File([file], encodedFileName, { type: file.type });
                    formData.append(`file_${index}`, newFile);
                });

                await fetch(`${apiUrl}/admin/${endpoint}`, {
                    method: 'POST',
                    headers: { 'Authorization': `Bearer ${token}` },
                    body: formData,
                }).then((response) => {
                    if (response.ok) {
                        totalFilesUploaded += fileChunks[chunkIndex].length;
                        // Calculate progress based on the number of files uploaded
                        setUploadedCount((prev) => prev + fileChunks[chunkIndex].length); // Increment uploaded count
                        const progressPercentage = Math.round((totalFilesUploaded / files.length) * 100);
                        setProgress(progressPercentage);
                    } else {
                        console.error(`Error uploading chunk ${chunkIndex + 1}`);
                    }
                });
            }
        } catch (error) {
            console.error('Error uploading files:', error);
            handleClose();
        } finally {
            setLoading(false);
            handleClose();
        }
    };

    return (
        <Menu anchorEl={anchorE2} open={Boolean(anchorE2)} onClose={handleClose}>
            {loading && (
                  <Box sx={{ width: '100%', padding: '1rem' }}>
                  <Typography>Uploading folder...</Typography>
                  <LinearProgress variant="determinate" value={progress} />
                  <Typography>{uploadedCount}/{files.length} files uploaded</Typography> 
                 
              </Box>
            )}
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
                    <Button variant="contained" color="primary" component="span">
                        Upload Images Folder
                    </Button>
                </label>
            </MenuItem>
        </Menu>
    );
};

export default FolderUploadMenu;