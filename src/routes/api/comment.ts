import express from "express"
import { getResult } from "../../tools/getSendResult"
import { addComment, deleteComment, getCommentByBlog } from "../../services/commentService"

const router = express.Router();

router.get("/", async (req, res) => {           //收到获取评论列表的请求
    let datas = await getCommentByBlog(req.query.blogId as string);
    res.send(JSON.stringify(getResult(datas)))
})


router.post("/", async (req, res) => {      //收到添加评论的请求
    console.log(req.body)
    const msg = await addComment(req.body);
    if (msg) {
        res.send(JSON.stringify(getResult("添加成功")))
    }
})


router.delete("/", async (req, res) => {        //收到删除评论的请求
    const msg = await deleteComment(req.query.id as string)
    if (msg == 1) {
        res.send(JSON.stringify(getResult("删除成功")))
    } else {
        res.send(JSON.stringify(getResult("这条数据不在数据库中")))
    }
})



export default router; 