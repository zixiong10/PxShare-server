const kindcourseDao = require('../service/kindcourse_dao');
const fs = require('fs')
module.exports = {
// 前端获取教程分类信息
     kindcourseinfo:async (ctx,next) => {
    let info=await kindcourseDao.getkindcourseinFo() 
    console.log(info)
    ctx.body = {
        data:
        {
            message:info
        }
    };
   },  
 }




 
