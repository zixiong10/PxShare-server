module.exports = function(sequelize,DataTypes){
    return sequelize.define(
        'uploadmaterial',
        {
            id:{
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
           
            material_id:{
                type: DataTypes.INTEGER,
                field: 'material_id'
            },
          
            user_name:{
                type: DataTypes.STRING,
                field: 'user_name'
            },
            picture:{
                type: DataTypes.STRING,
                field: 'picture'
            },
            kind:{
                type: DataTypes.STRING,
                field: 'kind'
            },
         
        }
    );
}