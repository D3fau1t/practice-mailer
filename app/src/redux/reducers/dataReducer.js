import { GET_ALL_EMAILS, FILTER_EMAILS, CLEAR_FILTER_EMAILS,
         SELECT_EMAIL, SELECT_MULTIPLE_EMAILS, CLEAR_SELECTED_EMAILS,
         SEND_EMAILS, CLEAR_SEND_EMAILS } from '../types'

const initialState = {
    getEmailsList: [],
    selectedEmails: [],
    filteredEmails: [],
    sendEmails: []
}

export default (state = initialState, {type, payload}) => {
    switch (type) {
        case GET_ALL_EMAILS:
            return {...state, getEmailsList: payload}
        case FILTER_EMAILS: 
            return {...state, filteredEmails: payload}
        case CLEAR_FILTER_EMAILS:
            return {...state, filteredEmails: []}
        case SELECT_EMAIL:
            return {...state, selectedEmails: payload}
        case SELECT_MULTIPLE_EMAILS:
            return {...state, selectedEmails: [...state.selectedEmails, payload]}
        case CLEAR_SELECTED_EMAILS:
            return {...state, selectedEmails: []}
        case SEND_EMAILS: 
            return {...state, sendEmails: [...state.sendEmails, payload]}
        case CLEAR_SEND_EMAILS: 
            return {...state, sendEmails: state.sendEmails.filter(res => res !== payload)}
        default:
            return state
    }
}