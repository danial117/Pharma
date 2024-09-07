
import { List, Datagrid, TextField, useRecordContext, useResourceContext,CreateButton,
    DatagridConfigurable,
    ExportButton,
    FilterButton,
    SelectColumnsButton,
    TopToolbar,
    SearchInput,
    ShowButton,FilterForm,TextInput } from 'react-admin';
  
     import { Stack } from '@mui/material';
  




    const postFilters = [
   
        <TextInput label="User Name" source="name" defaultValue="" />,
        <TextInput label="Authentication Method" source="authenticationMethod" defaultValue="" />,
        <TextInput label="User Email" source="email" defaultValue="" />,
       
  
    ];


    
    
    const ListToolbar = () => {
 
     
    
    
       return( <Stack direction="column"  >
            <FilterForm filters={postFilters} />
            <div >
                <FilterButton filters={postFilters} />
                <ExportButton/>
               
              
               
              
              
            </div>
        </Stack>
    )
}

  

const UsersList = (props) =>{ 
  
    
    return(
    <List actions={<ListToolbar/>}>
        <Datagrid rowClick='show'>
            <TextField  source="name" />
            <TextField source="email" />
            <TextField source="authenticationMethod" />
          
            <ShowButton />

            
           
            
        </Datagrid>
    </List>
);
}
export default UsersList;