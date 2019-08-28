import axios from 'axios'
import { GET_ALL_EMAILS, FILTER_EMAILS, CLEAR_FILTER_EMAILS,
         SELECT_EMAIL, CLEAR_SELECTED_EMAILS, LOADING_UI,
         SET_ERRORS, CLEAR_ERRORS, SEND_EMAILS,
         CLEAR_SEND_EMAILS } from '../types'
import isEmptyString from '../../utils/isEmptyString'
import isEmail from '../../utils/isEmail'

export const getAllEmailsAction = () => (dispatch) => {
    axios.defaults.headers.common['Authorization'] = localStorage.getItem("user")
    axios.get("/getAllEmails")
        .then(res => {
            dispatch({
                type: GET_ALL_EMAILS,
                payload: res.data.emailsList
            })
        })
        .catch(err => {
            console.log(`Get all emails error ${err}`)
        })
}

export const addNewMainEmailAction = (email) => (dispatch) => {
    dispatch({
        type: LOADING_UI,
        payload: "add-main-email"
    })
    if (isEmptyString(email) || !isEmail(email)) {
        dispatch({
            type: SET_ERRORS,
            payload: {createEmailError: "Invalid Email"}
        })
    } else {
        axios.defaults.headers.common['Authorization'] = localStorage.getItem("user")
        axios.post("/addNewMainEmail", {email})
            .then(() => {
                dispatch({type: CLEAR_ERRORS})
                dispatch({
                    type: LOADING_UI,
                    payload: "add-main-email-success"
                })
                setTimeout(() => {
                    dispatch({
                        type: LOADING_UI,
                        payload: false
                    })
                    dispatch(getAllEmailsAction())
                }, 2000)
            })
            .catch(err => {
                console.log(`Add new main email error ${err}`)
            })
    }
}

export const filterEmailsAction = (inputData, emailsList) => (dispatch) => {
    if (isEmptyString(inputData)) {
        dispatch({type: CLEAR_FILTER_EMAILS})
    } else {
        const filterInput = inputData.toUpperCase()
        const result = emailsList.filter(data => data.email.toUpperCase().indexOf(filterInput) > -1)
        dispatch({
            type: FILTER_EMAILS,
            payload: result
        })
    }
}

export const setSelectedEmailsAction = (emails) => (dispatch) => {
    const result = emails.filter(email => email.selected)
    dispatch({
        type: SELECT_EMAIL,
        payload: result
    })
}

export const setSendEmailsAction = (email) => (dispatch) => {
    dispatch({
        type: SEND_EMAILS,
        payload: email
    })
}

export const deleteSendEmailsAction = (email) => (dispatch) => {
    dispatch({
        type: CLEAR_SEND_EMAILS,
        payload: email
    })
}

export const getEmailAction = (email) => (dispatch) => {
    axios.defaults.headers.common['Authorization'] = localStorage.getItem("user")
    axios.post("/getEmail", {email})
        .then(res => {
            dispatch({
                type: SELECT_EMAIL,
                payload: [res.data.doc]
            })
        })
        .catch(err => {
            console.log(`Get email error ${err}`)
        })
}

export const deleteMainEmailAction = (email) => (dispatch) => {
    dispatch({
        type: LOADING_UI,
        payload: "delete-main-email"
    })
    if (!isEmptyString(email)) {
        axios.defaults.headers.common['Authorization'] = localStorage.getItem("user")
        axios.post("deleteMainEmail", {email})
            .then(() => {
                dispatch({type: CLEAR_SELECTED_EMAILS})
                dispatch(getAllEmailsAction())
                dispatch({
                    type: LOADING_UI,
                    payload: "delete-main-email-success"
                })
                setTimeout(() => {
                    dispatch({
                        type: LOADING_UI,
                        payload: false
                    })
                }, 2000)
            })
            .catch(err => {
                console.log(`Delete main email error ${err}`)
                dispatch({
                    type: LOADING_UI,
                    payload: false
                })
            })
    } else {
        dispatch({
            type: LOADING_UI,
            payload: false
        })
    }
}

