const router = require('koa-router')()
const courseController = require('../../controllers/course')

router.prefix('/api/courses')
router.get('/courseinfo', courseController.courseinfo)
router.post('/searchCourse', courseController.searchCourse)
router.post('/foundcourse', courseController.foundcourse)
router.post('/findcourse', courseController.findcourse)
router.post('/postcourse', courseController.postcourse)


module.exports = router
