import { Edit, SimpleForm, SelectInput, useRecordContext, TextInput } from 'react-admin';

const OrderStatusField = () => {
    const record = useRecordContext();

    if (!record) return null;

    const currentOrderStatus = record.orderStatus;
     console.log(record)
    return (
        currentOrderStatus === 'Processing' ? (
            <SelectInput 
                source={'orderStatus'} 
                placeholder={record.orderStatus}
                choices={[
                    { id: 'Shipping', name: 'Shipping' },
                    { id: 'Delivered', name: 'Delivered' },
                    { id: 'Completed', name: 'Completed' }
                ]}
            />
        ) : (
            <TextInput source="orderStatus" disabled />
        )
    )};






const OrderEdit = () => {
   

    return (
        <Edit>
            <SimpleForm>
               <OrderStatusField />
            </SimpleForm>
        </Edit>
    );
};

export default OrderEdit;