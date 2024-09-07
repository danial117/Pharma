
import { List, Datagrid, TextField, useRecordContext, useResourceContext,CreateButton,
    DatagridConfigurable,
    ExportButton,
    FilterButton,
    SelectColumnsButton,
    TopToolbar,
    SearchInput,
    ShowButton,FilterForm,TextInput } from 'react-admin';


    const postFilters = [
   
        <TextInput label="User name" source="name" defaultValue="" />,
        <TextInput label="User Email" source="email" defaultValue="" />,
        
       
  
    ];

    const ListActions = () => (
        
        <TopToolbar>
             <FilterForm filters={postFilters} />
            
                <FilterButton filters={postFilters} />
           
            
            
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