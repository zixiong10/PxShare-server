const db = require('../config/mysql_sequelize')
const Op = db.Op
const Sequelize = db.sequelize
const { user, publish } = require('../models/index.js')
//自动创建表
user.sync({ force: false }); 

class userDao {


 //前端注册查看某个用户的存不存在   
 static async getuserInfo(msg) {
    return await user.findOne({
        where: {
                 [Op.and]:
                [
                    {user_id:msg.user_id }, 
                    {user_name:msg.user_name}  
                ]
              },   
        
    })
}

 //前端订单交易查询某个教程的作者昵称 
 static async getUserbuying(b) {
    return await user.findOne({
        where: {
            user_name:b
        },
    })
}


 //获得某个用户的信息   
    static async getUserInfo(b) {
        return await user.findOne({
            where: {
                user_id:b
            },
        })
    }

//获取所有用户信息
static async getAllUser() {
    return await user.findAll({
        raw: true    //返回原始数据
    })
}

//获取筛选的用户信息
    static async getAlluserlist(msg) {
        return await user.findAll({
         raw: true ,//返回原始数据       
          order: [
                   ['id', 'ASC']  //按照id的顺序进行升序，通俗点就是从小到大
                 ],
          where: { [Op.or]: //满足如何一个条件，都会被搜索出来，or或者
            [
              {user_name: {[Op.like]:'%'+msg+'%'}},  //[Op.like]: '%chhild',  包含 '%child'
              {user_id: {[Op.like]:'%'+msg+'%'}},   
              {role: {[Op.like]:'%'+msg+'%'}},
            ]
         }
      })      
}

//所有用户信息分页
      static async fenye(index,num){
          return await user.findAll({
           offset: (index - 1) * num, // LIMIT 10   offset 20  表示查询结果区间为[21, 30]
           limit: num,   //限制每页的数据
    })
}

//筛选的用户信息分页
  static async searchfenye(msg,index, num) {
      return await user.findAll({
          raw: true ,//返回原始数据       
          order: [
                  ['id', 'ASC']  //按照id的顺序进行升序，通俗点就是从小到大
                 ],
           where:{ [Op.or]:
                [
                  {user_name: {[Op.like]:'%'+msg+'%'}}, //满足如何一个条件，都会被搜索出来，or或者
                  {user_id: {[Op.like]:'%'+msg+'%'}},
                  {role: {[Op.like]:'%'+msg+'%'}},     //[Op.like]: '%chhild',  包含 '%child'
                ]
              },  
                  offset: (index - 1) * num,  //
                  limit: num,  //限制每页几条数据
        })
}

    
//新建用户信息    
    static async createUser(msg) {
        return await user.findOrCreate({
            where: {
                user_id: msg.user_id
            },
            defaults: {
                user_id: msg.user_id,
                password: msg.password,
                user_name: msg.user_name,
                role: msg.role , 
                solt: msg.solt ,
                user_photo:msg.userPhoto,
            },
            raw: true
        })
    }



// 前端注册用户信息 
    
    static async createuser(msg){
        return await user.findOrCreate({
            where: {
                user_id: msg.user_id
            },
            defaults:{
                user_id: msg.user_id,
                password: msg.password,
                user_name: msg.user_name,
                role: msg.role , 
                solt: msg.solt ,
                user_photo:msg.user_photo,
            },
            raw: true
          })
    }

//更新用户信息    
static async updateUser(msg, id){
        return await user.update({
            user_id:msg.user_id,
            password: msg.password,
            user_name: msg.user_name,
            role: msg.role,
            solt:msg.solt,
            user_photo: msg.userPhoto,
           
        },{
           where:{
               user_id:id
           }
        })
    }
   


//更新前端的用户资料
    static async UpdateUser(msg,id){
        return await user.update({
            user_id:msg.user_id,
            user_name: msg.user_name,
            role: msg.role,
            user_photo:msg.user_photo,
            cash:msg.cash,
            gold:msg.gold,
            benefit:msg.benefit,
            qianming:msg.qianming
        },{
           where:{
               user_id:id
           }
        })
    }
   

//删除用户信息
    static async delectUser(msg) {
        return await user.destroy({
            where: {
                user_id: msg
            }
        })
    }


//添加盐值
    static async addSolt(user_id, password, solt) {
        return user.update({
            solt, password
        },{
            where: {
                user_id
            }
        })
    }
    
}

module.exports = userDao
