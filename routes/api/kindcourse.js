const router = require('koa-router')()
const kindcourseController = require('../../controllers/kindcourse')

router.prefix('/api/kindcourses')
router.get('/kindcourseinfo', kindcourseController.kindcourseinfo)


module.exports = router