export const deleteSecondaryEmailAction = (id, mainEmail) => (dispatch) => {
    axios.defaults.headers.common['Authorization'] = localStorage.getItem("user")
    axios.post("/deleteSecondaryEmail", {emailId: id, mainEmail})
        .then(() => {
            dispatch(getEmailAction(mainEmail))
        })
        .catch(err => {
            console.log(`Delete secondary email error ${err}`)
        })
}

export const addNewSecondaryEmailAction = (email, mainEmail) => (dispatch) => {
    dispatch({
        type: LOADING_UI,
        payload: "add-secondary-email"
    })
    if (isEmptyString(email) || !isEmail(email)) {
        dispatch({
            type: SET_ERRORS,
            payload: {secondaryEmail: "Invalid Email"}
        })
    } else {
        axios.defaults.headers.common['Authorization'] = localStorage.getItem("user")
        axios.post("/addNewEmails", {emails: [email], mainEmail: mainEmail})
        .then(() => {
            dispatch({type: CLEAR_ERRORS})
            dispatch({
                type: LOADING_UI,
                payload: "add-secondary-email-success"
            })
            setTimeout(() => {
                dispatch({
                    type: LOADING_UI,
                    payload: false
                })
                dispatch(getEmailAction(mainEmail))
            }, 2000)
        })
        .catch(err => {
            if (err.response.data.limitError) {
                dispatch({
                    type: SET_ERRORS,
                    payload: {secondaryEmail: err.response.data.limitError}
                })
            } else if (err.response.data.serverError) {
                dispatch({
                    type: SET_ERRORS,
                    payload: {secondaryEmail: err.response.data.serverError}
                })
            }
        })
    }
}

export const sendEmailMessageAction = (data) => (dispatch) => {
    const { sendEmails, messageSubject, messageBody, files } = data
    let errors = false

    dispatch({
        type: LOADING_UI,
        payload: "send-email-message"
    })

    if (sendEmails.length === 0) {
        dispatch({
            type: SET_ERRORS,
            payload: {sendEmailsError: "Please pick your receivers"}
        })
        errors = true
    } else {
        dispatch({type: CLEAR_ERRORS})
        errors = false
    }

    if (isEmptyString(messageSubject)) {
        dispatch({
            type: SET_ERRORS,
            payload: {messageSubjectError: "Please write message subject"}
        })
        errors = true
    } else {
        dispatch({type: CLEAR_ERRORS})
        errors = false
    }

    if (isEmptyString(messageBody)) {
        dispatch({
            type: SET_ERRORS,
            payload: {messageBodyError: "Please write message body"}
        })
        errors = true
    } else {
        dispatch({type: CLEAR_ERRORS})
        errors = false
    }

    if (!errors) {
        const validData = {
            emails: sendEmails,
            text: messageBody,
            subject: messageSubject,
            attachments: files
        }

        // const json = JSON.stringify(validData)
        // const blob = new Blob([json], {
        //     type: "application/json"
        // })

        // const formData = new FormData()
        // formData.append("json", blob)

        // console.log(formData.getAll("files[]"))

        // {
        //     headers: {
        //         'Content-Type': 'multipart/form-data'
        //     }
        // }

        axios.defaults.headers.common['Authorization'] = localStorage.getItem("user")
        axios.post("/sendEmails", validData)
            .then(() => {
                dispatch({
                    type: LOADING_UI,
                    payload: "send-email-message-success"
                })
                setTimeout(() => {
                    dispatch({
                        type: LOADING_UI,
                        payload: false
                    })
                }, 2000)
            })
            .catch(err => {
                dispatch({
                    type: LOADING_UI,
                    payload: false
                })
                console.log(`Send email action error ${err}`)
            })
    }
}