const router = require('koa-router')()
const publishController = require('../controllers/publish')
const errorhandle = require('../middlewares/error')

router.prefix('/publishs')

router.all('/*', async (ctx, next) => {
    if(!ctx.isAuthenticated()) {
        ctx.status = 401
    }
    await next()
 })


router.use(errorhandle)
router.get('/publishlist', publishController.publishlist)//用户主页
router.get('/delect/:b',   publishController.delect)  //删除用户


module.exports = router
