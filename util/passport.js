// passport.js

var LocalStrategy = require('passport-local').Strategy
const userDao = require('../service/user_dao')
const md5 = require('../util/md5solt')
const uuid = require('node-uuid')


const passport = require('koa-passport')
const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
const opts = {
    jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey:"gamercode"// 数字签名，与生成token时的一样，不能告诉用户
}
//jwt验证
passport.use(new JwtStrategy(opts,async (jwt_payload,done)=>{
    //jwt_payload 返回的是登录时返回的数据 即payload
    // console.log(jwt_payload)
    const user=await userDao.getUserInfo(jwt_payload.user_id);
    if(user){
        user.password =''
        user.solt=''
        done(null,user);
    }else{
        done(null,false);
    }
}))

//本地验证
passport.use(new LocalStrategy({
        usernameField: 'user_id',
        passwordField: 'password'
    },
     async (user_id,password,done)=> {
        let result = await userDao.getUserInfo(user_id);
        if (result !== null) {
                if(!result.solt){
                    var solt=uuid.v4();
                    result.solt=solt;
                    let mima = await md5.MD5(password,result.solt)
                    await userDao.addSolt(result.user_id, mima, result.solt)
                    result.password=mima
                    // console.log(mima)
                    // console.log(result.password)
                }
                    
                var solt=result.solt
                let md5pass = await md5.MD5(password,solt)
                // console.log(md5pass)
                // console.log(result.password)
                if(md5pass===result.password){
                    return done(null, result,'登录成功')
                }else{
                    return done(null, false, '密码错误')
                }
        
                } 
                 else {
                    return done(null, false, '账号异常')
                }
                
    }
))
// serializeUser 在用户登录验证成功以后将会把用户的数据存储到 session 中
passport.serializeUser(function (user, done) {
    //保护密码
    user.password =''
    user.solt=''
    done(null, user)
})
// deserializeUser 在每次请求的时候将从sesssion 中读取用户对象
passport.deserializeUser(function (user, done) {
     done(null, user)
})
module.exports = passport


