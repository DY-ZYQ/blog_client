
import "./users"
import "./comments"
import "./category"
import "./bolgs"
import sequelize from "./db";
import "./relations"
import "./iconSrc"

sequelize.sync({ alter: true });