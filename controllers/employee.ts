import {EmployeeModel} from '../models/employee';
import LevelModel from '../models/level';
import DepartmentModel from '../models/department';
import excelExport from 'excel-export';
let conf: excelExport.Config = {
  cols: [
    { caption: '员工ID', type: 'string'},
    { caption: '姓名', type: 'string'},
    { caption: '部门', type: 'string'},
    { caption: '入职时间', type: 'string'},
    { caption: '职级', type: 'string'}
  ],
  rows: []
}
interface Params {
  name?: string;
  departmentId?: string
}
class EmployeeController {
  // 查询所有部门(含分页)
  async find(req: any, res: any) {
    console.log(req.query)
    let { pageSize = 20, pageIndex = 1, departmentId, name} = req.query;
    let employeeList, result: any[] = [];
    pageIndex = Math.max(pageIndex * 1, 1); // 请求页数
    pageSize = Math.max(pageSize * 1, 1); // 每页数量
    // limit 查询结果的最大条数
    // skip 指定跳过的文档条数
    if(!departmentId && !name) {
      employeeList = await EmployeeModel.find()
        .populate('departmentId levelId')
        .limit(pageSize)
        .skip((pageIndex - 1) * pageSize)
    } else {
      let params: Params = {};
      if (name) {
        params.name = name;
      }
      if (departmentId) {
        params.departmentId = departmentId
      }
      employeeList = await EmployeeModel.find(params)
        .populate('departmentId levelId')
        .limit(pageSize)
        .skip((pageIndex - 1) * pageSize);
    }
    employeeList.forEach(function(item) {
      let { _id, name, hiredate} = item;
      result.push({
        _id,
        name,
        hiredate,
        departmentId: item.departmentId._id,
        departmentName: item.departmentId.name,
        levelId: item.levelId._id,
        levelName: item.levelId.name
        
      })
    })
    // const total = await EmployeeModel.count({});
    const total = await EmployeeModel.countDocuments({})
    res.json({
      flag: 0,
      data: {
        list: result,
        pageSize,
        pageIndex,
        total
      }
    })
  }
  // 创建员工
  async create(req: any, res: any) {
    let employee = await new EmployeeModel({
      ...req.body
    }).save();
    let { departmentId, levelId} = req.body;
    let department: any = await DepartmentModel.findById(departmentId);
    let Level: any = await LevelModel.findById(levelId);
    let {_id, name, hiredate} = employee
    res.end;
    res.json({
      flag: 0,
      data: {
        _id,
        name,
        hiredate,
        departmentId,
        departmentName: department.name,
        levelName: Level.name,
        levelId
      },
      msg: '创建成功'
    })
  }
  // 删除员工
  async delete(req: any, res: any) {
    const employee = await EmployeeModel.findByIdAndDelete(req.params.id);
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
    const employee = await EmployeeModel.findById(req.params.id).select('+name');
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
  // 下载表格
  async download(req: any, res: any) {
    let employeeList = await EmployeeModel.find().populate('departmentId levelId');
    conf.rows = employeeList.map((v) => {
      return [v._id, v.name, v.departmentId.name,v.hiredate, v.levelId.name]
    });
    let excel = excelExport.execute(conf);
    res.setHeader('Content-Type', 'application/vnd.openxmlformats')
    res.setHeader("Content-Disposition", "attachment; filename=" + "Employee.xlsx");
  	res.end(excel, 'binary');
  }
}
export default new EmployeeController();