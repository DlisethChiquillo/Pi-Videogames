
const {DataTypes} = require('sequelize');

module.exports = (sequelize)=>{
    sequelize.define('genres',{
        id:{
            type:DataTypes.INTEGER,    //UUID,
            //defaultValue:DataTypes.UUIDV4,
            autoIncrement: true,
            primaryKey:true,
            unique: true
        },
        name:{
            type: DataTypes.STRING,
            allowNull: false,
        },
    },{timestamps: false}
    );
};