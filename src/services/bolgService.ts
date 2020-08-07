import blog from "../models/bolgs"
import category from "../models/category"
import "../models/relations"

interface BlogTypes {
    title: string
    content: string
    metaDescription: string
    CategoryId: number
}

export async function addBlog(obj: BlogTypes) {         //添加一个一个博客
    return await blog.create(obj)
}

export async function deleteBlog(blogId: string) {      //删除一个博客
    return await blog.destroy({
        where: {
            id: blogId
        }
    })
}

export async function findOneBlog(blogId: string) {           //查询某一个博客
    return await blog.findAll({
        include: category,
        where: {
            id: blogId
        }
    })
}

export async function findBlogList() {           //查询博客列表（后台管理）
    return await blog.findAll({
        include: category,
        attributes: ['title', "id"]
    })
}


export async function findBlogListPage(pageSize: number, currentPage: number) {           //分页查询全部博客列表（前台）
    return await blog.findAndCountAll({
        include: category,
        attributes: ['title', "id", "createdAt", "updatedAt", "metaDescription"],
        limit: pageSize,
        offset: pageSize * (currentPage - 1)
    })
}


export async function findBlogCategoryListPage(pageSize: number, currentPage: number, categoryId: number) {           //分页查询分类博客列表（前台）
    return await blog.findAndCountAll({
        include: category,
        attributes: ['title', "id", "createdAt", "updatedAt", "metaDescription"],
        limit: pageSize,
        offset: pageSize * (currentPage - 1),
        where: {
            CategoryId: categoryId
        }
    })
}





