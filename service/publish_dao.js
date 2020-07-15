const sequelize = require('sequelize');
const Op = sequelize.Op;

//引入sequelize对象
var Sequelize = require('sequelize-values')();
const {user ,publish} = require('../models/index.js')


//数据库操作类
class publishDao {

    //获取所有动态信息
    static async getpublishInfo() {
        return await publish.findAll({
             order: [
                  ['date', 'DESC']  //按照id的顺序进行升序，通俗点就是从小到大
                   ],
            include:{
                model:user
            }
        })
        .then(function (publish) {
            return Sequelize.getValues(publish)
        })
    }



//所有动态信息分页
static async fenye(index,num){
    return await publish.findAll({
        order: [
            ['date', 'DESC']  //按照id的顺序进行升序，通俗点就是从小到大
          ],
     offset: (index - 1) * num, // LIMIT 10   offset 20  表示查询结果区间为[21, 30]
     limit: num,   //限制每页的数据
})
}


        //发布新的动态信息
    static async createPublish(msg) {
        return await publish.create({
                user_id: msg.user_id,
                publish: msg.publish,
                date: msg.date,
                location:msg.location,
                user_photo:msg.user_photo
        })
    }

      //删除指定的动态信息
    static async delect(msg) {
        return await publish.destroy({
            where: {
                id: msg
            }
        })
    }
      //删除指定的动态信息
    static async delectpublish(msg) {
        return await publish.destroy({
            where: {
                id: msg.id
            }
        })
    }
}
module.exports = publishDao
