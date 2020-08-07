import jwt from "jsonwebtoken";

const secrect = "zhangyaqin";       //加密的密钥
const cookieKey = "token";

//颁发jwt
export let publish = function (res: any, info = {}) {
    const token = jwt.sign(info, secrect);
    //添加到cookie
    res.cookie(cookieKey, token, {
        path: "/"
    });
    //添加其他传输
    res.header("authorization", token);
};



//认证jwt
export let verify = function (req: any) {
    let token;
    //尝试从cookie中获取
    token = req.cookies[cookieKey]; //cookie中没有
    if (!token) {
        //尝试中header中
        token = req.headers.authorization;
        if (!token) {
            //没有token
            return null;
        }
        // authorization: bearer token
        token = token.split(" ");
        token = token.length === 1 ? token[0] : token[1];
    }
    try {
        const result = jwt.verify(token, secrect);
        return result as any;
    } catch (err) {
        return null;
    }
};
