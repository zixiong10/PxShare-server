const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const session = require('koa-session')

const index = require('./routes/index')
const users = require('./routes/users')
const data = require('./routes/data')
const course = require('./routes/course')
const stars = require('./routes/api/stars')
const buy = require('./routes/buy')
const buys = require('./routes/api/buys')
const records = require('./routes/api/records')
const reminds = require('./routes/api/reminds')
const kindcourses = require('./routes/api/kindcourse')
const uploadmaterials = require('./routes/api/uploadmaterials')
const publish = require('./routes/publish')
const user = require('./routes/api/users')
const publishs = require('./routes/api/publishs')
const materials = require('./routes/api/materials')
const courses = require('./routes/api/courses')
const log4js = require('./util/log4j')
const errorhandle = require('./middlewares/error')
// const koaBody = require('koa-body')({
//   multipart: true,  // 允许上传多个文件
// });
const passport = require('./util/passport')
const cors = require('./config/cors_config')

// error handler
onerror(app)

app.keys = ['this is my secret set'];

app.use(session({
  key: 'koa:sess', /** cookie的名称，可以不管 */
  maxAge: 7200000, /** (number) maxAge in ms (default is 1 days)，cookie的过期时间，这里表示2个小时 */
  overwrite: true, /** (boolean) can overwrite or not (default true) */
  httpOnly: true, /** (boolean) httpOnly or not (default true) */
  signed: true, /** (boolean) signed or not (default true) */
},app));

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text'],
  extended:false
}))
// app.use(koaBody)
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  // extension: 'ejs'
  map:{html:'ejs'}
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  // console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
  log4js.resLogger(ctx,ms);
})


app.use(passport.initialize())
app.use(passport.session())

app.use(cors)


// routes
app.use(index.routes(),  index.allowedMethods())
app.use(users.routes(),  users.allowedMethods())
app.use(user.routes(),   user.allowedMethods())
app.use(data.routes(),   data.allowedMethods())
app.use(course.routes(), course.allowedMethods())
app.use(buy.routes(),    buy.allowedMethods())
app.use(buys.routes(),    buys.allowedMethods())
app.use(stars.routes(),    stars.allowedMethods())
app.use(publish.routes(), publish.allowedMethods())
app.use(publishs.routes(), publishs.allowedMethods())
app.use(kindcourses.routes(), kindcourses.allowedMethods())
app.use(uploadmaterials.routes(), uploadmaterials.allowedMethods())
app.use(records.routes(), records.allowedMethods())
app.use(reminds.routes(), reminds.allowedMethods())
app.use(materials.routes(), materials.allowedMethods())
app.use(courses.routes(),   courses.allowedMethods())

app.use(errorhandle);

// error-handling
app.on('error', (err, ctx) => {
  log4js.errLogger(ctx, err)
  console.error('server error', err, ctx)
});

module.exports = app
