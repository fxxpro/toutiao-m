import request from '../utils/request'

// 获取用户频道列表数据
export const getAllChannels = () => {
    return request({
        url: '/app/v1_0/channels'
    })
}
//添加用户频道列表数据
export const addChannels = (data) => {
    return request({
        url: '/app/v1_0/user/channels',
        method: 'PATCH',
        data
    })
}
//删除用户频道列表数据
export const deleteChannels = (data) => {
    return request({
        url: `/app/v1_0/user/channels/${data}`,
        method: 'DELETE',
    })
}