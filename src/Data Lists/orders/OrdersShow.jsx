import { Show, SimpleShowLayout, TextField, DateField, RichTextField } from 'react-admin';

export const OrderShow = (props) => (
    <Show {...props}>
 <SimpleShowLayout>
            <TextField label='ID:' source="id" />
            <TextField label='Payment Method:' source="paymentMethod" />
            <TextField label='Order Status:' source="orderStatus" />
            <TextField label='Tax:' source="tax" />
            <TextField label='Total Amount:' source="totalAmount" />
            <TextField label='Payer Account ID:' source="transactionDetails.payment_source.paypal.account_id" />
<TextField label='Payer Name:' source="transactionDetails.purchase_units[0].shipping.name.full_name" />
<TextField label='Payer Email:' source="transactionDetails.payer.email_address" />
<TextField label='Paypal Payment Status:' source="transactionDetails.status" />
<TextField label='Transaction ID:' source="transactionDetails.id" />
<TextField label='Currency Code:' source="transactionDetails.purchase_units[0].payments.captures[0].amount.currency_code" />
<TextField label='Paypal Gross Amount:' source="transactionDetails.purchase_units[0].payments.captures[0].seller_receivable_breakdown.gross_amount.value" />
<TextField label='Paypal Fee:' source="transactionDetails.purchase_units[0].payments.captures[0].seller_receivable_breakdown.paypal_fee.value" />
<TextField label='Paypal Net Amount:' source="transactionDetails.purchase_units[0].payments.captures[0].seller_receivable_breakdown.net_amount.value" />        
        </SimpleShowLayout>
    </Show>
);