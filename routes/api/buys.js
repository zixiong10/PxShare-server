const router = require('koa-router')()
const buyController = require('../../controllers/buy')

router.prefix('/api/buys')

router.post('/buyinfo', buyController.buyinfo)

router.post('/postbuy', buyController.postbuy)

router.post('/delectbuy', buyController.delectbuy)  

module.exports = router
