const router = require('koa-router')()
const starController = require('../../controllers/star')


router.prefix('/api/stars')
router.post('/starinfo', starController.starinfo)
router.post('/poststar', starController.poststar)
router.post('/delectstar',    starController.delectstar) 
router.post('/delect',    starController.delect) 

module.exports = router
