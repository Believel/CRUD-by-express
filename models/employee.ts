import mongoose, {Model, Document} from 'mongoose';
const { Schema, model } = mongoose;
interface employDocument extends Document {
  name: string;
  departmentId: any
  levelId: any;
  hiredate: any ;
}
export interface otherDocument extends Document {
  name: string;
}
const employeeSchema = new Schema({
  __v: { type: Number, select: false },
  name: { type: String, required: true},   // 员工姓名
  hiredate: { type: Date, required: true}, // 入职时间
  departmentId: { type: Schema.Types.ObjectId, ref: 'Department', required: true},
  levelId: { type: Schema.Types.ObjectId, ref: 'Level', required: true},
})
export const EmployeeModel: Model<employDocument> = model('Employee', employeeSchema);