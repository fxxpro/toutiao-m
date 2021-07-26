import request from '../utils/request'

// 请求文章列表数据
export const getArticle = (params) => {
    return request({
        method: 'GET',
        url: '/app/v1_1/articles',
        params
    })
}

// 请求文章列表数据
export const getArticleById = (articleId) => {
    return request({
        method: 'GET',
        url: `/app/v1_0/articles/${articleId}`,
    })
}

// 收藏文章
export const addCollect = (articleId) => {
    return request({
        method: 'POST',
        url: `/app/v1_0/article/collections`,
        data: {
            target: articleId
        }
    })
}

// 取消文章
export const deleteCollect = (articleId) => {
    return request({
        method: 'DELETE',
        url: `/app/v1_0/article/collections/${articleId}`,
    })
}

// 对文章点赞
export const addLike = (articleId) => {
    return request({
        method: 'POST',
        url: `/app/v1_0/article/likings`,
        data: {
            target: articleId
        }
    })
}

// 取消对文章点赞
export const deleteLike = (articleId) => {
    return request({
        method: 'DELETE',
        url: `/app/v1_0/article/likings/${articleId}`,
    })
}