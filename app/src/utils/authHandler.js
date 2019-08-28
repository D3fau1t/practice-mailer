import jwtDecode from 'jwt-decode'

export default (token) => {
    if (token) {
        const decodedToken = jwtDecode(token)
        if (decodedToken.exp * 1000 < Date.now()) {
            localStorage.removeItem("user")
            return false
        } else {
            return true
        }   
    } else {
        return false
    }
}