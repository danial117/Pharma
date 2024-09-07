import mongoose from 'mongoose'

// Define the schema for order items

const Schema = mongoose.Schema;
const SchemaTypes = mongoose.Schema.Types;





function getCosts(value) {
  if (value && typeof value.toString === 'function') {
    // Convert Decimal128 to string and return it
    console.log(value.toString())
    return value.toString();
  }
  return value; // Return value as-is if it's undefined or null
}



// Define the toFixedTwo function to return Decimal128-compatible values
const toFixedTwo = (num) => {
  // Return Decimal128 with two decimal places
  return mongoose.Types.Decimal128.fromString((Math.round(num * 100) / 100).toFixed(2));
};



const itemSchema = new Schema({
  product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true },
  price: {
    type: SchemaTypes.Decimal128,
    required: true,
    set: toFixedTwo, // Setter to ensure two decimal places
    get: getCosts
  },
  option: { type: Number, required: true }
}, { _id: false });




const orderSchema = new Schema({
  orderNumber: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  items: [itemSchema],
  tax: {
    type: SchemaTypes.Decimal128,
    required: true,
    set: toFixedTwo, // Ensure two decimal places for tax
    get:getCosts
  },
  paymentMethod: { type: String, default: 'Unknown' },
  paymentStatus: { type: String, default: 'Pending' },
  orderStatus: { type: String, default: 'Pending' },
  totalAmount: {
    type: SchemaTypes.Decimal128,
    required: true,
    set: toFixedTwo, // Ensure two decimal places for totalAmount
    get:getCosts
  },
  itemsAmount: {
    type: SchemaTypes.Decimal128,
    required: true,
    set: toFixedTwo, // Ensure two decimal places for itemsAmount
    get:getCosts
  },
  transactionDetails: { type: Object }
}, {
  timestamps: true,
  toJSON: {getters: true},
  toObject: {getters: true},
});

const Order = mongoose.models['Order'] || mongoose.model('Orders', orderSchema)

export default Order








