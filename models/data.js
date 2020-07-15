var moment = require('moment');
module.exports = function(sequelize,DataTypes){
    return sequelize.define(
        'data',
        {
            id:{
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
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
          
        } 
    );
}
