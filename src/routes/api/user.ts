import express from "express"
import { getResult } from "../../tools/getSendResult"
import { publish } from "../../tools/jwt"
import { login, getOneUser, addUser, getAllUsers, deleteUser } from '../../services/userService'
const router = express.Router();

router.post("/login", async (req, res) => {       //登录
    let result = await login(req.body.username, req.body.password);
    result = JSON.parse(JSON.stringify(result))
    if (result) {
        //登录成功
        publish(res, { isAdmin: result.isAdmin, id: result.id });
        res.send(JSON.stringify(getResult(result)));
    } else {
        res.send(JSON.stringify(getResult("登录失败")));
    }
})


router.get("/whoami", async (req: any, res) => {        //得到已经登录的用户的信息
    let result = await getOneUser(req.userId);
    res.send(JSON.stringify(getResult(result)));
})

router.post("/register", async (req: any, res: any) => {        //注册
    let result = await addUser(req.body);
    if (result) {
        res.send(JSON.stringify(getResult("注册成功")));
    } else {
        res.send(JSON.stringify(getResult("注册失败")))
    }
})

router.get("/", async (req: any, res: any) => {     //获取全部用户列表
    let datas = await getAllUsers();
    res.send(JSON.stringify(getResult(datas)))
})

router.delete("/", async (req, res) => {        //收到删除评论的请求
    const msg = await deleteUser(req.query.id as string)
    if (msg == 1) {
        res.send(JSON.stringify(getResult("删除成功")))
    } else {
        res.send(JSON.stringify(getResult("这条数据不在数据库中")))
    }
})

export default router; 