import express from "express"
import errorMiddleware from "./Middleware/errorMiddleware"
import path from "path"
import blogRouter from "./api/bolg"
import categoryRouter from "./api/category"
import userRouter from "./api/user"
import commentRouter from "./api/comment"
import cookieParser from "cookie-parser"
import tokenMiddleware from "./Middleware/tokenMideleware"
var multer = require('multer')

const staticURL = path.resolve(__dirname, "../../public");       //静态资源的路径
const htmlPath = path.resolve(__dirname, "../../public/index.html");    //html资源的路径
const uploadPath = path.resolve(__dirname, "../../uploads");       //上传文件存储路径


const app = express();
var storage = multer.diskStorage({
    destination: function (req: any, file: any, cb: (arg0: null, arg1: string) => void) {
        cb(null, uploadPath)
    },
    filename: function (req: any, file: any, cb: (arg0: null, arg1: string) => void) {
        const timeStamp = Date.now();
        const ramdomStr = Math.random().toString(36).slice(-6);
        const ext = path.extname(file.originalname);
        const filename = `${timeStamp}-${ramdomStr}${ext}`;
        cb(null, filename);
    }
})

var upload = multer({ storage: storage })

app.use(cookieParser())  //加入这个中间件后，会在req中加入cookie属性用于获取所有请求过来的cookies，会在res中注入cookie方法，用于设置cookie
app.use(tokenMiddleware)              //处理token验证的中间件
app.use(express.static(staticURL))              //托管静态资源
app.use(express.urlencoded({ extended: true }))  //把application/x-www-form-urlencoded格式的消息体解析成字符串，并且我们可以直接访问
app.use(express.json())                          //把json格式的消息体解析成对象并且我们可以直接访问


app.use("/api/blog", blogRouter)             //托管博客的处理
app.use("/api/type", categoryRouter)             //托管分类的处理
app.use("/api/user", userRouter)            //托管用户的处理
app.use("/api/comment", commentRouter)      //托管评论的处理
app.post("/api/upload", upload.single("img"), (req, res) => {       //处理上传图片
    const url = `/upload/${req.file.filename}`;
    res.send({
        code: 0,
        msg: "",
        data: url,
    });
});

app.use(errorMiddleware);       //错误处理中间件



app.get("*", (req, res) => {        //匹配任何路径都返回html页面
    res.sendFile(htmlPath)
})

app.listen("8081", () => {
    console.log("服务器已启动")
})
