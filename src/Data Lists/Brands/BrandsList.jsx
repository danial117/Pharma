
import { List, Datagrid, TextField, useRecordContext, useResourceContext,CreateButton,
    DatagridConfigurable,
    ExportButton,
    FilterButton,
    SelectColumnsButton,
    TopToolbar,
    SearchInput,
    ShowButton, } from 'react-admin';

    const ListActions = () => (
        <TopToolbar>
            <SelectColumnsButton />
            
            <CreateButton/>
            <ExportButton/>
        </TopToolbar>
    );

    const ImageField = ({ source }) => {
        const record = useRecordContext();
        console.log(record)
        if (!record ) return null;
        return <img src={`${process.env.VITE_API_URL}/assets/brands/${record.brandLogoPath}`} alt="" style={{ maxWidth: '200px', height: '100px' }} />;
    };

const BrandsList = (props) =>{ 
  
    
    return(
    <List actions={<ListActions/>}>
        <Datagrid rowClick="edit">
            <TextField  source="id" />
             <ImageField />
            <TextField source="name" />
            <ShowButton />
            
           
            
           
            
        </Datagrid>
    </List>
);
}
export default BrandsList;