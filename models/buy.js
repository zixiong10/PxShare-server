var moment = require('moment');
module.exports = function(sequelize,DataTypes){
    return sequelize.define(
        'buy',
        {
            id:{
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            buy_id:{
                type: DataTypes.INTEGER,
                field: 'buy_id'
            },
            money:{
                type: DataTypes.INTEGER,
                field: 'money'
            },
            picture:{
                type: DataTypes.STRING,
                field: 'picture'
            },
            kind:{
                type: DataTypes.STRING,
                field: 'kind'
            },
            user_name:{
                type: DataTypes.STRING,
                field: 'user_name'
            },
            author:{
                type: DataTypes.STRING,
                field: 'author'
            },
           
            introduce:{
                type: DataTypes.STRING,
                field: 'introduce'
            },
            buy_time:{
                type: DataTypes.DATE,
                field: 'buy_time',
                get() {
                    return moment(this.getDataValue('buy_time')).format('YYYY-MM-DD HH:mm');
                }
            },
            status:{
                type: DataTypes.STRING,
                field: 'status'
            },
           
        } 
    );
}
