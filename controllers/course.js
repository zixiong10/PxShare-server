const courseDao = require('../service/course_dao');
const kindcourseDao = require('../service/kindcourse_dao');
const db = require('../config/mysql_sequelize')
const turndatetime = require('../util/turndatetime');

// const baseController = require('../../controllers/admin/base');
const fs = require('fs')
module.exports = {

  //后端教程主页
  courselist:async (ctx,next) => {
   //教程总数量分页
   var page = 1; //第n页
   var num = 4;   //设置每页显示6条
   var list = await courseDao.getCourseInfo1() //教程总数内容
   var size = list.length //教程总数长度
   var totalPages = Math.ceil(size / num) //总页数
   var data //获取的数据
     
//搜索教程分页
   var n=12;   //设置每页显示4条
   var msg= ctx.request.body //搜索内容
   var info=msg.chaxun  //搜索内容具体化
   var child = await courseDao.getAllCourselist1(info)  //得到搜索内容，筛选出来的数据
   console.log(child)
   var number=child.length  //筛选出来的数据的长度
   var totalnumber = Math.ceil(number / n)  //筛选数据总页数 math.ceil(8.5))结果: 9 返回大于等于参数x的最小整数,即对浮点数向上取整

   //如果搜索内容还没有被定义，则按照原来的教程总数据来分页
   if(info==undefined ){
             if (!ctx.query.page && !ctx.query.num)      //第一次访问 //分页查询 //分页获取
                  {
                    data = await courseDao.fenye1(page, num)
                  
                  } 
             else { 
                    page = ctx.query.page
                    data = await courseDao.fenye1(page, num)}
   }
   //如果搜索内容被定义，则按照筛选出来的教程数据来分页
   else{
             if (!ctx.query.page && !ctx.query.num)
                 {
                   data = await courseDao.searchfenye1(info,page, n)
                   for(var i=0 ;i<data.length;i++){
                    var haha=turndatetime.formatTime(data[i].check_time)
                    data[i].check_time=haha}
                  }
             else {
                    page = ctx.query.page
                    data = await courseDao.searchfenye1(info,page, n)
                    for(var i=0 ;i<data.length;i++){
                      var haha=turndatetime.formatTime(data[i].check_time)
                      data[i].check_time=haha}
                   } 
                 data=data //获取的数据为筛选出来的数据
                 totalPages=totalnumber //获取的总页数为筛选出来的总页数
                 size=number  //获取的总数为筛选出来的数量
     }

      await ctx.render('course/courselist',{
        paging:{ page, totalPages, size,} ,
        courseResult:data
      });

      },

    //增加教程
    plus:async (ctx,next)=>{ 
      let userInfo=ctx.state.user
      await ctx.render('course/plus',{userInfo:userInfo})
  },
    //后端上传教程成功
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
             console.log("教程上传成功")
          });
        });
        if(upload) {
          addResult.userPhoto = getName + '.png';
          await courseDao.createCourse(addResult);
          await ctx.redirect('/courses/check')
      }
      }else{
        addResult.userPhoto = getName + '.png';
        await courseDao.createCourse(addResult);
        await ctx.redirect('/courses/check')
        console.log(addResult.userPhoto)
      }
  },


      //后端教程编辑
      edit:async(ctx,next)=>{
        let b = ctx.params.b;
        let data = await courseDao.getOneCourseInfo(b); 
        await ctx.render('course/edit', { info: data })
      },

      //后端审核教程编辑
      edit_child:async(ctx,next)=>{
        let b = ctx.params.b;
        let data = await courseDao.getOneCourseInfo(b); 
        console.log(data)
        let userInfo=ctx.state.user
        await ctx.render('course/check_child', { info: data ,userInfo:userInfo})
      },

      //后端教程编辑成功
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
                  let courseInfo = { id:editResult.id, picture:editResult.userPhoto, kind:editResult.kind,user_name:editResult.user_name,type:editResult.type,check_time:editResult.check_time}
                  await courseDao.updateCourse(courseInfo, id);
                  await ctx.redirect('/courses/courselist')
              

                }

            else{
                    var Info = await courseDao.getOneCourseInfo(editResult.id)
                    
                    editResult.userPhoto = Info.userPhoto;
                    let courseInfo = { id:editResult.id, picture:editResult.userPhoto, kind:editResult.kind,user_name:editResult.user_name,type:editResult.type,check_time:editResult.check_time}
                  await courseDao.updateCourse(courseInfo, id);
                  await ctx.redirect('/courses/courselist')

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
                let dataInfo = { id:editResult.id, picture:editResult.userPhoto, kind:editResult.kind,user_name:editResult.user_name,type:editResult.type,check_time:editResult.check_time}
                  await dataDao.updateCourse(dataInfo, id);
                  await ctx.redirect('/datas/datalist')

              }

            } else {

              var Info = await courseDao.getOneCourseInfo(editResult.id)

              editResult.userPhoto = Info.userPhoto;
              let courseInfo = { id:editResult.id, picture:editResult.userPhoto, kind:editResult.kind,user_name:editResult.user_name,type:editResult.type,check_time:editResult.check_time}
              await courseDao.updateCourse(courseInfo, id);
              await ctx.redirect('/courses/courselist')
            }

          }

      },
      //后端审核教程成功
      doedit_child:async(ctx,next)=>{
        let id = ctx.params.b;
        var edit = ctx.request.body;
        
        let editinfo={status:edit.status,check_people:edit.check_people,kindchild:edit.kindchild}
        await courseDao.updateCourse(editinfo,id);
        await ctx.redirect('/courses/check')
        console.log(editinfo)

      },


      //后端审核教程页面
      check:async (ctx,next)=> {
        //教程总数量分页
        var page = 1; //第n页
        var num = 4;   //设置每页显示6条
        var list = await courseDao.getCourseInfo2() //教程总数内容
        var size = list.length //教程总数长度
        var totalPages = Math.ceil(size / num) //总页数
        var data //获取的数据
          
      //搜索教程分页
        var n=12;   //设置每页显示4条
        var msg= ctx.request.body //搜索内容
        var info=msg.chaxun  //搜索内容具体化
        var child = await courseDao.getAllCourselist(info)  //得到搜索内容，筛选出来的数据
        var number=child.length  //筛选出来的数据的长度
        var totalnumber = Math.ceil(number / n)  //筛选数据总页数 math.ceil(8.5))结果: 9 返回大于等于参数x的最小整数,即对浮点数向上取整

        //如果搜索内容还没有被定义，则按照原来的教程总数据来分页
        if(info==undefined ){
                  if (!ctx.query.page && !ctx.query.num)      //第一次访问 //分页查询 //分页获取
                      {
                        data = await courseDao.fenye(page, num)} 
                  else { 
                        page = ctx.query.page
                        data = await courseDao.fenye(page, num)}
        }
        //如果搜索内容被定义，则按照筛选出来的教程数据来分页
        else{
                  if (!ctx.query.page && !ctx.query.num)
                      {
                        data = await courseDao.searchfenye(info,page, n)
                        for(var i=0 ;i<data.length;i++){
                          var haha=turndatetime.formatTime(data[i].check_time)
                          data[i].check_time=haha
                          }
                      }
                  else {
                        page = ctx.query.page
                        data = await courseDao.searchfenye(info,page, n)
                        for(var i=0 ;i<data.length;i++){
                          var haha=turndatetime.formatTime(data[i].check_time)
                          data[i].check_time=haha
                          }
                        } 
                      data=data //获取的数据为筛选出来的数据
                      totalPages=totalnumber //获取的总页数为筛选出来的总页数
                      size=number  //获取的总数为筛选出来的数量
                  }
                    await ctx.render('course/check', {  
                      paging:{ page, totalPages, size,} ,
                      coursesResult:data })
  },




  //前端上传教程
  postcourse:async (ctx,next) => {
    let data=ctx.request.body
    console.log(data) 
    let ha=await courseDao.getCourse(data)
    if(ha){
      ctx.body={
        code:-1,
        data:{
          message:'该教材id已存在'
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
       await courseDao.createcourse(data) 
       ctx.status = 200;
           ctx.body = {
           code: 1,
           data: {
              message: '发表成功',
              content:data.id+'课程已上传成功,请静待成果'
                   }
               }
            
         } else {
          await courseDao.createcourse(data) 
           ctx.status = 200;
               ctx.body = {
               code: 1,
               data: {
                 message: '发表成功',
                 content:data.id+'课程已上传成功,请静待成果'
                       }
                   }
                 }
           }
          }
},


      // 前端获取教程内容
      courseinfo:async(ctx,next)=>{
          let info=await courseDao.getCourseInfo1()
          ctx.body={
            data:{
              course:info
            }
          }
      },


    // 搜索获取指定教程信息
    searchCourse:async (ctx,next) => {
      let b=ctx.request.body
      let info=await courseDao.searchCourse(b) 
      let data=await kindcourseDao.getkindcourseInFo(b) 
      if(data==null){
        if(info==null){
          ctx.body = {
            code:-1,
            data:
            { message:'搜索内容不存在'}
          }
        }else{
          ctx.body = {
            code:1,
            data:
            { message:info}}
        }
      }else{
        ctx.body = {
          code:0,
          data:
          { message:data}}
      }

    },

    // 前端通过id获取指定教程信息
    foundcourse:async (ctx,next) => {
      let b=ctx.request.body
    let info=await courseDao.getCourse(b) 
    ctx.body = {
        data:
        {
            message:info
        }
    };
    },

    // 前端通过用户名获取指定教程信息
    findcourse:async (ctx,next) => {
      let b=ctx.request.body
    let info=await courseDao.GetCourse(b) 
    ctx.body = {
        data:
        {
            message:info
        }
    };
    },

   //后端删除指定教程
    delect:async(ctx,next)=>{
      let b=ctx.params.b;
      courseDao.delectCourse(b);
      await ctx.redirect('/courses/courselist',{})
    },
    //后端审核删除指定教程
    delect1:async(ctx,next)=>{
      let b=ctx.params.b;
      courseDao.delectCourse(b);
      await ctx.redirect('/courses/check',{})
    },
}