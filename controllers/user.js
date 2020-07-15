const uuid = require('node-uuid')
const userDao = require('../service/user_dao')
const passport = require('../util/passport')
const md5 = require('../util/md5solt')
const jwt = require('jsonwebtoken');
const fs = require('fs')

module.exports = {
    userlist:async(ctx,next)=>{
  
     //用户总数量分页
     var page = 1; //第n页
     var num = 6;   //设置每页显示6条
     var list = await userDao.getAllUser() //用户总数内容
     var size = list.length //用户总数长度
     var totalPages = Math.ceil(size / num) //总页数
     var data //获取的数据    
 //搜索用户分页
     var n=12;   //设置每页显示4条
     var msg= ctx.request.body //搜索内容
     var info=msg.chaxun  //搜索内容具体化
     var child = await userDao.getAlluserlist(info)  //得到搜索内容，筛选出来的数据
     var number=child.length  //筛选出来的数据的长度
     var totalnumber = Math.ceil(number / n)  //筛选数据总页数 math.ceil(8.5))结果: 9 返回大于等于参数x的最小整数,即对浮点数向上取整

     //如果搜索内容还没有被定义，则按照原来的用户总数据来分页
     if(info==undefined ){
               if (!ctx.query.page && !ctx.query.num)      //第一次访问 //分页查询 //分页获取
                    {
                      data = await userDao.fenye(page, num)} 
               else { 
                      page = ctx.query.page
                      data = await userDao.fenye(page, num)}
     }
     //如果搜索内容被定义，则按照筛选出来的用户数据来分页
     else{
               if (!ctx.query.page && !ctx.query.num)
                   {
                     data = await userDao.searchfenye(info,page, n)
                    
                    }
               else {
                      page = ctx.query.page
                      data = await userDao.searchfenye(info,page, n)
                     } 
                   data=data //获取的数据为筛选出来的数据
                   totalPages=totalnumber //获取的总页数为筛选出来的总页数
                   size=number  //获取的总数为筛选出来的数量
       }
              await ctx.render('user/userlist', {
                    data: data , 
                    paging:{ page, totalPages, size,} 
              })
},


//大主页的用户角色权限   
    xian:async(ctx,next)=>{
          let data = await userDao.getAllUser();
          await ctx.render('/index', {userInfo: data})
},


//用户编辑
    edit:async(ctx,next)=>{
         let b = ctx.params.b;
         let data = await userDao.getUserInfo(b); 
         
         await ctx.render('user/edit', { info: data })
},

//编辑成功
    doedit:async(ctx,next)=>{

        let id = ctx.params.b;
        var editResult = ctx.request.body;
          if (editResult.password) {
            var solt = uuid.v4();
            editResult.password = await md5.MD5(editResult.password, solt);
            editResult.solt = solt;
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
                   let userInfo = { user_id:editResult.user_id, user_name:editResult.user_name, role:editResult.role,solt:editResult.solt,password:editResult.password,userPhoto:editResult.userPhoto}
                   await userDao.updateUser(userInfo, id);
                   await ctx.redirect('/users/userlist')
                }
            }else{
                    var Info = await userDao.getUserInfo(editResult.user_id)
                    
                    editResult.userPhoto = Info.userPhoto;
                    let userInfo = { user_id:editResult.user_id, user_name:editResult.user_name, role:editResult.role,solt:editResult.solt,password:editResult.password,userPhoto:editResult.userPhoto}
                    await userDao.updateUser(userInfo, id);
                    await ctx.redirect('/users/userlist')
            }
  
          }else{
            var Info = await userDao.getUserInfo(editResult.user_id)
            editResult.password = Info.password;
            editResult.solt = userInfo.solt;
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
                let userInfo = { user_id:editResult.user_id, user_name:editResult.user_name, role:editResult.role,solt:editResult.solt,password:editResult.password,userPhoto:editResult.userPhoto}
                await userDao.updateUser(userInfo, id);
                await ctx.redirect('/users/userlist')
              }
  
            } else {
  
              var Info = await userDao.getUserInfo(editResult.user_id)
              editResult.userPhoto = Info.userPhoto;
              let userInfo = { user_id:editResult.user_id, user_name:editResult.user_name, role:editResult.role,solt:editResult.solt,password:editResult.password,userPhoto:editResult.userPhoto}
              await userDao.updateUser(userInfo, id);
              await ctx.redirect('/users/userlist')
            }
  
          }
  
    
  
    
},

