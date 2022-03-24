export const setToken = (el) => {
    localStorage.setItem('TOKEN', el)
}

export const getToken = () => {
    return localStorage.getItem('TOKEN')
}

export const removeToken = () => {
    localStorage.setItem('TOKEN','')
}

export const setrefreshToken = (el) => {
    localStorage.setItem('REF_TOKEN', el)
}

export const getrefreshToken = () => {
    return localStorage.getItem('REF_TOKEN')
}

export const removerefreshToken = () => {
    localStorage.removeItem('REF_TOKEN')
}