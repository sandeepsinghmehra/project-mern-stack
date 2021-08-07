import { SET_PROFILE_ERRORS, RESET_PROFILE_ERRORS } from '../types/ProfileTypes';


const initState = {
    updateErrors: [],

}
export const updateName = (state = initState, action) => {
    const {payload} = action;
    switch(action.type){
        case SET_PROFILE_ERRORS:
            return {    
                ...state, 
                updateErrors: payload
            }
        case RESET_PROFILE_ERRORS:
            return {
                ...state, 
                updateErrors: []
            }
        default:
            return state;
    }
}