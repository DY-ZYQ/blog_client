import sequelize from "./db";
import { DataTypes } from "sequelize";
import User from "./users"
import Blog from "./bolgs"


const Comment:any = sequelize.define('Comment', {
    // 在这里定义模型属性
    content: {              //评论的内容
        type: DataTypes.STRING,
        allowNull: false
    }

}, {
    // 这是其他模型参数
});


export default Comment;