//增加用户
    plus:async (ctx,next)=>{ 
        await ctx.render('user/plus')
},
//增加用户成功
sent:async (ctx,next) =>{
    var addResult = ctx.request.body;
    if(addResult.password) {
      var solt = uuid.v4();
      addResult.password = await md5.MD5(addResult.password, solt);
      addResult.solt = solt;
    }
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
             console.log("头像上传成功")
          });
        });

        if(upload) {

          addResult.userPhoto = getName + '.png';

          await userDao.createUser(addResult);
          await ctx.redirect('/users/userlist')
        }
      }else{
        addResult.userPhoto = getName + '.png';
        await userDao.createUser(addResult);
        await ctx.redirect('/users/userlist')
        console.log(addResult.userPhoto)
      }
  },
//删除用户
    delect:async(ctx,next)=>{
        let b=ctx.params.b;
        userDao.delectUser(b);
        await ctx.redirect('/users/userlist',{})
},
    //前端登录用户
    postlogin:async(ctx)=>{
        const data = ctx.request.body;
        const user = await userDao.getUserInfo(data.user_id)  
        if (!user) {
            ctx.status = 200;
            ctx.body = {
                code:-1,
                data:{
                    message: '该用户不存在'
                }
            };
            return;
        }
        if(!user.solt){
                var solt=uuid.v4();
                user.solt=solt;
                let mima = await md5.MD5(user.password,user.solt)
                await userDao.addSolt(user.user_id, mima, user.solt)
                user.password=mima
        }
        //验证密码   
        var solt=user.solt
        const pword=user.password
        let md5pass = await md5.MD5(data.password,solt)
        if(md5pass === user.password){
            const payload = {
                user_id: user.user_id,
                user_name:user.user_name,
                role:user.role,
                password:pword,
                solt:solt,
                cash:user.cash,
                benefit:user.benefit,
                gold:user.gold,
                user_photo:user.user_photo
            };
            
            const userinfo = payload;
            //生成token
            const token = jwt.sign(payload, "gamercode", {
                expiresIn: 3600
            });
            console.log("生成token："+ token)
            ctx.status = 200;
            ctx.body = {
                code:1,
                data:{
                    message: '验证成功',
                    token: 'Bearer ' + token,
                    userInfo:userinfo
                }
            }
            
        }else{
            ctx.status = 200;
            ctx.body = {
                code:0,
                data:{
                    message: '密码错误'
                }
            };
        }
    },
    //前端获取个人信息
    userinfo:async(ctx)=>{
        ctx.body = {
            data:
            {
                user:ctx.state.user
               
            }
        };
       
    },
      //修改密码
      putpassword:async(ctx,next) => {
        let { user_id, oldpassword, newpassword, repeatpassword } = {
             user_id:ctx.request.body.user_id,
             oldpassword: ctx.request.body.oldpassword, 
             newpassword: ctx.request.body.newpassword, 
             repeatpassword: ctx.request.body.repeatpassword}

        const result = await userDao.getUserInfo(user_id);

        const checkpassword = await md5.MD5(oldpassword,result.solt)

        if(result.password !== checkpassword){
            ctx.body={
                message:'原密码不正确',
                code:-1
            }
        }else{
            var solt = uuid.v4();
            var password = await md5.MD5(newpassword,solt);
            var editResult = { user_id,password,solt };
            await userDao.updateUser(editResult,user_id);
            ctx.body={
                code:1,
                message:'修改密码成功!',
                content:'刚刚您已经成功修改密码'
            }
        }

    },

    putdata: async(ctx)=>{
    const data = ctx.request.body
    let id=data.user_id
    console.log(data)
    await userDao.UpdateUser(data,id)
    ctx.status=200;
    ctx.body={
     code:1,
     message:'修改信息成功',
     content:'刚刚您已经成功修改个人信息'
 }
    
    },

    // 前端注册
    postuser: async (ctx) => {
        const data = ctx.request.body
        console.log(data)
        var ai = await userDao.getuserInfo(data)
        console.log(ai)
        if(ai==null){
           ctx.body={
            code:-1,
            data:{
              message:'用户已存在,请更改账号或昵称'
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
                await userDao.createuser(data)
                ctx.status = 200;
                ctx.body = {
                code: 1,
                data: {
                   message: '注册成功'
                        }
                    }
                  }
        } else {
          await userDao.createuser(data)
          ctx.status = 200;
          ctx.body = {
          code: 1,
          data: {
             message: '注册成功'
                  }
              }
            }

    }
  }
  
}



