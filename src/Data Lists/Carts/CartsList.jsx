
import { List, Datagrid, TextField, useRecordContext, useResourceContext,CreateButton,
    DatagridConfigurable,
    ExportButton,
    FilterButton,
    SelectColumnsButton,
    TopToolbar,
    SearchInput, } from 'react-admin';

    const ListActions = () => (
        <TopToolbar>
           
            <ExportButton/>
        </TopToolbar>
    );

const CartsList = () =>{ 
  
    
    return(
    <List actions={<ListActions/>}>
        <Datagrid >
            <TextField  source="id" />
            <TextField source="user.name" />
            <TextField source="user.email" />
            <TextField label='items' source="items.length" />
            
        </Datagrid>
    </List>
);
}
export default CartsList;