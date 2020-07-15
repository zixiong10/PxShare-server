const router = require('koa-router')()
const materialController = require('../../controllers/data')

router.prefix('/api/materials')
router.get('/materialinfo', materialController.materialinfo)
router.post('/postmaterial', materialController.postmaterial)
router.post('/findmaterial', materialController.findmaterial)


module.exports = router

