const recordDao = require('../service/record_dao');
const userDao = require('../service/user_dao');
const db = require('../config/mysql_sequelize');
const turndatetime = require('../util/turndatetime');


const fs = require('fs')
module.exports = {


// 前端获取信息
   recordinfo:async (ctx,next) => {
     let b=ctx.request.body
    let info=await recordDao.getrecordInFo(b) 
    ctx.body = {
        data:
        {
            message:info
        }
    };
   },

//前端新创消息记录
   postrecord:async (ctx,next) => {
      let data=ctx.request.body
        var haha=turndatetime.formatTime(data.record_date)
        data.record_date=haha
      var a=await recordDao.createrecord(data)
      ctx.body={
          code:1,
          data:{
              message:a
          }
      }
 },


 
//删除指定消息记录
 delectrecord :async(ctx,next)=>{
    let b=ctx.request.body
    console.log(b)
    await recordDao.delectrecord(b);
    ctx.status=200
    ctx.body={
       code:1,
       data:{
         message:'取消收藏',
         content:'刚刚您已经成功取消收藏此教程'
       }
    }
    
  },
//删除所有消息记录
  alldelect :async(ctx,next)=>{
    var a
    let b=ctx.request.body.list
    for(var i=0;i<b.length;i++){
     a=b[i].id
     await recordDao.alldelect(a);
    ctx.status=200
    ctx.body={
       code:1,
       data:{
         message:'全部消息已读',
       }
    }
  }
}
}