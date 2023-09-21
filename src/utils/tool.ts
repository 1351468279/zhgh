export const translateTime = (time: string) => {
    const date = new Date(time)
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()
    // return `${year}-${month}-${day} ${hour}:${minute}:${second}`
    return `${year}-${month <= 9 ? '0' + month : month}-${day <= 9 ? '0' + day : day}`
}