//引入db配置
const db = require('../config/mysql_sequelize')
const Sequelize = db.sequelize
//引入数据表模型
const remind =  Sequelize.import('../models/remind.js')


//数据库操作类
class remindDao {




       //前端获取指定用户所有收藏记录(通过用户名筛选）
       static async getremindInFo(msg) {
        return await remind.findAll({
           where:{    
            user_name:msg.user_name   
           },
            raw: true 
        })
     
    }
       //前端新建的消息提醒状态值
    static async createremind(msg) {
        return await remind.create({     
                user_name:msg.user_name,
                status:msg.status
           
          
        })
    }
     //前端更新用户的消息提醒状态值
    static async updateRemind(msg){
        return await remind.update({       
            user_name: msg.user_name,
            status: msg.status,
           
        },{
           where:{
               user_name:msg.user_name
           }
        })
    }

   //前端用户关闭消息提醒
    static async delectremind(msg) {
        return await remind.destroy({
            where: {
                remind_id:msg.item.id,
                user_name:msg.user_name
            }
        })
    }
}
module.exports = remindDao
