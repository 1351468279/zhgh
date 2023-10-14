import { useMemberStore } from "@/store/modules/member"

// 请求基地址
export const baseURL = 'http://192.168.0.53:8081/gh'

// 拦截器配置
const httpInterceptor = {
    // 拦截前触发
    invoke(options: UniApp.RequestOptions) {
        // 1. 非 http 开头需拼接地址
        if (!options.url.startsWith('http')) {
            options.url = baseURL + options.url
        }
        // 2. 请求超时
        options.timeout = 10000
        // 3. 添加小程序端请求头标识
        options.header = {
            'source-client': 'miniapp',
            ...options.header,
        }
        // 4. 添加 token 请求头标识
        const memberStore = useMemberStore()
        const token = memberStore.profile?.token
        if (token) {
            options.header.token = token
        }
        // 5. 添加 cookie 请求头标识
        const sessionid = uni.getStorageSync('sessionid')
        if (sessionid) {
            options.header.cookie = sessionid
        }
    },
}

// 拦截 request 请求
uni.addInterceptor('request', httpInterceptor)
// 拦截 uploadFile 文件上传
uni.addInterceptor('uploadFile', httpInterceptor)


/**
 * 请求函数
 * @param  UniApp.RequestOptions
 * @returns Promise
 *  1. 返回 Promise 对象，用于处理返回值类型
 *  2. 获取数据成功
 *    2.1 提取核心数据 res.data
 *    2.2 添加类型，支持泛型
 *  3. 获取数据失败
 *    3.1 401错误  -> 清理用户信息，跳转到登录页
 *    3.2 其他错误 -> 根据后端错误信息轻提示
 *    3.3 网络错误 -> 提示用户换网络
 */
type Data<T> = {
    code: Number
    msg: string
    data: T
}
// 2.2 添加类型，支持泛型
export const http = <T>(options: UniApp.RequestOptions) => {
    // 1. 返回 Promise 对象
    return new Promise<Data<T>>((resolve, reject) => {
        uni.request({
            ...options,
            // 响应成功
            success(res) {
                // 状态码 2xx，参考 axios 的设计
                if (res.statusCode >= 200 && res.statusCode < 300) {
                    console.log(res)
                    // 如果响应头里面有Set-Cookie，就把cookie存到storage里面
                    if (res.header['Set-Cookie']) {
                        console.log('Set-Cookie', res.header['Set-Cookie'])
                        // 清除本地的sessionid
                        uni.removeStorageSync('Set-Cookie')
                        uni.setStorageSync('sessionid', res.header['Set-Cookie'])
                    }
                    // 2.1 提取核心数据 res.data
                    resolve(res.data as Data<T>)
                } else if (res.statusCode === 401) {
                    // 401错误  -> 清理用户信息，跳转到登录页
                    const memberStore = useMemberStore()
                    memberStore.clearProfile()
                    uni.navigateTo({ url: '/pages/login/login' })
                    reject(res)
                } else {
                    // 其他错误 -> 根据后端错误信息轻提示
                    uni.showToast({
                        icon: 'none',
                        title: (res.data as Data<T>).msg || '请求错误',
                    })
                    reject(res)
                }
            },
            // 响应失败
            fail(err) {
                uni.showToast({
                    icon: 'none',
                    title: '网络错误，换个网络试试',
                })
                reject(err)
            },
        })
    })
}
type requestData<T> = {
    flag: boolean
    body?: T
    errorMessage?: {
        errorCode?: string
    }
}
export const request = <T>(options: UniApp.RequestOptions) => {
    // 1. 返回 Promise 对象
    return new Promise<requestData<T>>((resolve, reject) => {
        uni.request({
            ...options,
            // 响应成功
            success(res) {
                // 状态码 2xx，参考 axios 的设计
                if (res.statusCode >= 200 && res.statusCode < 300) {
                    console.log(res)
                    // 如果响应头里面有Set-Cookie，就把cookie存到storage里面
                    if (res.header['Set-Cookie']) {
                        console.log('Set-Cookie', res.header['Set-Cookie'])
                        // 清除本地的sessionid
                        uni.removeStorageSync('Set-Cookie')
                        uni.setStorageSync('sessionid', res.header['Set-Cookie'])
                    }
                    // 2.1 提取核心数据 res.data
                    resolve(res.data as requestData<T>)
                } else if (res.statusCode === 401) {
                    // 401错误  -> 清理用户信息，跳转到登录页
                    const memberStore = useMemberStore()
                    memberStore.clearProfile()
                    uni.navigateTo({ url: '/pages/login/login' })
                    reject(res)
                } else {
                    // 其他错误 -> 根据后端错误信息轻提示
                    uni.showToast({
                        icon: 'none',
                        title: (res.data as requestData<T>).errorMessage?.errorCode || '请求错误',
                    })
                    reject(res)
                }
            },
            // 响应失败
            fail(err) {
                uni.showToast({
                    icon: 'none',
                    title: '网络错误，换个网络试试',
                })
                reject(err)
            },
        })
    })
}