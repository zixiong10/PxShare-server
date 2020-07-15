//引入db配置
const db = require('../config/mysql_sequelize')
const Sequelize = db.sequelize
const Op = db.Op
//引入数据表模型

const { user, data } = require('../models/index.js')

//数据库操作类
class dataDao {


 //前端获取指定教程信息(通过指定的教程号)
 static async getMaterial(msg) {
    return await data.findOne({
       where:{
          id:msg.id
       },
        
    })
}


  //获取下载的素材信息(uploadmaterial要)
  static async getuploadmaterial(msg) {
    return await data.findOne({
        where: {   
            status:{[Op.eq]: 2} ,
            id:msg
         },
         raw: true ,
    })
}



    //获取素材信息
    static async getDataInfo() {
        return await data.findAll({
            raw: true ,
            order: [
                ['check_time', 'DESC']  //按照id的顺序进行升序，通俗点就是从小到大
              ],
            include:{
                model:user
            }
        })
    }



    static async getDataInfo1() {
        return await data.findAll({
            raw: true ,
            order: [
                ['check_time', 'DESC']  //按照id的顺序进行升序，通俗点就是从小到大
              ],
       where: {   
         status:{[Op.eq]: 2} 
      },
      include:{
         model:user
     }
        })
    }



    static async getDataInfo2() {
        return await data.findAll({
            raw: true ,
            order: [
                ['check_time', 'DESC']  //按照id的顺序进行升序，通俗点就是从小到大
              ],
            where:{
               status:{[Op.eq]: null} 
            },
            include:{
                model:user
            }
        })
    }
 
//上传素材    
static async createData(msg) {
    return await data.findOrCreate({
        where: {
            id: msg.id
        },
        defaults: {
            id: msg.id,
            picture: msg.userPhoto,
            kind:msg.kind,
            user_name:msg.user_name,
            check_time:msg.check_time,
            status:msg.status,
            check_people:msg.check_people
        },
        raw: true
    })
}


//前端上传素材   
static async createdata(msg) {
    return await data.findOrCreate({
        where: {
            id: msg.id
        },
        defaults: {
            id: msg.id,
            picture: msg.user_photo,
            kind:msg.kind,
            user_name:msg.user_name,
            check_time:msg.check_time,
            status:msg.status,
            check_people:msg.check_people
        },
        raw: true
    })
}


//获取筛选的素材信息
static async getAlldatalist1(msg) {
    return await data.findAll({
     raw: true ,//返回原始数据       
      order: [
               ['check_time', 'DESC']  //按照id的顺序进行升序，通俗点就是从小到大
             ],
      where: { 
        [Op.and]: 
        [{status:{[Op.eq]: null}}, 
        {[Op.or]: //满足如何一个条件，都会被搜索出来，or或者
        [
          {id: {[Op.like]:'%'+msg+'%'}},  //[Op.like]: '%chhild',  包含 '%child'
          {kind: {[Op.like]:'%'+msg+'%'}},   
          {user_name: {[Op.like]:'%'+msg+'%'}},
        ]}
    ]
     },
     include:{
        model:user
    }
  })      
}

//获取筛选的素材信息
static async getAlldatalist(msg) {
    return await data.findAll({
     raw: true ,//返回原始数据       
     order: [
        ['check_time', 'DESC']  //按照id的顺序进行升序，通俗点就是从小到大
      ],
        where: { 
        [Op.and]: 
        [{status:{[Op.eq]: 2}}, 
        {[Op.or]: //满足如何一个条件，都会被搜索出来，or或者
        [
            {id: {[Op.like]:'%'+msg+'%'}},  //[Op.like]: '%chhild',  包含 '%child'
            {kind: {[Op.like]:'%'+msg+'%'}},   
            {user_name: {[Op.like]:'%'+msg+'%'}},
            ]}
        ]
        },
     include:{
        model:user
    }
  })      
}


//所有素材信息分页
static async fenye(index,num){
    return await data.findAll({
        where: {   
            status:{[Op.eq]: null} 
         },
     offset: (index - 1) * num, // LIMIT 10   offset 20  表示查询结果区间为[21, 30]
     limit: num,   //限制每页的数据
})
}



//所有素材信息分页
static async fenye1(index,num){
    return await data.findAll({
        order: [
            ['check_time', 'DESC']  //按照id的顺序进行升序，通俗点就是从小到大
          ],
         where: {   
         status:{[Op.eq]: 2} 
      },
     offset: (index - 1) * num, // LIMIT 10   offset 20  表示查询结果区间为[21, 30]
     limit: num,   //限制每页的数据
})
}




//筛选的素材信息分页
static async searchfenye(msg,index, num) {
    return await data.findAll({
        order: [
            ['check_time', 'DESC']  //按照id的顺序进行升序，通俗点就是从小到大
          ],
        raw: true ,//返回原始数据       
           where: { 
            [Op.and]: 
            [{status:{[Op.eq]: null}}, 
            {[Op.or]: //满足如何一个条件，都会被搜索出来，or或者
            [
              {id: {[Op.like]:'%'+msg+'%'}},  //[Op.like]: '%chhild',  包含 '%child'
              {kind: {[Op.like]:'%'+msg+'%'}},   
              {user_name: {[Op.like]:'%'+msg+'%'}},
            ]}
        ]
         },
                offset: (index - 1) * num,  //
                limit: num,  //限制每页几条数据
      })
}



//筛选的素材信息分页
static async searchfenye1(msg,index, num) {
    return await data.findAll({
        raw: true ,//返回原始数据       
        order: [
                ['check_time', 'DESC']  //按照id的顺序进行升序，通俗点就是从小到大
               ],
               where: { 
                [Op.and]: 
                [{status:{[Op.eq]: 2}}, 
                {[Op.or]: //满足如何一个条件，都会被搜索出来，or或者
                [
                  {id: {[Op.like]:'%'+msg+'%'}},  //[Op.like]: '%chhild',  包含 '%child'
                  {kind: {[Op.like]:'%'+msg+'%'}},   
                  {user_name: {[Op.like]:'%'+msg+'%'}},
                ]}
            ]
             },
                offset: (index - 1) * num,  //
                limit: num,  //限制每页几条数据
      })
}



//获得某个素材的信息   
static async getOneDataInfo(b) {
    return await data.findOne({
        where: {
            id:b
        },
        include:{
            model:user
        }
    })
}

  //前端获取指定教程信息(通过指定的教程号)
  static async getmaterial(msg) {
    return await data.findAll({
       where:{
          user_name:msg.user_name
       },
        
    })
}

//更新素材信息    
static async updateData(msg, id){
    return await data.update({
        id:msg.id,
        picture: msg.picture,
        kind: msg.kind,
        user_name:msg.user_name ,
        check_time:msg.check_time,
        check_people:msg.check_people,
        status:msg.status
    },{
       where:{
           id:id
       },
       include:{
        model:user
    }
    })
}

//删除素材信息
static async delectData(msg) {
    return await data.destroy({
        where: {
            id: msg
        }
    })
}

}

module.exports = dataDao
