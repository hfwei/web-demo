// 导入封装好的axios实例
import request from './request'

const http = {
    /**
     * methods: 请求
     * @param url 请求地址
     * @param params 请求参数
     * @param responseType 响应类型
     */
    get(url, params, responseType) {
        const config = {
            method: 'get',
            url: url
        };
        if (params) config.params = params;
        if (responseType) config.responseType = responseType;
        return request(config);
    },
    post(url, params, responseType) {
        const config = {
            method: 'post',
            url: url
        }
        if (params) config.data = params;
        if (responseType) config.responseType = responseType;
        return request(config);
    },
    put(url, params) {
        const config = {
            method: 'put',
            url: url
        }
        if (params) config.params = params
        return request(config)
    },
    delete(url, params) {
        const config = {
            method: 'delete',
            url: url
        }
        if (params) config.params = params
        return request(config)
    }
}
//导出
export default http