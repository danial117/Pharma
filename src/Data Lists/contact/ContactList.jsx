
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

   

const ContactList = (props) =>{ 
  
    
    return(
    <List actions={<ListActions/>}>
        <Datagrid rowClick="edit">
            <TextField  source="id" />
           
            <TextField source="name" />
            <TextField source="email" />
            <TextField source="message" />
            <ShowButton />
            
           
            
           
            
        </Datagrid>
    </List>
);
}
export default ContactList;