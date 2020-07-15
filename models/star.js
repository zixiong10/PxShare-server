module.exports = function(sequelize,DataTypes){
    return sequelize.define(
        'star',
        {
            id:{
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            star_id:{
                type: DataTypes.INTEGER,
                field: 'star_id'
            },
            status:{
                type: DataTypes.INTEGER,
                field: 'status'
            },
            money:{
                type: DataTypes.INTEGER,
                field: 'money'
            },
            user_name:{
                type: DataTypes.STRING,
                field: 'user_name'
            },
            picture:{
                type: DataTypes.STRING,
                field: 'picture'
            },
            author:{
                type:DataTypes.STRING,
                field:'author'
            }
        }
    );
}