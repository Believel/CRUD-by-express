// 引入级别模式
import Level from '../models/level';
class LevelController {
  // 创建级别
  async create(req:any, res:any) {
    console.log(req.body);
    let level = await new Level({ ...req.body}).save();
    res.json({
      flag: 0,
      data: level
    })

  }
  // 查询级别
  async find(req:any, res:any) {
    const levelList = await Level.find();
    res.json({
      flag: 0,
      data: levelList
    })
  }
}

export default  new LevelController();