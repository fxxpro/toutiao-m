import request from '@/utils/request'
// 获取搜索联想建议
export const getSearchSuggestions = (q) => {
    return request({
        method: 'GET',
        url: '/app/v1_0/suggestion',
        params: {
            q
        }
    })
}
// 获取搜索结果数据
export const getSearchResults = (params) => {
    return request({
        method: 'GET',
        url: '/app/v1_0/search',
        params
    })
}
// 获取搜索历史数据
export const getSearchHistorys = () => {
    return request({
        method: 'GET',
        url: '/app/v1_0/search/histories',
    })
}

// 删除全部历史记录
export const deleteAllHistories = () => {
    return request({
        method: 'DELETE',
        url: '/app/v1_0/search/histories',
    })
}