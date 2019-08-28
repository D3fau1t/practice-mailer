import axios from 'axios'
import { SET_USER, SET_ERRORS, CLEAR_ERRORS, LOADING_UI, SET_AUTHENTICATED } from '../types'
import isEmptyString from '../../utils/isEmptyString'
import isEmail from '../../utils/isEmail'

export const loginAction = (userData) => (dispatch) => {
    dispatch({
        type: LOADING_UI,
        payload: true
    })
    let errors = false

    if (isEmptyString(userData.email)) {
        dispatch({
            type: SET_ERRORS,
            payload: {loginEmail: "Enter your email"}
        })
        errors = true
    } else {
        dispatch({type: CLEAR_ERRORS})
        errors = false
    }

    if (isEmptyString(userData.password)) {
        dispatch({
            type: SET_ERRORS,
            payload: {loginPassword: "Enter your password"}
        })
        errors = true
    } else {
        dispatch({type: CLEAR_ERRORS})
        errors = false
    }

    if (!errors) {
        const validUser = {
            email: userData.email,
            password: userData.password
        }
        axios.post("/login", validUser)
            .then(res => {
                const token = `Bearer ${res.data.token}`
                localStorage.setItem("user", token)
                dispatch({type: SET_AUTHENTICATED})
                window.location.reload()
            })
            .catch(err => {
                if (err.response.data.wrongCredentials) {
                    dispatch({
                        type: SET_ERRORS,
                        payload: {loginEmail: err.response.data.wrongCredentials}
                    })
                    errors = true
                } else {
                    dispatch({
                        type: SET_ERRORS,
                        payload: err.response.data.serverError
                    })
                    errors = false
                }
            })
    }
}

export const signUpAction = (userData) => (dispatch) => {
    dispatch({
        type: LOADING_UI,
        payload: true
    })
    let errors = false

    if (isEmptyString(userData.email) || !isEmail(userData.email)) {
        dispatch({
            type: SET_ERRORS,
            payload: {signUpEmail: "Invalid Email"}
        })
        errors = true
    } else {
        dispatch({type: CLEAR_ERRORS})
        errors = false
    }

    if (userData.password.length < 8) {
        dispatch({
            type: SET_ERRORS,
            payload: {signUpPassword: "Invalid Invalid"}
        })
        errors = true
    } else {
        dispatch({type: CLEAR_ERRORS})
        errors = false
        }

    if (userData.password !== userData.repeatPassword || isEmptyString(userData.repeatPassword)) {
        dispatch({
            type: SET_ERRORS,
            payload: {signUpRepeatPassword: "Passwords don't match"}
        })
        errors = true
    } else {
        dispatch({type: CLEAR_ERRORS})
        errors = false
    }

    if (!errors) {
        const validData = {
            email: userData.email,
            password: userData.password
        }
        axios.post("/signup", validData)
            .then(() => {
                dispatch({
                    type: LOADING_UI,
                    payload: "success"
                })
                setTimeout(() => {
                    dispatch({
                        type: LOADING_UI,
                        payload: false
                    })
                }, 3000)
            })
            .catch(err => {
                if (err.response.data.email) {
                    dispatch({
                        type: SET_ERRORS,
                        payload: {signUpEmail: err.response.data.email}
                    })
                    errors = true
                } else {
                    dispatch({
                        type: SET_ERRORS,
                        payload: err.response.data.serverError
                    })
                    errors = false
                }
            })
    }
}

export const getAuthUserDataAction = () => (dispatch) => {
    axios.defaults.headers.common['Authorization'] = localStorage.getItem("user")
    axios.get("/user/getInfo")
        .then(res => {
            dispatch({
                type: SET_USER,
                payload: res.data.userData
            })
        })
        .catch(err => {
            console.log(`Get User Error: ${err}`)
        })
}