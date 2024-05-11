/**
 * @description 获取vite环境变量
 * @returns vite环境变量值
 */
export function getAppEnv() {
    return import.meta.env
}

/**
 * 休眠函数
 * @param s 休眠秒数
 * @returns Promise<void>
 */
export function sleep(s: number) {
    return new Promise((resolve: any) => {
        setTimeout(() => {
            resolve()
        }, s * 1000)
    })
}
