var moment = require('moment');
module.exports = function(sequelize,DataTypes){
    return sequelize.define(
        'publish',
        {
            id:{
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            user_id:{
                type: DataTypes.INTEGER,
                field: 'user_id'
            },
         
            publish:{
                type: DataTypes.STRING,
                field: 'publish'
            },
            date:{
                type: DataTypes.DATE,
                field: 'date',
                get() {
                    return moment(this.getDataValue('date')).format('YYYY-MM-DD HH:mm');
                }
            },
             location:{
                type: DataTypes.STRING,
                field: 'location'
            },
            user_photo:{
                type: DataTypes.STRING,
                field: 'user_photo'
            },
        } 
    );
}