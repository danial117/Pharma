import  { useState, useEffect } from 'react';
import { IconButton, Menu, MenuItem } from '@mui/material';
import { EditRounded, SettingsApplicationsRounded } from '@mui/icons-material';
import { useRecordContext } from 'react-admin';

const DashedImage = ({ alt, className, id, onFileChange, source }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const record = useRecordContext();
  const [currentSrc, setCurrentSrc] = useState(`${process.env.VITE_API_URL}/assets/CMS/${record[source]}`);
  const [file, setFile] = useState(null);
 
  

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCurrentSrc(reader.result); // Update state with the new image URL
        setFile(selectedFile); // Store the file in state
        if (onFileChange) onFileChange(id, selectedFile); // Notify parent component of the file change
      };
      reader.readAsDataURL(selectedFile); // Convert image file to base64 URL
    }
  };

  return (
    <div className="group relative">
      <img
        src={currentSrc}
        alt={alt}
        onClick={handleClick}
        className={`w-full ${className} group-hover:border-4 group-hover:border-dashed group-hover:border-blue-600`}
      />

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        transformOrigin={{ horizontal: 'center', vertical: 'top' }}
      >
        <MenuItem onClick={() => document.getElementById(`image-upload-${id}`).click()}>
          <IconButton>
            <EditRounded />
          </IconButton>
          Edit
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <IconButton>
            <SettingsApplicationsRounded />
          </IconButton>
          Settings
        </MenuItem>
      </Menu>

      <input
        id={`image-upload-${id}`}
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
    </div>
  );
};

export default DashedImage;