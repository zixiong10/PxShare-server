module.exports = function(sequelize,DataTypes){
    return sequelize.define(
        'record',
        {
            id:{
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            record_date:{
                type: DataTypes.STRING,
                field: 'record_date'
            },
            status:{
                type: DataTypes.INTEGER,
                field: 'status'
            },
          
            user_name:{
                type: DataTypes.STRING,
                field: 'user_name'
            },
            text:{
                type: DataTypes.STRING,
                field: 'text'
            },
        }
    );
}