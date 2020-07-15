module.exports = function(sequelize,DataTypes){
    return sequelize.define(
        'remind',
        {
            id:{
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
           
            status:{
                type: DataTypes.INTEGER,
                field: 'status'
            },
          
            user_name:{
                type: DataTypes.STRING,
                field: 'user_name'
            },
         
        }
    );
}