import mongoose from "mongoose";

const Schema = mongoose.Schema;
const SchemaTypes = mongoose.Schema.Types;

// Helper function to convert Decimal128 to string
function getCosts(value) {
  if (value && typeof value.toString === 'function') {
    // Convert Decimal128 to string and return it
    console.log(value.toString());
    return value.toString();
  }
  return value; // Return value as-is if it's undefined or null
}

// Define the toFixedTwo function to return Decimal128-compatible values
const toFixedTwo = (num) => {
  // Return Decimal128 with two decimal places
  return mongoose.Types.Decimal128.fromString((Math.round(num * 100) / 100).toFixed(2));
};

// Define the schema for state tax rates with Decimal128 handling
const stateTaxRateSchema = new Schema({
  state: { type: String, required: true, unique: true },
  state_rate: {
    type: SchemaTypes.Decimal128,
    required: true,
    set: toFixedTwo, // Ensure two decimal places for state_rate
    get: getCosts
  },
  total_rate: {
    type: SchemaTypes.Decimal128,
    required: true,
    set: toFixedTwo, // Ensure two decimal places for total_rate
    get: getCosts
  }
}, {
  toJSON: { getters: true },
  toObject: { getters: true }
});

// Model definition
const StateTax = mongoose.models['State_Tax_Rates'] || mongoose.model('State_Tax_Rates', stateTaxRateSchema);

export default StateTax;