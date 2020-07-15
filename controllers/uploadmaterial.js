const uploadmaterialDao = require('../service/uploadmaterial_dao');
const dataDao = require('../service/data_dao');

const fs = require('fs')
module.exports = {


// 前端获取下载的素材信息
   uploadmaterialinfo:async (ctx,next) => {
     let b=ctx.request.body
    let info=await uploadmaterialDao.getuploadmaterialinfo(b) 
    ctx.body = {
        data:
        {
            message:info
        }
    };
  
   },

  //前端下载指定素材
   postuploadmaterial:async (ctx,next) => {
      let data=ctx.request.body
      let c
      for(var i=0;i<data.id.length;i++){
          c=data.id[i]
      var b=await uploadmaterialDao.getuploadmaterialInFo(c)
      if(b==null){
          let upload=await dataDao.getuploadmaterial(c)
        await uploadmaterialDao.createuploadmaterial(data,upload,c)
        ctx.body={
          code:1,
          data:{
              message:'下载素材'+c +'成功',
              content:'您刚刚成功下载素材'+ c + ','+'祝你学习愉快'
              }
          }
      }
      else{
      ctx.body={
        code:-1,
        data:{
            message:'您已经下载过此素材'+ c,
            content:'您此前已经下载过此素材'+ c + ','+'请前往我的下载中查看'
            }
         }
      }
    }
 },

//前端删除指定下载目录中的素材
 delect:async(ctx,next)=>{
    let b=ctx.request.body
    console.log(b)
    await uploadmaterialDao.delect(b);
    ctx.status=200
    ctx.body={
       code:1,
       data:{
         message:'删除成功',
       }
    }
}
 
}