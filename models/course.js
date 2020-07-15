var moment = require('moment');
module.exports = function(sequelize,DataTypes){
    return sequelize.define(
        'course',
        {
            id:{
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            money:{
                type: DataTypes.INTEGER,
                field: 'money'
            },
            kindchild:{
                type: DataTypes.STRING,
                field: 'kindchild'
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
            type:{
                type: DataTypes.STRING,
                field: 'type'
            },
            introduce:{
                type: DataTypes.STRING,
                field: 'introduce'
            },
            check_time:{
                type: DataTypes.DATE,
                field: 'check_time',
                get() {
                    return moment(this.getDataValue('check_time')).format('YYYY-MM-DD HH:mm');
                }
            },
            status:{
                type: DataTypes.STRING,
                field: 'status'
            },
            check_people:{
                type: DataTypes.STRING,
                field: 'check_people'
            },
            text:{
                type:DataTypes.TEXT,
                fie:'text'
            }
        } 
    );
}
