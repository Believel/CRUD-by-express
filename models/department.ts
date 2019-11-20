import mongoose from 'mongoose';
const { Schema, model } = mongoose;
const departmentSchema = new Schema({
  name: { type: String, required: true}
});
export default model('Department', departmentSchema);