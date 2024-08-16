
import { List, Datagrid, TextField } from 'react-admin';

const AddressList = (props) =>{ 
    
    console.log({props})
    return(
    <List {...props}>
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <TextField source="firstName" />
            <TextField source="lastName" />
            <TextField source="email" />
            <TextField source="streetAddress" />
            <TextField source="state" />
            <TextField source="city" />
           
            
        </Datagrid>
    </List>
);
}
export default AddressList;