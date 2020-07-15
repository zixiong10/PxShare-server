//引入db配置
const db = require('../config/mysql_sequelize')
const Sequelize = db.sequelize
const Op = db.Op
//引入数据表模型
const uploadmaterial =  Sequelize.import('../models/uploadmaterial.js')

//数据库操作类
class uploadmaterialDao {

  //前端获取指定用户所有下载的素材信息(通过用户名筛选）
  static async getuploadmaterialinfo(msg) {
    return await uploadmaterial.findAll({
       where:{    
        user_name:msg.user_name
       },
        raw: true 
    })
 
}



       //前端获取指定用户所有下载的素材信息(通过用户名筛选）
       static async getuploadmaterialInFo(msg) {
        return await uploadmaterial.findOne({
           where:{    
            material_id:msg
           },
            raw: true 
        })
     
    }
      //前端用户新下载的素材信息
    static async createuploadmaterial(msg,upload,c) {
        return await uploadmaterial.create({     
                user_name:msg.user_name,
                picture:upload.picture,
                kind:upload.kind,
                material_id:c
           
          
        })
    }
     //前端用户更新下载的素材信息
    static async updateuploadmaterial(msg,c){
        return await uploadmaterial.update({       
            user_name: msg.user_name,
            material_id:c
           
        },{
           where:{
               user_name:msg.user_name
           }
        })
    }

    //前端用户删除指定的下载素材
    static async delect(msg) {
        return await uploadmaterial.destroy({
            where: {
                material_id:msg.id,
            }
        })
    }
   
}
module.exports = uploadmaterialDao
