import mongoose from 'mongoose';
const { Schema, model } = mongoose;
const employeeSchema = new Schema({
  __v: { type: Number, select: false },
  name: { type: String, required: true},   // 员工姓名
  hiredate: { type: Date, required: true}, // 入职时间
  departmentId: { type: Schema.Types.ObjectId, ref: 'Department', required: true},
  levelId: { type: Schema.Types.ObjectId, ref: 'Level', required: true},
})
export default model('Employee', employeeSchema);