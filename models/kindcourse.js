module.exports = function(sequelize,DataTypes){
    return sequelize.define(
        'kindcourse',
        {
            id:{
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
           
            kind:{
                type: DataTypes.STRING,
                field: 'kind'
            },
          
            kindcourse:{
                type: DataTypes.STRING,
                field: 'kindcourse'
            },
            picture:{
                type: DataTypes.STRING,
                field: 'picture'
            },
        }
    );
}