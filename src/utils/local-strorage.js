export const addToLocalStorage = (key, value) =>  {
    return new Promise((resolve, reject) => {
        try {
            let strValue = JSON.stringify(value)
            localStorage.setItem(key, strValue)
            return resolve()
        } catch (error) {
            return reject(error)
        }
    })
}

export const getFromLocalStorage = (key) => {
    let strVal = localStorage.getItem(key)
    if (strVal == null) {
        return null
    }
    return JSON.parse(strVal)
}