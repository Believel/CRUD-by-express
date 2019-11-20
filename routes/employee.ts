import express from 'express';
import bodyParser from 'body-parser';

import levelController from '../controllers/level';
import departmentController from '../controllers/department';
const router = express.Router();
const urlencodedParser = bodyParser.urlencoded({
  extended: false
});

// 级别
router.get('/getLevel', levelController.find);
router.post('/createLevel', urlencodedParser, levelController.create)
// 部门
router.get('/getDepartment', departmentController.find);
router.post('/createDepartment', departmentController.create)
export default router;