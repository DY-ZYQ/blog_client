import Blog from "./bolgs"
import User from "./users"
import Comment from "./comments"
import Category from "./category"

User.hasMany(Comment);
Category.hasMany(Blog);
Blog.hasMany(Comment);

Comment.belongsTo(User);
Blog.belongsTo(Category);
Comment.belongsTo(Blog);
