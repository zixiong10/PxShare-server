//引入db配置
const db = require('../config/mysql_sequelize')
const Sequelize = db.sequelize
const Op = db.Op
//引入数据表模型
const course = Sequelize.import('../models/course.js')


//数据库操作类
class courseDao {


   //获取所有教程信息
    static async getCourseInfo() {
        return await course.findAll({
            order: [
                ['check_time', 'DESC']  //按照id的顺序进行升序，通俗点就是从小到大
              ],
            raw: true 
        })
    }


 //前端搜索获取指定教程信息(通过指定的教程号)
 static async searchCourse(msg) {
    return await course.findOne({
       where:{
            id:msg.id
       }
    })
}

    //前端获取指定教程信息(通过指定的教程号)
    static async getCourse(msg) {
        return await course.findOne({
           where:{
              id:msg.id
           },
            
        })
    }

     //前端获取指定教程信息(通过指定的教程名)
     static async GetCourse(msg) {
        return await course.findAll({
           where:{
              user_name:msg.user_name
           },
            
        })
    }

    static async getCourseInfo1() {
        return await course.findAll({
            order: [
                ['check_time', 'DESC']  //按照id的顺序进行升序，通俗点就是从小到大
              ],
            raw: true ,
       where: {   
         status:{[Op.eq]: 2}  //等于
      },
    
        })
    }


    static async getCourseInfo2() {
        return await course.findAll({
            order: [
                ['check_time', 'DESC']  //按照id的顺序进行升序，通俗点就是从小到大
              ],
            raw: true ,
       where: {   
         status:{[Op.eq]: null}     //不等于
      },
    
        })
    }

//新建教程信息    
static async createCourse(msg) {
    return await course.findOrCreate({
        
        where: {
            id: msg.id
        },
        defaults: {
            id: msg.id,
            picture: msg.userPhoto,
            kind:msg.kind,
            user_name:msg.user_name,
            type:msg.type,
            check_time:msg.check_time,
           
        },
        raw: true
    })
}




//前端上传教程   
static async createcourse(msg) {
    return await course.findOrCreate({
        
        where: {
            id: msg.id
        },
        defaults: {
            id: msg.id,
            picture: msg.user_photo,
            kind:msg.kind,
            user_name:msg.user_name,
            type:msg.type,
            check_time:msg.check_time,
            money:msg.money,
            introduce:msg.introduce,
            text:msg.text
        },
        raw: true
    })
}


//获取筛选的教程信息
static async getAllCourselist(msg) {
    return await course.findAll({
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
  }
  })      
}

//获取筛选的教程信息
static async getAllCourselist1(msg) {
    return await course.findAll({
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
     }
  })      
}


//所有教程信息分页
static async fenye(index,num){
    return await course.findAll({
        order: [
            ['check_time', 'DESC']  //按照id的顺序进行升序，通俗点就是从小到大
          ],
        where: {   
            status:{[Op.eq]: null} 
         },
     offset: (index - 1) * num, // LIMIT 10   offset 20  表示查询结果区间为[21, 30]
     limit: num,   //限制每页的数据
})
}



//所有教程信息分页
static async fenye1(index,num){
    return await course.findAll({
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



//筛选的教程信息分页
static async searchfenye1(msg,index, num) {
    return await course.findAll({
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


//筛选的教程信息分页
static async searchfenye(msg,index, num) {
    return await course.findAll({
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
                offset: (index - 1) * num,  //
                limit: num,  //限制每页几条数据
      })
}



//获得某个教程的信息   
static async getOneCourseInfo(b) {
    return await course.findOne({
        where: {
            id:b
        }
    })
}



//更新教程信息    
static async updateCourse(msg, id){
    return await course.update({
        id:msg.id,
        picture: msg.picture,
        kind: msg.kind,
        user_name: msg.user_name,
        type: msg.type,
        money:msg.money,
        introduce:msg.introduce,
        status:msg.status,
        check_people:msg.check_people,
        check_time:msg.check_time,
        kindchild:msg.kindchild  
    },{
       where:{
           id:id
       }
    })
}

//删除教程信息
static async delectCourse(msg) {
    return await course.destroy({
        where: {
            id: msg
        }
    })
}

}

module.exports = courseDao
