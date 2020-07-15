//引入db配置
const db = require('../config/mysql_sequelize')
const Sequelize = db.sequelize
//引入数据表模型
const record =  Sequelize.import('../models/record.js')

//数据库操作类
class recordDao {

       //前端获取指定用户所有收藏记录(通过用户名筛选）
       static async getrecordInFo(msg) {
        return await record.findAll({
           where:{    
            user_name:msg.user_name   
           },
            raw: true 
        })
     
    }
        //前端创建新的消息记录
    static async createrecord(msg) {
        return await record.create({
            
                user_name:msg.user_name,
                text:msg.text,
                record_date:msg.record_date,
                status:msg.status
           
          
        })
    }



       //前端删除指定的消息记录
    static async delectrecord(msg) {
        return await record.destroy({
            where: {
                id:msg.id,
            }
        })
    }

      //前端删除所有的消息记录
    static async alldelect(msg) {
        return await record.destroy({
            where: {
                id:msg
            }
        })
    }

 
}
module.exports = recordDao
