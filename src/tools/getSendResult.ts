//封装响应体消息格式

export function getError(errorMessage: string, errorCode: number) {
    return {
        code: errorCode,
        msg: errorMessage
    }
}

export function getResult(data: any) {
    if (typeof data === "string") {
        return {
            code: 0,
            msg: data
        }
    } else {
        return {
            code: 0,
            msg: "",
            data
        }
    }

}


