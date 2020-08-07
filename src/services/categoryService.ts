import Category from "../models/category"
import IconSrc from "../models/iconSrc"

interface CategoryType {
    name: string
    icon: string
}

export async function addCategory(obj: CategoryType) {         //添加一个分类
    return await Category.create(obj)
}


export async function deleteCategory(categoryId: string) {      //删除一个种类
    return Category.destroy({
        where: {
            id: categoryId
        }
    })
}

export async function updateCategory(obj: CategoryType, categoryId: string) {     //修改一个种类
    return Category.update(obj, {
        where: {
            id: categoryId
        }
    })
}

export async function findAllCategory() {           //查询全部种类
    return await Category.findAll()
}

export async function findOneCategory(categoryId: string) {      //查询一个种类
    return await Category.findAll({
        where: {
            id: categoryId
        }
    })
}

export async function updateIconSrc(src: string) {      //修改图标地址
    return await IconSrc.update({ source: src }, {
        where: {
            id: 1
        }
    })
}

export async function getIconSrc() {        //获取图标地址
    return await IconSrc.findOne({
        where: {
            id: 1
        }
    })

}

