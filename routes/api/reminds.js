const router = require('koa-router')()
const remindController = require('../../controllers/remind')

router.prefix('/api/reminds')
router.post('/remindinfo', remindController.remindinfo)
router.post('/postremind', remindController.postremind)


module.exports = router