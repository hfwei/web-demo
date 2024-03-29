import http from "@/utils/http";

// 生成验证码

export function generateCode() {
    return http.get("/user/generate-verification-code", null, "arraybuffer");
}

// 校验验证码
export function verifyCode(params) {
    return http.get("/user/verify-code", params);
}

// 用户注册
export function register(params) {
    return http.post("/user/register", params);
}

// 用户登录
export function login(params) {
    return http.post("/user/login", params);
}

// 用户登出
export function logout(params) {
    return http.post("/user/logout", params);
}