import axios from 'axios'
import store from '../store/index'
import JSONbig from 'json-bigint'
const request = axios.create({
    baseURL: 'http://ttapi.research.itcast.cn/',
    transformResponse: [
        function (data) {
            try {
                return JSONbig.parse(data)
            } catch (error) {
                // console.log('转换失败', error);
                return data
            }
        }
    ]
})

request.interceptors.request.use((config) => {
    const { user } = store.state
    // console.log(config);
    if (user) {
        config.headers.authorization = `Bearer ${user.token}`
    }
    return config
})

export default request