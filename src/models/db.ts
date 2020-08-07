import { Sequelize } from "sequelize";

const sequelize = new Sequelize('blog', 'root', 'zyq783497686', {
    host: 'localhost',
    dialect: "mysql",
    logging: undefined
});

export default sequelize;