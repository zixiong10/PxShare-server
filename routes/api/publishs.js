const router = require('koa-router')()
const publishController = require('../../controllers/publish')


router.prefix('/api/publishs')
router.get('/publishinfo', publishController.publishinfo)
router.post('/postpublish', publishController.postpublish)
router.post('/delectpublish',    publishController.delectpublish)  //删除用户

module.exports = router





