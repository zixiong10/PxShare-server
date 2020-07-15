const router = require('koa-router')()
const buyController = require('../controllers/buy')
const errorhandle = require('../middlewares/error')

router.all('/*', async (ctx, next) => {
    if(!ctx.isAuthenticated()) {
        ctx.status = 401
    }
    await next()
 })
router.prefix('/buys')
router.use(errorhandle)
router.get('/buylist',       buyController.buylist)//用户主页
router.get('/delect/:b',     buyController.delect)  //删除用户




module.exports = router
