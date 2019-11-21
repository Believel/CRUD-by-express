import Employee from '../models/employee';
interface Params {
  name?: string;
  departmentId?: string
}
class EmployeeController {
  // 查询所有部门(含分页)
  async find(req: any, res: any) {
    console.log(req.query)
    let { pageSize = 10, pageIndex = 1, departmentId, name} = req.query;
    let employeeList;
    pageIndex = Math.max(pageIndex * 1, 1); // 请求页数
    pageSize = Math.max(pageSize * 1, 1); // 每页数量
    // limit 查询结果的最大条数
    // skip 指定跳过的文档条数
    if(!departmentId && !name) {
      employeeList = await Employee.find()
        .limit(pageSize)
        .skip((pageIndex - 1) * pageSize);
    } else {
      let params: Params = {};
      if (name) {
        params.name = name;
      }
      if (departmentId) {
        params.departmentId = departmentId
      }
      employeeList = await Employee.find(params)
        .limit(pageSize)
        .skip((pageIndex - 1) * pageSize);
    }
    
    const total = await Employee.count({name, departmentId});
    res.json({
      flag: 0,
      data: {
        list: employeeList,
        pageSize,
        pageIndex,
        total
      }
    })
  }
  // 创建员工
  async create(req: any, res: any) {
    let employee = await new Employee({
      ...req.body
    }).save();
    res.json({
      flag: 0,
      data: employee,
      msg: '创建成功'
    })
  }
  // 删除员工
  async delete(req: any, res: any) {
    const employee = await Employee.findByIdAndDelete(req.params.id);
    if (!employee) {
      res.json({
        flag: 1,
        msg: '此员工不存在'
      })
    }
    res.json({
      flag: 0,
      msg: '删除成功'
    })
  }
  // 检查员工是否存在
  async checkEmployeeExist(req: any, res: any, next: any) {
    const employee = await Employee.findById(req.params.id).select('+name');
    if (!employee) {
      res.json({
        flag: 0,
        msg: '员工不存在'
      })
    }
    res.locals.employee = employee;
    await next();
  }
  // 更新员工
  async update(req: any, res: any) {
    await res.locals.employee.update(req.body);
    res.json({
      flag: 0,
      msg: '更新成功'
    })
  }
}
export default new EmployeeController();