import mongoose from 'mongoose'

// Define the schema for order items
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  orderNumber: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  items: [{
    product: { type: Schema.Types.ObjectId,ref:'Product', required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
  }],
  tax:{ type: Number, required: true },
  paymentMethod: { type: String, default: 'Unknown' },
  paymentStatus: { type: String, default: 'Pending' },
  orderStatus: { type: String, default: 'Pending' },
  totalAmount: { type: Number, required: true },
  itemsAmount: { type: Number, required: true },
  transactionDetails:{type:Object}

}, {
  timestamps: true,
});

const Order = mongoose.model('Order', orderSchema);

export default Order








