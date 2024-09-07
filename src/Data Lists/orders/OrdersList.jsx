
import { List, Datagrid, TextField, 
    ExportButton,
    FilterButton,
   
ShowButton,
TextInput,
FilterForm,
EditButton



}
 from 'react-admin';
import { Stack } from '@mui/material';


 const postFilters = [
   
    <TextInput label="Payment Method" source="paymentMethod" defaultValue="" />,
    <TextInput label="Order Status" source="orderStatus" defaultValue="" />,
    <TextInput label="Total Amount" source="totalAmount" defaultValue="" />
    
   











];

const ListToolbar = () => (
    <Stack direction="column"  >
        <FilterForm filters={postFilters} />
        <div >
            <FilterButton filters={postFilters} />
            <ExportButton/>
          
          
        </div>
    </Stack>
)





   

const OrdersList = () =>{ 
  
    
    return(
    <List actions={<ListToolbar/>}>
       
        <Datagrid >
            <TextField  source="id" />
            <TextField source="orderNumber" />
            <TextField source="paymentMethod" />
            <TextField source="paymentStatus" />
            <TextField source="orderStatus" />
            <TextField source="totalAmount" />
            <ShowButton />
            <EditButton />
           
            
        </Datagrid>
    </List>
);
}
export default OrdersList;