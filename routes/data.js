const router = require('koa-router')()
const dataController = require('../controllers/data')
const errorhandle = require('../middlewares/error')

router.prefix('/datas')
router.all('/*', async (ctx, next) => {
    if(!ctx.isAuthenticated()) {
        ctx.status = 401
    }
    await next()
 })


router.use(errorhandle)
router.get('/datalist',         dataController.datalist)//用户主页
router.get('/check',            dataController.check)//用户主页
router.get('/check_child/:b',   dataController.edit_child)    //用户编辑
router.post('/doedit_child/:b', dataController.doedit_child)    //用户编辑
router.get('/plus',             dataController.plus)    //增加用户
router.post('/sent',            dataController.sent)    //增加用户成功
router.post('/suo',             dataController.datalist)//用户主页搜索  
router.post('/checksuo',        dataController.check)//用户主页搜索  
router.get('/edit/:b',          dataController.edit)    //用户编辑
router.post('/doedit/:b',       dataController.doedit)  //编辑用户成功
router.get('/delect/:b',        dataController.delect)  //删除用户
router.get('/delect1/:b',       dataController.delect1)  //删除用户




module.exports = router
