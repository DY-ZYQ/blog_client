import express from "express"
import { getResult } from "../../tools/getSendResult"
import { findAllCategory, addCategory, deleteCategory, updateCategory, updateIconSrc, getIconSrc } from "../../services/categoryService"

const router = express.Router();
router.get("/", async (req, res) => {           //收到获取分类列表的请求
    let datas = await findAllCategory();
    let src = await getIconSrc();

    const result = JSON.parse(JSON.stringify(datas))
    result.forEach((item: any, index: any) => {
        item.key = index
    })
    let obj = { src, datas: result }
    res.send(JSON.stringify(getResult(obj)))
})


router.post("/", async (req, res) => {      //收到添加分类的请求
    const msg = await addCategory(req.body.data);
    const result = await updateIconSrc(req.body.src);
    if (msg && result) {
        res.send(JSON.stringify(getResult("添加成功")))
    }
})


router.delete("/", async (req, res) => {        //收到删除分类的请求
    const msg = await deleteCategory(req.query.id as string)
    if (msg == 1) {
        res.send(JSON.stringify(getResult("删除成功")))
    } else {
        res.send(JSON.stringify(getResult("这条数据不在数据库中")))
    }
})

router.put("/", async (req, res) => {       //收到修改分类的请求
    const msg = await updateCategory(req.body.data, req.body.id);
    const result = await updateIconSrc(req.body.src);
    if (msg[0] == 1 && result) {
        res.send(JSON.stringify(getResult("修改成功")))
    }
})



export default router; 