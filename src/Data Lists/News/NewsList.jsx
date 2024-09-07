import { List, Datagrid, TextField, useRecordContext, useResourceContext,CreateButton,
   ExportButton,FilterButton,FilterForm,TextInput,
  ShowButton} from 'react-admin';
  import { useState } from 'react';
    import { Stack } from '@mui/material';
    import { AddPhotoAlternateRounded,UploadFileRounded } from '@mui/icons-material';
    import CsvMenu from '../../utils/CSVFileHandling';
    import FolderUploadMenu from '../../utils/uploadImagesFolder';

    const ImageField = ({ source }) => {
        const record = useRecordContext();
        console.log(record)
        if (!record ) return null;
        return <img src={`${process.env.VITE_API_URL}/assets/news/${record.imageUrl}`} alt="" style={{ maxWidth: '200px', height: '100px' }} />;
    };


    const postFilters = [
   
        <TextInput label="Topic Name" source="topic" defaultValue="" />,
        <TextInput label="Title" source="title" defaultValue="" />
       
  
    ];


    const ListToolbar = () => {
 
        const [anchorEl, setAnchorEl] = useState(null);
        const [anchorE2, setAnchorE2] = useState(null);

        const handleClick = (event) => {
            setAnchorEl(event.currentTarget);
        };

    
        const handleClose = () => {
            setAnchorEl(null);
        };

        const FolderMenuClick = (event) => {
            setAnchorE2(event.currentTarget);
        };
        
    
        const FolderMenuClose = () => {
            setAnchorE2(null);
        };
    
    
       return( <Stack direction="column"  >
         <FilterForm filters={postFilters} />
            <div >
                <FilterButton filters={postFilters} />
                <ExportButton/>
                <CreateButton />
             
                <UploadFileRounded
                    style={{ margin: '4px', color: 'blue', cursor: 'pointer',fontSize:35 }}
                    onClick={handleClick}
                />
                 <CsvMenu anchorEl={anchorEl} handleClose={handleClose} />
                 <AddPhotoAlternateRounded
                  style={{ margin: '4px', color: 'blue', cursor: 'pointer',fontSize:35 }}
                  onClick={FolderMenuClick}
                 />
                 <FolderUploadMenu anchorE2={anchorE2} handleClose={FolderMenuClose}  />
               
              
              
            </div>
        </Stack>
    )
}


const NewsList = (props) =>{ 
  
    
    return(
    <List actions={<ListToolbar/>}>
        <Datagrid rowClick="edit">
            <TextField  source="id" />
            <ImageField />
            <TextField source="title" />
            <TextField source="topic" />
            <ShowButton />
           
            
        </Datagrid>
    </List>
);
}
export default NewsList;