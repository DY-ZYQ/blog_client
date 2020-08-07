import sequelize from "./db";
import { DataTypes } from "sequelize";



const iconSrc: any = sequelize.define('iconSrc', {
    source: {                //地址
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    // 这是其他模型参数
});


export default iconSrc;