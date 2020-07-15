const router = require('koa-router')()
const uploadmaterialController = require('../../controllers/uploadmaterial')


router.prefix('/api/uploadmaterials')
router.post('/uploadmaterialinfo', uploadmaterialController.uploadmaterialinfo)
router.post('/postuploadmaterial', uploadmaterialController.postuploadmaterial)
router.post('/delect', uploadmaterialController.delect)


module.exports = router