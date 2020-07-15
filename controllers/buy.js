const buyDao = require('../service/buy_dao');
const userDao = require('../service/user_dao');
const db = require('../config/mysql_sequelize')
const turndatetime = require('../util/turndatetime');
const fs = require('fs')
module.exports = {

  //后端获取交易信息
  buylist:async (ctx,next) => {
     //交易记录总数量分页
     var page = 1; //第n页
     var num = 4;   //设置每页显示6条
     var list = await buyDao.getbuyInFo() //交易记录总数内容
     var size = list.length //交易记录总数长度
     var totalPages = Math.ceil(size / num) //总页数
     var data //获取的数据
     if (!ctx.query.page && !ctx.query.num)      //第一次访问 //分页查询 //分页获取
     {
       data = await buyDao.fenye(page, num) 
       for(var i=0 ;i<data.length;i++){
        var haha=turndatetime.formatTime(data[i].buy_time)
               data[i].buy_time=haha} 
     } 
  else { 
       page = ctx.query.page
       data = await buyDao.fenye(page, num)}
       for(var i=0 ;i<data.length;i++){
        var haha=turndatetime.formatTime(data[i].buy_time)
         data[i].buy_time=haha}
         data=data //获取的数据为筛选出来的数据
      
        await ctx.render('buy/buylist',{
          paging:{ page, totalPages, size,} ,
          data:data});
  
},


// 前端获取交易信息
   buyinfo:async (ctx,next) => {
     let b=ctx.request.body
    let info=await buyDao.getbuyInfo(b) 
    ctx.body = {
        data:
        {
            message:info
        }
    };
   },

 
   postbuy:async (ctx,next) => {
     let data=ctx.request.body     //前端的数据
     let child=data.item           //教程的基本信息
     let buy=await buyDao.getbuy(data)
     if(buy==null){
     let many=await buyDao.getbuyinfo(data) //查询下单购买的用户余额是否大于或等于目标教程价格
     if(many==null){  //如果为空，说明用户余额不足
       ctx.body={
         code:-1,
         data:{
           message:'购买失败，余额不足',
           content:'刚刚购买教程失败,账户余额不足'
         }
       }
     }
     else{
        // 发布教程的用户
        let trouble=await userDao.getUserbuying(data.item.user_name)  //找到发布教程的用户信息
        let b=888
        let boss=await userDao.getUserInfo(b)  //找到收款的老板信息
        let tip=(data.item.money)*0.05         //app赚的钱 1/20
        let sum=(data.item.money)*0.95         //利率 剩下的
        boss.cash=tip + boss.cash              //app赚的钱
        trouble.gold=sum + trouble.gold        //原创挣的钱
        await userDao.UpdateUser(boss,boss.user_id)      //更新老板的钱库余额
        await userDao.UpdateUser(trouble,trouble.user_id)//更新原创的金币数
        console.log(tip)
        console.log(sum)
        // 购买教程的用户
        let trouble2=await userDao.getUserInfo(data.user.user_id) //找到购买教程的用户
        let reduce=data.item.money                                //教程价钱
        trouble2.cash=trouble2.cash - reduce                      //用户的余额减去价格
        await userDao.UpdateUser(trouble2,trouble2.user_id)       //更新用户的余额数
        
        let create={buy_id:child.id,introduce:child.introduce, money:child.money, picture:child.picture,author:child.user_name,user_name:data.user.user_name,buy_time:data.date }
        await buyDao.createBuy(create,trouble.user_name)   //后台创建交易信息，留有凭据
        
        ctx.body={
            code:1,
            data:{
              nomoney:'下载教程'+child.id+'成功',
              message:'购买成功',
              content:'恭喜您，刚刚购买教程成功'+child.id+',祝你学习愉快',
              nomoneycontent:'恭喜您，刚刚下载教程'+child.id+'成功,祝你学习愉快'
            }
        }
     }
     }else{
      ctx.body={
        code:-2,
        data:{
          message:'你已经下载或购买过教程'+child.id,
          content:'你此前已经下载或购买过教程,'+child.id+'请前往购买列表查看'
        }
      }
     }

    
  },
    //后端删除指定交易信息
    delect:async(ctx,next)=>{
      let b=ctx.params.b;
      buyDao.delect(b);
      await ctx.redirect('/buys/buylist',{})
},
    //前端删除指定交易信息
    delectbuy :async(ctx,next)=>{
      let b=ctx.request.body
      console.log(b)
      await buyDao.delectbuy(b);
      ctx.status=200
      ctx.body={
        code:1,
        data:{
          message:'已删除教程',
          content:'已成功删除教程，请你放心'
        }
      }
  
},

}