import express from 'express';

import levelController from '../controllers/level';
import departmentController from '../controllers/department';
import employeeController from '../controllers/employee';
const router = express.Router();


// 级别
router.get('/getLevel', levelController.find);
router.post('/createLevel', levelController.create);

// 部门
router.get('/getDepartment', departmentController.find);
router.post('/createDepartment', departmentController.create);

// 员工
router.get('/getEmployee', employeeController.find);
router.post('/createEmployee', employeeController.create);
router.delete('/deleteEmployee/:id', employeeController.checkEmployeeExist, employeeController.delete);
router.patch('/updateEmployee/:id', employeeController.checkEmployeeExist, employeeController.update )

router.get('/downloadEmployee', employeeController.download)
export default router;