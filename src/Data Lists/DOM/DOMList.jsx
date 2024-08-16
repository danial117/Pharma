
import { List, Datagrid, TextField, useRecordContext, useResourceContext,CreateButton,
    DatagridConfigurable,
    ExportButton,
    FilterButton,
    SelectColumnsButton,
    TopToolbar,
    SearchInput,
ShowButton } from 'react-admin';

    const ListActions = () => (
        <TopToolbar>
            <SelectColumnsButton />
            
            <CreateButton/>
            <ExportButton/>
        </TopToolbar>
    );

const DomList = () =>{ 
  
    
    return(
    <List actions={<ListActions/>}>
        <Datagrid >
            <TextField  source="id" />
            <TextField source="HomePageMainBanner" />
            <TextField source="AboutPageImage1" />
            <TextField source="AboutPageImage2" />
            <ShowButton />
           
            
        </Datagrid>
    </List>
);
}
export default DomList;






