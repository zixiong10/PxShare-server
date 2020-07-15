const remindDao = require('../service/remind_dao');
const turndatetime = require('../util/turndatetime');


const fs = require('fs')
module.exports = {

// 前端获取消息提醒状态值
   remindinfo:async (ctx,next) => {
     let b=ctx.request.body
    let info=await remindDao.getremindInFo(b) 
    ctx.body = {
        data:
        {
            message:info
        }
    };
  
   },

   //前端新创消息提醒状态值
   postremind:async (ctx,next) => {
      let data=ctx.request.body
      var b=await remindDao.getremindInFo(data)
      console.log(b.length)
      if(b.length==0){
        await remindDao.createremind(data)
        ctx.body={
          code:1,
          data:{
              message:b
          }
      }
      }
      else{
      var a=await remindDao.updateRemind(data)
      ctx.body={
        code:1,
        data:{
            message:a
        }
    }
      }
  
 },
}