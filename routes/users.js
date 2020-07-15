const router = require('koa-router')()
const userController = require('../controllers/user')
const errorhandle = require('../middlewares/error')

router.prefix('/users')

router.all('/*', async (ctx, next) => {
    if(!ctx.isAuthenticated()) {
        ctx.status = 401
    }
    await next()
 })


router.use(errorhandle)
router.get('/userlist',   userController.userlist)//用户主页
router.post('/suo',       userController.userlist)//用户主页搜索  
router.get('/edit/:b',    userController.edit)    //用户编辑
router.post('/doedit/:b', userController.doedit)  //编辑用户成功
router.get('/plus',       userController.plus)    //增加用户
router.post('/sent',      userController.sent)    //增加用户成功
router.get('/delect/:b',  userController.delect)  //删除用户




module.exports = router
