import Department from '../models/department';
class DepartmentController {
  // 创建部门
  async create(req: any, res: any) {
    let department = await new Department().save();
    res.json({
      flag: 0,
      data: department
    })
  }
  // 查询部门
  async find(req: any, res: any) {
    const departmentList = await Department.find();
    res.json({
      flag: 0,
      data: departmentList
    })
  }
}
export default new DepartmentController();