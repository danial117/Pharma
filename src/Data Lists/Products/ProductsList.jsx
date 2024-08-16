
import { List, Datagrid, TextField, useRecordContext, useResourceContext,CreateButton,
    DatagridConfigurable,
    ExportButton,
    FilterButton,
    SelectColumnsButton,
    TopToolbar,
    SearchInput,
    ShowButton, } from 'react-admin';

    const ImageField = ({ source }) => {
        const record = useRecordContext();
        
        if (!record ) return null;
        return <img src={`${process.env.VITE_API_URL}/assets/products/${record.productImage}`} alt="" style={{ maxWidth: '200px', height: '100px' }} />;
    };

    const ListActions = () => (
        <TopToolbar>
            <SelectColumnsButton />
            <ImageField />
            <CreateButton/>
            <ExportButton/>
        </TopToolbar>
    );

const ProductsList = (props) =>{ 
  
    
    return(
    <List actions={<ListActions/>}>
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