
import { List, Datagrid, TextField, useRecordContext, useResourceContext,CreateButton,
    DatagridConfigurable,
    ExportButton,
    FilterButton,
    SelectColumnsButton,
    TopToolbar,
    SearchInput,
    ShowButton,FilterForm,TextInput } from 'react-admin';

     import { Stack } from '@mui/material';

    const ImageField = ({ source }) => {
        const record = useRecordContext();
        
        if (!record ) return null;
        return <img src={`${process.env.VITE_API_URL}/assets/products/sm/${record.productImage.small}`} alt="" style={{ maxWidth: '200px', height: '100px' }} />;
    };


    const postFilters = [
   
        <TextInput label="Product Name" source="name" defaultValue="" />,
        <TextInput label="Product Brand" source="brand" defaultValue="" />,
        <TextInput label="Product Price" source="price" defaultValue="" />,
        <TextInput label="Product Options" source="option" defaultValue="" />
        
       
    
    
    
    
    
    
    
    
    
    
    
    ];
    
    const ListToolbar = () => (
        <Stack direction="column"  >
            <FilterForm filters={postFilters} />
            <div >
                <FilterButton filters={postFilters} />
                <ExportButton/>
                <CreateButton />
              
              
            </div>
        </Stack>
    )

  

const ProductsList = (props) =>{ 
  
    
    return(
    <List actions={<ListToolbar/>}>
        <Datagrid rowClick="edit">
            <TextField  source="id" />
            <ImageField />
            <TextField source="name" />
            <TextField source="brand" />
            <TextField source="price" />
            <ShowButton />

            
           
            
        </Datagrid>
    </List>
);
}
export default ProductsList;