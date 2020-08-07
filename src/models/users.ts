import sequelize from "./db";
import { DataTypes } from "sequelize";
import Comment from "./comments"


const User: any = sequelize.define('User', {
    // 在这里定义模型属性   
    username: {                //用户名
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {                 //用户密码
        type: DataTypes.STRING,
        allowNull: false
    },
    isAdmin: {
        type: DataTypes.BOOLEAN,     //是否是管理员 1是管理员 0不是管理员
        allowNull: false
    }

}, {
    // 这是其他模型参数
});


export default User;