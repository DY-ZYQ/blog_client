import sequelize from "./db";
import { DataTypes, Model } from "sequelize";
import Blog from "./bolgs"

interface MyModel extends Model {
    name: string;
}

const Category: any = sequelize.define('Category', {
    // 在这里定义模型属性
    name: {                //类型种类
        type: DataTypes.STRING,
        allowNull: false
    },
    icon: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    // 这是其他模型参数
});


export default Category;