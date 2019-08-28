import { SET_ERRORS, CLEAR_ERRORS, LOADING_UI } from '../types'

const initialState = {
    loading: false,
    errors: {}
}

export default (state = initialState, {type, payload}) => {
    switch (type) {
        case SET_ERRORS:
            return {...state, loading: false, errors: Object.assign({}, state.errors, payload)}
        case CLEAR_ERRORS: 
            return {...state, errors: {}}
        case LOADING_UI:
            return {...state, loading: payload}
        default:
            return state
    }
}