import sequelize from "./db";
import { DataTypes } from "sequelize";
import Comment from "./comments"
import Category from "./category"


const Blog:any = sequelize.define('Blog', {
  // 在这里定义模型属性
  title: {                //文章标题
    type: DataTypes.STRING,
    allowNull: false
  },
  content: {              //文章内容
    type: DataTypes.TEXT,
    allowNull: false
    // allowNull 默认为 true
  },
  metaDescription: {       //文章描述
    type: DataTypes.TEXT,
    allowNull: false
  }
}, {
  // 这是其他模型参数
});


export default Blog;