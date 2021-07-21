import http from '../utils/http'

// 用户注册
export function register(params) {
    return http.post(`/user/register`, params)
}

// 用户登录
export function login(params) {
    return http.post(`/user/login`, params)
}

// 用户登出
export function logout(params) {
    return http.post(`/user/logout`, params)
}