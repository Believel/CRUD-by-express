import mongoose from 'mongoose';
const { Schema, model } = mongoose;
const departmentSchema = new Schema({
  __v: { type: Number, select: false},
  name: { type: String, required: true}
});
export default model('Department', departmentSchema);