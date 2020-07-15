const dataDao = require('../service/data_dao');
const db = require('../config/mysql_sequelize')
const turndatetime = require('../util/turndatetime');

// const baseController = require('../../controllers/admin/base');
const fs = require('fs')
module.exports = {

  datalist:async (ctx,next) => {
   //素材总数量分页
   var page = 1; //第n页
   var num = 4;   //设置每页显示6条
   var list = await dataDao.getDataInfo1() //素材总数内容
   var size = list.length //素材总数长度
   var totalPages = Math.ceil(size / num) //总页数
   var data //获取的数据
   
//搜索素材分页
   var n=12;   //设置每页显示4条
   var msg= ctx.request.body //搜索内容
   var info=msg.chaxun  //搜索内容具体化
   var child = await dataDao.getAlldatalist(info)  //得到搜索内容，筛选出来的数据
   console.log(child)
   var number=child.length  //筛选出来的数据的长度
   var totalnumber = Math.ceil(number / n)  //筛选数据总页数 math.ceil(8.5))结果: 9 返回大于等于参数x的最小整数,即对浮点数向上取整

   //如果搜索内容还没有被定义，则按照原来的素材总数据来分页
   if(info==undefined ){
             if (!ctx.query.page && !ctx.query.num)      //第一次访问 //分页查询 //分页获取
                  {
                    data = await dataDao.fenye1(page, num)} 
             else { 
                    page = ctx.query.page
                    data = await dataDao.fenye1(page, num)}
                    
   }
   //如果搜索内容被定义，则按照筛选出来的素材数据来分页
   else{
             if (!ctx.query.page && !ctx.query.num)
                 {
                   data = await dataDao.searchfenye1(info,page, n)
                   for(var i=0 ;i<data.length;i++){
                  var haha=turndatetime.formatTime(data[i].check_time)
                  data[i].check_time=haha
                  }
                  }
                   
             else {
                    page = ctx.query.page
                    data = await dataDao.searchfenye1(info,page, n)

                    for(var i=0 ;i<data.length;i++){
                    var haha=turndatetime.formatTime(data[i].check_time)
                    data[i].check_time=haha
                    }
              } 
                 data=data //获取的数据为筛选出来的数据
                 totalPages=totalnumber //获取的总页数为筛选出来的总页数
                 size=number  //获取的总数为筛选出来的数量  
     }
      await ctx.render('data/datalist',{
        data: data , 
        paging:{ page, totalPages, size,} ,
        dataResult:data
      });

  },

//增加素材
plus:async (ctx,next)=>{ 
    await ctx.render('data/plus')
},
//后端增加素材
sent:async (ctx,next) =>{
    var addResult = ctx.request.body;
      if(addResult.userPhotoVal){
        let base64Data = addResult.userPhotoVal.replace(/^data:image\/\w+;base64,/,"");
        let dataBuffer = Buffer.from(base64Data,'base64');
        let getName = Number(Math.random().toString().substr(3)).toString(36)+Date.now();
        let upload = await new Promise((reslove, reject) => {
          fs.writeFile('./public/images/upload/' + getName + '.png', dataBuffer, err => {
             if(err) {
               throw err;
               reject(false);
             };
             reslove(true)
             console.log("素材上传成功")
          });
        });

        if(upload) {
          addResult.userPhoto = getName + '.png';
          await dataDao.createData(addResult);
          await ctx.redirect('/datas/check')
        }
      }else{
        addResult.userPhoto = getName + '.png';
        await dataDao.createData(addResult);
        await ctx.redirect('/datas/datalist')
        console.log(addResult.userPhoto)
      }

  },


//素材编辑
edit:async(ctx,next)=>{
  let b = ctx.params.b;
  let data = await dataDao.getOneDataInfo(b); 
  await ctx.render('data/edit', { info: data })
},

//素材编辑
edit_child:async(ctx,next)=>{
  let b = ctx.params.b;
  let data = await dataDao.getOneDataInfo(b); 
  let userInfo=ctx.state.user
  await ctx.render('data/check_child', { info: data ,userInfo:userInfo})
},
//编辑成功
doedit:async(ctx,next)=>{

  let id = ctx.params.b;
  var editResult = ctx.request.body;
      if (editResult.userPhotoVal){
        let base64Data = editResult.userPhotoVal.replace(/^data:image\/\w+;base64,/,""),
              dataBuffer = Buffer.from(base64Data,'base64'),
              getName = Number(Math.random().toString().substr(3)).toString(36) + Date.now(),
              upload = await new Promise((reslove, reject) => {
                fs.writeFile('./public/images/upload/'+getName+'.png',dataBuffer,err => {
                  if(err) {
                    throw err;
                    reject(false);
                  };
                  reslove(true)
                  console.log("头像上传成功")
                });
              });

          if(upload){

             editResult.userPhoto = getName + '.png';
             let dataInfo = { id:editResult.id, picture:editResult.userPhoto, kind:editResult.kind, user_name:editResult.user_name,check_time:editResult.check_time}
             await dataDao.updateData(dataInfo, id);
             await ctx.redirect('/datas/datalist')
          }
      else{
              var Info = await dataDao.getOneDataInfo(editResult.id)        
              editResult.userPhoto = Info.userPhoto;
              let dataInfo = { id:editResult.id, picture:editResult.userPhoto, kind:editResult.kind, user_name:editResult.user_name,check_time:editResult.check_time}
             await dataDao.updateData(dataInfo, id);
             await ctx.redirect('/datas/datalist')
      }
    }else{ 
      if (editResult.userPhotoVal) {
        let base64Data = editResult.userPhotoVal.replace(/^data:image\/\w+;base64,/, ""),
          dataBuffer = Buffer.from(base64Data, 'base64'),
          getName = Number(Math.random().toString().substr(3)).toString(36) + Date.now(),
          upload = await new Promise((reslove, reject) => {
            fs.writeFile('./public/images/upload/' + getName + '.png', dataBuffer, err => {
              if (err) {
                throw err;
                reject(false);
              };
              reslove(true)
              console.log("头像上传成功")
            });
          });
        if (upload) {
          editResult.userPhoto = getName + '.png';
          let dataInfo = { id:editResult.id, picture:editResult.userPhoto, kind:editResult.kind, user_name:editResult.user_name,check_time:editResult.check_time}
             await dataDao.updateData(dataInfo, id);
             await ctx.redirect('/datas/datalist')
        }
      } else {
        var Info = await dataDao.getOneDataInfo(editResult.id)
        editResult.userPhoto = Info.userPhoto;
        let dataInfo = { id:editResult.id, picture:editResult.userPhoto, kind:editResult.kind, user_name:editResult.user_name,check_time:editResult.check_time}
        await dataDao.updateData(dataInfo, id);
        await ctx.redirect('/datas/datalist')
      }
    }

},


doedit_child:async(ctx,next)=>{
        let id = ctx.params.b;
        var edit = ctx.request.body;
        
        let editinfo={status:edit.status,check_people:edit.check_people}
        await dataDao.updateData(editinfo,id);
        await ctx.redirect('/datas/check')

},

//审核素材页面
check:async (ctx,next)=> {
 
    //素材总数量分页
    var page = 1; //第n页
    var num = 4;   //设置每页显示6条
    var list = await dataDao.getDataInfo2() //素材总数内容
    
    var size = list.length //素材总数长度
    var totalPages = Math.ceil(size / num) //总页数
    var data //获取的数据
      
 //搜索素材分页
    var n=12;   //设置每页显示4条
    var msg= ctx.request.body //搜索内容
    var info=msg.chaxun  //搜索内容具体化
    var child = await dataDao.getAlldatalist1(info)  //得到搜索内容，筛选出来的数据
    var number=child.length  //筛选出来的数据的长度
    var totalnumber = Math.ceil(number / n)  //筛选数据总页数 math.ceil(8.5))结果: 9 返回大于等于参数x的最小整数,即对浮点数向上取整
 
    //如果搜索内容还没有被定义，则按照原来的素材总数据来分页
    if(info==undefined ){
              if (!ctx.query.page && !ctx.query.num)      //第一次访问 //分页查询 //分页获取
                   {
                     data = await dataDao.fenye(page, num)} 
              else { 
                     page = ctx.query.page
                     data = await dataDao.fenye(page, num)}
    }
    //如果搜索内容被定义，则按照筛选出来的素材数据来分页
    else{
              if (!ctx.query.page && !ctx.query.num)
                  {
                    data = await dataDao.searchfenye(info,page, n)
                    for(var i=0 ;i<data.length;i++){
                      var haha=turndatetime.formatTime(data[i].check_time)
                      data[i].check_time=haha}
                  }
              else {
                     page = ctx.query.page
                     data = await dataDao.searchfenye(info,page, n)
                     for(var i=0 ;i<data.length;i++){
                      var haha=turndatetime.formatTime(data[i].check_time)
                      data[i].check_time=haha}
                    } 
                  data=data //获取的数据为筛选出来的数据
                  totalPages=totalnumber //获取的总页数为筛选出来的总页数
                  size=number  //获取的总数为筛选出来的数量
      }
      await ctx.render('data/check', {  
        paging:{ page, totalPages, size,} ,
        dataResult:data })
},
//主页删除素材
delect:async(ctx,next)=>{
  let b=ctx.params.b;
  dataDao.delectData(b);
  await ctx.redirect('/datas/datalist',{})
},
//审核页删除素材
delect1:async(ctx,next)=>{
  let b=ctx.params.b;
  dataDao.delectData(b);
  await ctx.redirect('/datas/check',{})
},


// 前端上传素材
postmaterial:async (ctx,next) => {
  let data=ctx.request.body
  console.log(data)
  let ha=await dataDao.getMaterial(data)
  if(ha){
    ctx.body={
      code:-1,
      data:{
        message:'该素材id已存在'
      }
    }
  }
  else{
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
       let info=await dataDao.createdata(data) 
       console.log(info)
       ctx.status = 200;
           ctx.body = {
           code: 1,
           data: {
              message: '发表成功',
              content:'素材已上传成功,您的知识财富即将得到回报'
                   }
               }    
         } else {
          let info=await dataDao.createdata(data) 
          console.log(info)
          ctx.status = 200;
              ctx.body = {
              code: 1,
              data: {
                 message: '发表成功',
                 content:'素材已上传成功,您的知识财富即将得到回报'
                      }
                    }
                  }
                }
              }
  },

// 前端获取素材信息
  materialinfo:async (ctx,next) => {
    let info=await dataDao.getDataInfo()
    ctx.body = {
        data:
        {
            material:info
        }
    };
   },
 //前端获取指定素材信息
   findmaterial:async (ctx,next) => {
    let b=ctx.request.body
   let info=await dataDao.getmaterial(b) 
   ctx.body = {
       data:
       {
           message:info
       }
   };
  },

}