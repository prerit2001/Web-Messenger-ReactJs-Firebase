import { authConstant} from "../actions/constants"


const initState = {
    firstName: '',
    lastName: '',
    email: '',
    authenticating: false,
    authenticated: false,
    error: null
}

export default (state = initState, action) => {



    console.log(action);

    switch(action.type){

        case `${authConstant.USER_LOGIN}_REQUEST`:
            state = {
                ...state,
                authenticating: true,
            }
            break;
        case `${authConstant.USER_LOGIN}_SUCCESS`:
            state = {
                ...state,
                ...action.payload.user,
                authenticated: true,
                authenticating: false
            }
            break;
        case `${authConstant.USER_LOGIN}_FAILURE`:
            state = {
                ...state,
                authenticated: false,
                authenticating: false,
                error: action.payload.error
            }
            break;
        case `${authConstant.USER_LOGOUT}_REQUEST`:
            break;
        case `${authConstant.USER_LOGOUT}_SUCCESS`:
            state = {
                ...initState
            }
            break;
        case `${authConstant.USER_LOGOUT}_FAILURE`:
            state = {
                ...state,
                error: action.payload.error
            }
            break;
       default : break

    }


    return state;
}