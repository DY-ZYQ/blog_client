
import Comment from "../models/comments"

interface CommentType {
    content: string,
    UserId: string,
    BlogId: string
}


export async function addComment(obj: CommentType) {         //添加一个评论
    return await Comment.create(obj)
}

export async function deleteComment(commentId: string) {        //删除一条评论
    const result = await Comment.destroy({
        where: {
            id: commentId,
        },
    });
    return result;
}

export async function getCommentByBlog(blogId: string) {        //查询某一个博客的全部评论
    return await Comment.findAll({
        where: {
            BlogId: blogId
        }
    })
}