import user from "../models/users"

interface UsersType {
    username: string
    password: string
    isAdmin: boolean
}


export async function addUser(obj: UsersType) {         //添加一个用户
    return await user.create(obj)
}

export let deleteUser = async function (userId: string) {  //删除一个用户
    const result = await user.destroy({
        where: {
            id: userId,
        },
    });
    return result;
};

export let updateUser = async function (userId: string, obj: UsersType) {      //修改一个用户

    const result = await user.update(obj, {
        where: {
            id: userId,
        },
    });
    return result;
};

export let login = async function (username: string, password: string) {       //登录
    const result = await user.findOne({
        where: {
            username,
            password
        },
    });
    if (result && result.username === username) {
        return result;
    }
    return null;
};

export let getAllUsers = async function () {       //获取全部用户列表
    const result = await user.findAll();
    return result;
};

export let getOneUser = async function (id: string) {       //查询某一个用户通过id
    //查询某一个用户
    return await user.findOne({
        where: {
            id
        }
    })

}
