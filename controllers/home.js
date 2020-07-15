
const userDao = require('../service/user_dao')
const passport = require('../util/passport')

module.exports = {
    login:async(ctx,next)=>{
        await ctx.render('login', {error:''})
    },
    checklogin:async(ctx,next)=>{
      return passport.authenticate('local', async (err, user, info) =>{
        if (err) { 
          await ctx.render('error',{message:'抱歉，权限验证错误！',error:err});
        }
        if (!user) { 
          await ctx.render('login', {error:info})
        }else{
          ctx.login(user)
          await ctx.response.redirect('/index')
        }
      })(ctx);
    },
    logout:async(ctx,next)=>{
      ctx.logout()
      await ctx.render('login', {error:''})
    },
    index:async(ctx,next)=>{
      if(!ctx.isAuthenticated()){
        await ctx.render('login', {error:'请重新登陆'})
      }else{
        let userInfo = ctx.state.user
        await ctx.render('index', {userInfo:userInfo})
      }
    }
   
}



