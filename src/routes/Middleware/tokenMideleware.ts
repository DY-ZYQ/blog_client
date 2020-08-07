import { getError } from "../../tools/getSendResult"
import { pathToRegexp } from "path-to-regexp"
import { verify } from "../../tools/jwt"

const needTokenApi = [
    { method: "POST", path: "/api/type" },
    { method: "DELETE", path: "/api/type" },
    { method: "PUT", path: "/api/type" },
    { method: "POST", path: "/api/blog" },
    { method: "DELETE", path: "/api/blog" },
    { method: "GET", path: "/api/user/whoami" },
    { method: "DELETE", path: "/api/user" },
    { method: "GET", path: "/api/user" },
    { method: "POST", path: "/api/comment" },
    { method: "DELETE", path: "/api/comment" },
];

//处理没有认证的情况
function handleNonToken(req: any, res: any, next: any) {
    res
        .status(403)
        .send(getError("you dont have any token to access the api", 403));
}


// 用于解析token
export default (req: any, res: any, next: any) => {
    const apis = needTokenApi.filter((api) => {
        const reg = pathToRegexp(api.path);
        return api.method === req.method && reg.test(req.path);
    });
    if (apis.length === 0) {
        next();
        return;
    }
    const result = verify(req);
    if (result) {
        //如果result.isAdmin为true，所有的权限全部都能通过，如果不为true，则只能通过评论功能
        if (result.isAdmin) {
            req.userId = result.id;
            next();
        } else {
            if (apis[0].path == "/api/user/whoami" || apis[0].path == "/api/comment") {
                req.userId = result.id;
                next()
            } else {
                handleNonToken(req, res, next);
            }

        }
    } else {
        //认证失败
        handleNonToken(req, res, next);
    }
};

