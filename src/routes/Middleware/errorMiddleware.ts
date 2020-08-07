//处理错误的中间件

export default function (error: any, req: any, res: any, next: any) {
    if (error) {
        res.status(500).send({
            code: 500,
            msg: error.message
        })
    } else {
        next()
    }
}