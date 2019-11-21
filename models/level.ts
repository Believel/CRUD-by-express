// 级别表结构 —— 模式
import mongoose from 'mongoose';
const { Schema, model} = mongoose
const levelSchema = new Schema({
  __v: { type: Number, select: false},
  name: { type: String, required: true}
})
export default model('Level', levelSchema);