import mongoose from "mongoose";

const stateTaxRateSchema = new mongoose.Schema({
  state: { type: String, required: true, unique: true },
  state_rate: { type: Number, required: true },
  total_rate: { type: Number, required: true }
});

const StateTax = mongoose.model('State_Tax_Rates', stateTaxRateSchema);
export default StateTax