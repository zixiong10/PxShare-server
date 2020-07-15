const router = require('koa-router')()
const recordController = require('../../controllers/record')


router.prefix('/api/records')
router.post('/recordinfo', recordController.recordinfo)
router.post('/postrecord', recordController.postrecord)
router.post('/delectrecord',    recordController.delectrecord) 
router.post('/alldelect',    recordController.alldelect) 

module.exports = router
