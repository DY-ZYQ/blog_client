import express from "express"
import multer from "multer"
import { addBlog, deleteBlog, findOneBlog, findBlogList, findBlogListPage, findBlogCategoryListPage } from "../../services/bolgService"
import { getResult } from "../../tools/getSendResult"
import marked from "marked"


const router = express.Router();
var upload = multer()

router.post("/", upload.single('blog'), async (req, res: any) => {        //收到添加博客的请求
    const obj = {
        ...req.body,
        content: req.file.buffer.toString()
    }

    obj.CategoryId = parseInt(obj.CategoryId)
    const result = await addBlog(obj);
    if (result) {
        res.send(JSON.stringify(getResult("添加成功")))
    }
})

router.get("/", async (req, res) => {             //收到获取某一个博客的请求
    let result;
    if (typeof req.query.id === "string") {
        result = await findOneBlog(req.query.id)
    }
    let result1 = JSON.parse(JSON.stringify(result[0]));
    result1.content = marked(JSON.parse(JSON.stringify(result[0])).content);
    res.send(JSON.stringify(getResult(result1)))

})

router.get("/list", async (req, res) => {           //收到获取博客列表的请求（后台管理）
    let result = await findBlogList()
    res.send(JSON.stringify(getResult(result)))
})

router.delete("/", async (req, res) => {             //收到请求删除某一个博客的请求
    let result;
    if (typeof req.query.id === "string") {
        result = await deleteBlog(req.query.id)
    }
    if (result) {
        res.send(JSON.stringify(getResult("删除成功")))
    } else {
        res.send(JSON.stringify(getResult("删除的数据不存在")))
    }

})

router.get("/list/page", async (req, res) => {           //收到获取全部博客列表的请求（前台页面）
    let result
    if (req.query.limit && req.query.page) {
        result = await findBlogListPage(+req.query.limit, +req.query.page)
    }
    res.send(JSON.stringify(getResult(result)))
})

router.get("/list/category/page", async (req, res) => {           //收到获取分类博客列表的请求（前台页面）
    let result
    if (req.query.limit && req.query.page && req.query.categoryId) {
        result = await findBlogCategoryListPage(+req.query.limit, +req.query.page, +req.query.categoryId)
    }
    res.send(JSON.stringify(getResult(result)))
})






export default router; 