import request from '@/utils/request'


// 用户登录
export const login = data => {
    return request({
        method: 'POST',
        url: '/app/v1_0/authorizations',
        data
    })
}

// 获取用户自己的信息
export const getUserInfo = () => {
    return request({
        method: 'GET',
        url: '/app/v1_0/user'


    })
}

// 获取用户的频道内容
export const getUserChannels = () => {
    return request({
        method: 'GET',
        url: '/app/v1_0/user/channels'
    })
}

// 关注用户
export const addFollow = (userId) => {
    return request({
        method: 'GET',
        url: '/app/v1_0/user/followings',
        data: {
            target: userId
        }
    })
}

// 取消关注用户
export const deleteFollow = (userId) => {
    return request({
        method: 'DELETE',
        url: `/app/v1_0/user/followings/${userId}`
    })
}
