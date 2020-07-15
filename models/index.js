const config=require('../config/mysql_sequelize');
const Sequelize = config.sequelize //加载sequelize模块

//导入模型统一管理
const user = Sequelize.import(__dirname + '/user.js')
const data=Sequelize.import(__dirname+'/data.js')
const publish=Sequelize.import(__dirname+'/publish.js')
const buy=Sequelize.import(__dirname+'/buy.js')
// const allfood=Sequelize.import(__dirname+'/allfood.js')
//sequelize.import() - 模型导入:通过文件导入模型定义。检查模型是否已经定义。被导入的模型会被缓存，
//所以多次导入并不会重复加载,path表示要导入文件的路径，如果使用相对路径会自动转换为绝对路径。

//Sequelize 中的模型存在多种关系。在一个User.hasOne(Project)形式的调用中，
//正在调用的模型User是源模型而做为参数被传入的模型是目标模型。

//user user_roles 一对多
//创建当前模型（源）到目标模型之间的 1:m 的关系，外键会被添加到目标模型中。
// user.hasMany(food, { //user与user_roles建立一对多关联关系，关联关系的外键user_id存在于user_roles中
//     foreignKey:'user_id',
//     sourceKey: 'user_id'//sourceKey来指定源键，默认为主键,注意:sourceKey必须为数据库字段名，不能使用生成的驼峰式别名
// })


//创建当前模型（源）到目标模型之间的关系，外键会被添加到源模型中。
//targetKey可以用在关联中指定目标键，默认是关联另一张表的主键
// food.belongsTo(user, {//BelongsTo关联表示一对一关系的外键存在于源模型。
//     foreignKey: 'user_id',
//     targetKey: 'user_id'//用于关联目标表的字段名。默认为目标表的主键。
// })
// 一对多关系，一般是一个表的主键对应另一个表的非主键，主键的值是不能重复的，而非主键值是可以重复的
user.hasMany(data, {foreignKey:'id', sourceKey:'user_id'})
data.belongsTo(user, {foreignKey:'user_name', targetKey:'user_name'})


user.hasMany(publish, {foreignKey:'user_id', sourceKey:'user_id'})
publish.belongsTo(user, {foreignKey:'user_id', targetKey:'user_id'})


module.exports={user,data,publish,buy}