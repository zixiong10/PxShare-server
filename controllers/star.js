const starDao = require('../service/star_dao');
const userDao = require('../service/user_dao');
const db = require('../config/mysql_sequelize')


const fs = require('fs')
module.exports = {

// 前端获取收藏记录信息
   starinfo:async (ctx,next) => {
     let b=ctx.request.body
    let info=await starDao.getstarInFo(b) 
    ctx.body = {
        data:
        {
            message:info
        }
    };
   },

   //前端新收藏教程
   poststar:async (ctx,next) => {
      let data=ctx.request.body
      var a= await starDao.getstarInfo(data)
      if(a!=null){
        var b= await starDao.getstarinfo(data)
        if(b!=null){
            ctx.body = {
                code: -1,
                data:{
                   message: '已收藏',
                   content:'您此前已经收藏过教程'+data.item.id
                        }               
              }
                    
        }
        else{
            await starDao.createstar(data) 
            ctx.body = {
            code: 1,
            data:{
               message: '收藏成功',
               content:'刚刚您已经成功收藏教程'+data.item.id
                    }
           }       
        }
      }
      else{
        await starDao.createstar(data) 
        ctx.body = {
        code: 1,
        data:{
           message: '收藏成功',
           content:'刚刚您已经成功收藏教程'+data.item.id
                }
       }       
      }
               
 },



 //前端取消收藏指定教程
 delectstar :async(ctx,next)=>{
    let b=ctx.request.body
    await starDao.delectstar(b);
    ctx.status=200
    ctx.body={
       code:1,
       data:{
         message:'取消收藏',
         content:'刚刚您已经成功取消收藏教程'+b.item.id
       }
    }
    
  },

 //前端取消收藏指定教程
  delect :async(ctx,next)=>{
   let b=ctx.request.body
   await starDao.delect(b);
   ctx.status=200
   ctx.body={
      code:1,
      data:{
        message:'删除成功',
        content:'刚刚您已经成功取消收藏教程'+b.item.id
      }
   }
   
 }
}