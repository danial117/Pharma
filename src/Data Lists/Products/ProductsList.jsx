
import { List, Datagrid, TextField, useRecordContext, useResourceContext,CreateButton,
    DatagridConfigurable,
    ExportButton,
    FilterButton,
    SelectColumnsButton,
    TopToolbar,
    SearchInput,
    ShowButton,FilterForm,TextInput } from 'react-admin';
    import { UploadFileRounded, AddPhotoAlternateRounded } from '@mui/icons-material';
    import { useState } from 'react';
     import { Stack } from '@mui/material';
     import CsvMenu from '../../utils/CSVFileHandling';
     import FolderUploadMenu from '../../utils/uploadImagesFolder';

    const ImageField = ({ source }) => {
        const record = useRecordContext();
        
        if (!record ) return null;
        return <img src={`${process.env.VITE_API_URL}/assets/products/sm/${record.productImage?.small}`} alt="" style={{ maxWidth: '200px', height: '100px' }} />;
    };


    const postFilters = [
   
        <TextInput label="Product Name" source="name" defaultValue="" />,
        <TextInput label="Product Brand" source="brand" defaultValue="" />,
       
  
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

  

const ProductsList = (props) =>{ 
  
    
    return(
    <List actions={<ListToolbar/>}>
        <Datagrid rowClick="edit">
            <TextField  source="id" />
            <ImageField />
            <TextField source="name" />
            <TextField source="brand" />
          
            <ShowButton />

            
           
            
        </Datagrid>
    </List>
);
}
export default ProductsList;