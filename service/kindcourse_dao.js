//引入db配置
const db = require('../config/mysql_sequelize')
const Sequelize = db.sequelize
//引入数据表模型
const kindcourse =  Sequelize.import('../models/kindcourse.js')


//数据库操作类
class kindcourseDao {

       //前端获取所有教程小分类
       static async getkindcourseinFo() {
        return await kindcourse.findAll({
        })
     
    }

      //前端获取指定教程大分类
      static async getkindcourseInFo(msg) {
        return await kindcourse.findOne({
            where:{
                 kind:msg.id
            }
        })
     
    }
   
}
module.exports = kindcourseDao
