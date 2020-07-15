const router = require('koa-router')()
const userController = require('../../controllers/user')
const passport = require("../../util/passport")

router.prefix('/api/users')

router.post('/postlogin', userController.postlogin)
router.post('/postuser', userController.postuser)

router.all('/*',
passport.authenticate('jwt', { session: false })
,async (ctx, next) => {
    console.log(ctx.request)
    await next()
 })

router.get('/userinfo', userController.userinfo)
router.put('/putpassword', userController.putpassword)
router.put('/putdata', userController.putdata)


module.exports = router





