//引入db配置
const db = require('../config/mysql_sequelize')
const Sequelize = db.sequelize
const Op = db.Op
//引入数据表模型
const star =  Sequelize.import('../models/star.js')
const user =  Sequelize.import('../models/user.js')

//数据库操作类
class starDao {

//前端获取指定用户收藏记录(通过用户名)
static async getstarinfo(msg) {
    return await star.findOne({
        where:{    
            user_name:msg.user_name    
           },
        raw: true 
    })
 
}



    //前端获取指定用户收藏记录(通过教程号筛选)
    static async getstarInfo(msg) {
        return await star.findOne({
           where:{    
            star_id:msg.item.id    
           },
            raw: true 
        })
     
    }


       //前端获取指定用户所有收藏记录(通过用户名筛选）
       static async getstarInFo(msg) {
        return await star.findAll({
           where:{    
            user_name:msg.user_name   
           },
            raw: true 
        })
     
    }
     //前端用户新收藏的教程
    static async createstar(msg) {
        return await star.create({
            where:{
                star_id:{[Op.eq]:msg.item.id} 
            },  

                star_id: msg.item.id,
                user_name:msg.user_name,
                picture:msg.item.picture,
                money:msg.item.money,
                author:msg.item.user_name,
                status:msg.status
        })
    }



    //前端用户取消收藏教程
    static async delectstar(msg) {
        return await star.destroy({
            where: {
                star_id:msg.item.id,
                user_name:msg.user_name
            }
        })
    }

    //前端用户取消收藏教程
    static async delect(msg) {
        return await star.destroy({
            where: {
                star_id:msg.item,
                user_name:msg.user_name
            }
        })
    }
   
}
module.exports = starDao
