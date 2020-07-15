const router = require('koa-router')()
const homeController = require('../controllers/home')
const quan = require('../controllers/user')

router.get('/',            homeController.login)
router.get('/login',       homeController.login)
router.post('/checkLogin', homeController.checklogin)
router.get('/index',       homeController.index)
router.get('/logout',      homeController.logout)
router.get('/xian',        quan.xian)
module.exports = router
