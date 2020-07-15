module.exports = function(sequelize,DataTypes){
    return sequelize.define(
        'user',
        {
            id:{
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            user_id:{
                type: DataTypes.STRING,
                field: 'user_id'
            },
            password:{
                type: DataTypes.STRING,
                field: 'password'
            },
            user_name:{
                type: DataTypes.STRING,
                field: 'user_name'
            },
            solt:{
                type: DataTypes.STRING,
                field: 'solt'
            },
            role:{
                type: DataTypes.STRING,
                field: 'role'
            },
            qianming: {
                type: DataTypes.STRING,
                field: 'qianming'
            },
            user_photo: {
                type: DataTypes.STRING,
                field: 'user_photo'
            },
            cash:{
                type: DataTypes.FLOAT,
                field: 'cash'
            },
            gold:{
                type: DataTypes.FLOAT,
                field: 'gold'
            },
            benefit:{
                type: DataTypes.INTEGER,
                field: 'benefit'
            },
        } 
    );
}

