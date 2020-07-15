const router = require('koa-router')()
const courseController = require('../controllers/course')
const errorhandle = require('../middlewares/error')

router.prefix('/courses')
router.all('/*', async (ctx, next) => {
    if(!ctx.isAuthenticated()) {
        ctx.status = 401
    }
    await next()
 })

router.use(errorhandle)
router.get('/courselist',       courseController.courselist)//用户主页
router.get('/check',            courseController.check)//用户主页
router.get('/check_child/:b',   courseController.edit_child)    //用户编辑
router.post('/doedit_child/:b', courseController.doedit_child)    //用户编辑
router.get('/plus',             courseController.plus)    //增加用户
router.post('/sent',            courseController.sent)    //增加用户成功
router.post('/suo',             courseController.courselist)//用户主页搜索 
router.post('/checksuo',        courseController.check)//用户主页搜索   
router.get('/edit/:b',          courseController.edit)    //用户编辑
router.post('/doedit/:b',       courseController.doedit)  //编辑用户成功
router.get('/delect/:b',        courseController.delect)  //删除用户
router.get('/delect1/:b',       courseController.delect1)  //删除用户



module.exports = router
