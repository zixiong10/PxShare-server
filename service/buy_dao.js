//引入db配置
const db = require('../config/mysql_sequelize')
const Sequelize = db.sequelize
const Op = db.Op
//引入数据表模型
const buy =  Sequelize.import('../models/buy.js')
const user =  Sequelize.import('../models/user.js')

//数据库操作类
class buyDao {


 //获取所有交易信息
 static async getbuyinfo(msg) {
    return await user.findOne({
     //查询下单购买的用户余额是否大于或等于目标教程价格，从而获得用户的支付能力，没有则购买失败
        where:{
            user_id:msg.user.user_id,
            cash:{[Op.gte]: msg.item.money}   //余额大于或等于教程价格
        },
       
    })
  
}
//所有动态信息分页
static async fenye(index,num){
    return await buy.findAll({
        order: [
            ['buy_time', 'DESC']  //按照id的顺序进行升序，通俗点就是从小到大
          ],
     offset: (index - 1) * num, // LIMIT 10   offset 20  表示查询结果区间为[21, 30]
     limit: num,   //限制每页的数据
})
}



 //查询交易是否重复
 static async getbuy(msg) {
    return await buy.findOne({
        where:{
            user_name:msg.user.user_name,//下载或购买教程的用户是否出现在交易信息上
            buy_id:msg.item.id           //and下载或购买的教程号是否同样出现
        },
       
    })
  
}

//后端获取所有交易信息
static async getbuyInFo(msg) {
    return await buy.findAll({
     
        raw: true 
    })
 
}



    //前端获取指定用户交易信息
    static async getbuyInfo(msg) {
        return await buy.findAll({
           where:{
             user_name:msg.user_name
           },
            raw: true 
        })
     
    }
   //前端创建用户交易信息
    static async createBuy(msg,id) {
        return await buy.create({
                 buy_id: msg.buy_id,
                picture: msg.picture,
                buy_time:msg.buy_time,
                money:msg.money,
                user_name:msg.user_name,
                author:msg.author,
                introduce:msg.introduce
        })
    }


    //前端删除指定用户交易信息
    static async delect(msg) {
        return await buy.destroy({
            where: {
                id:msg.id
            }
        })
    }


    //前端删除指定用户交易信息
    static async delectbuy(msg) {
        return await buy.destroy({
            where: {
                id:msg.id
            }
        })
    }


}


module.exports = buyDao
