const publishDao = require('../service/publish_dao');
const db = require('../config/mysql_sequelize')
const fs = require('fs')
module.exports = {

  publishlist:async (ctx,next) => {
     //动态总数量分页
   var page = 1; //第n页
   var num = 4;   //设置每页显示6条
   var list = await publishDao.getpublishInfo() //动态总数内容
   var size = list.length //动态总数长度
   var totalPages = Math.ceil(size / num) //总页数
   var data //获取的数据
   if (!ctx.query.page && !ctx.query.num)      //第一次访问 //分页查询 //分页获取
   {
     data = await publishDao.fenye(page, num)  
   } 
else { 
     page = ctx.query.page
     data = await publishDao.fenye(page, num)}
     data=data //获取的数据为筛选出来的数据
    
      await ctx.render('publish/publishlist',{
        paging:{ page, totalPages, size,} ,
        data:data});

      },


   // 前端获取发表动态信息
   publishinfo:async (ctx,next) => {
    let info=await publishDao.getpublishInfo()
    ctx.body = {
        data:
        {
            publish:info
        }
    };
   },
  //前端发布动态信息
   postpublish:async (ctx,next) => {
     let data=ctx.request.body
     console.log(data)
     if (data.user_photo) {
       let base64Data = data.user_photo.replace(/^data:image\/\w+;base64,/, "");
            let dataBuffer = Buffer.from(base64Data, 'base64');
            let getName = Number(Math.random().toString().substr(3)).toString(36) + Date.now();
            let upload = await new Promise((reslove, reject) => {
                fs.writeFile('./public/images/upload/' + getName + '.png' , dataBuffer, err => {
                    if (err) {
                        throw err;
                        reject(false);
                    };
                    reslove(true)
                    console.log("头像上传成功")
                });
            });

      if (upload) {
          data.user_photo = getName + '.png';
          await publishDao.createPublish(data) 
          ctx.status = 200;
              ctx.body = {
              code: 1,
              data: {
                 message: '发表成功',
                 content:'就在刚刚,尊贵的动态您成功发表了一条动态'
                      }
                  }
               
            } else {
              await publishDao.createPublish(data) 
              ctx.status = 200;
                  ctx.body = {
                  code: 1,
                  data: {
                    message: '发表成功',
                    content:'就在刚刚,尊贵的动态您成功发表了一条动态'
                          }
                      }
                    }
              }
  },


    //后端删除指定动态信息
    delect:async(ctx,next)=>{
      let b=ctx.params.b;
      publishDao.delect(b);
      await ctx.redirect('/publishs/publishlist',{})
},
   //前端删除指定动态信息
    delectpublish :async(ctx,next)=>{
      let b=ctx.request.body
      publishDao.delectpublish(b);
      ctx.status=200
      ctx.body={
        code:1,
        data:{
          message:'删除成功',
          content:'你已成功删除您的一条个人动态'
        }
      }  
  }

}